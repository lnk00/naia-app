use std::error::Error;

use naia_lib::api::{ping, PingResponse};

fn main() -> Result<(), Box<dyn Error>> {
    let res: PingResponse = ping()?;
    println!("{:?}", res);
    Ok(())
}
