use naia_lib::api::{get_auth_url, AuthorizationUrl, Environment};
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let env = Environment {
        auth0_client_id: "id".to_string(),
        auth0_client_secret: "secret".to_string(),
        auth0_authorize_url: "authorize_url".to_string(),
        auth0_redirect_url: "redirect_url".to_string(),
        auth0_token_url: "token_url".to_string(),
    };
    let auth_url: AuthorizationUrl = get_auth_url(env)?;
    println!("Auth url: {}", auth_url.url);

    Ok(())
}
