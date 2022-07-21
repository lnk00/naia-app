use naia_lib::api::{get_auth_url, AuthorizationUrl};
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let auth_url: AuthorizationUrl = get_auth_url()?;
    println!("Auth url: {}", auth_url.url);

    Ok(())
}
