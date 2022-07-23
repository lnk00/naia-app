use anyhow::Result;
use oauth2::{
    basic::BasicClient, reqwest::http_client, AuthUrl, AuthorizationCode, ClientId, ClientSecret,
    CsrfToken, PkceCodeChallenge, PkceCodeVerifier, RedirectUrl, Scope, TokenResponse, TokenUrl,
};
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct PingResponse {
    pub version: String,
    pub name: String,
    pub databases: Vec<String>,
}

pub struct AuthorizationUrl {
    pub url: String,
    pub pkce_verifier: String,
}

pub struct Environment {
    pub auth0_client_secret: String,
    pub auth0_client_id: String,
    pub auth0_authorize_url: String,
    pub auth0_token_url: String,
    pub auth0_redirect_url: String,
}

pub fn ping() -> Result<PingResponse> {
    let res = reqwest::blocking::get("http://localhost:3000/")?;
    let ping: PingResponse = res.json()?;
    Ok(ping)
}

pub fn get_auth_url(env: Environment) -> Result<AuthorizationUrl> {
    let client = BasicClient::new(
        ClientId::new(env.auth0_client_id),
        Some(ClientSecret::new(env.auth0_client_secret)),
        AuthUrl::new(env.auth0_authorize_url)?,
        Some(TokenUrl::new(env.auth0_token_url)?),
    )
    .set_redirect_uri(RedirectUrl::new(env.auth0_redirect_url)?);

    let (pkce_challenge, pkce_verifier) = PkceCodeChallenge::new_random_sha256();

    let (auth_url, _csrf_token) = client
        .authorize_url(CsrfToken::new_random)
        .add_scope(Scope::new("read".to_string()))
        .add_scope(Scope::new("write".to_string()))
        .set_pkce_challenge(pkce_challenge)
        .url();

    Ok(AuthorizationUrl {
        url: auth_url.to_string(),
        pkce_verifier: pkce_verifier.secret().to_string(),
    })
}

pub fn get_token(pkce_verifier: String, auth_code: String, env: Environment) -> Result<String> {
    // TODO: check state recieved by auth requesquet and csrf flag

    let client = BasicClient::new(
        ClientId::new(env.auth0_client_id),
        Some(ClientSecret::new(env.auth0_client_secret)),
        AuthUrl::new(env.auth0_authorize_url)?,
        Some(TokenUrl::new(env.auth0_token_url)?),
    )
    .set_redirect_uri(RedirectUrl::new(env.auth0_redirect_url)?);

    let token_result = client
        .exchange_code(AuthorizationCode::new(auth_code))
        .set_pkce_verifier(PkceCodeVerifier::new(pkce_verifier))
        .request(http_client)?;

    Ok(token_result.access_token().secret().to_string())
}
