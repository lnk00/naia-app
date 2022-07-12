use anyhow::Result;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct PingResponse {
    pub version: String,
    pub name: String,
    pub databases: Vec<String>,
}

pub fn ping() -> Result<PingResponse> {
    let res = reqwest::blocking::get("http://localhost:3000/")?;
    let ping: PingResponse = res.json()?;
    Ok(ping)
}
