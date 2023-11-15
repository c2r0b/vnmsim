mod utils;
mod types;

use enum_iterator::Sequence;
use serde_wasm_bindgen::{from_value, to_value};
use wasm_bindgen::prelude::*;
use types::SimulatorState;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

pub fn execute_step(input:SimulatorState) -> SimulatorState {
    let mut params = input.clone();
    
    // increment step
    params.sim.step += 1;

    params
}

pub fn execute_line(input:SimulatorState) -> SimulatorState {
    let mut params = input.clone();
    let code_length: i32 = params.ram.code.split("\n").count() as i32;

    // run every step
    loop {
        // get last step of enum types::Steps
        let last_step = types::Steps::last().unwrap();

        params = execute_step(params);
        if params.sim.step > last_step as i32 {
            params.sim.step = types::Steps::Stop as i32;
            params.sim.codeLine += 1;

            if (code_length < params.sim.codeLine) {
                params.sim.status = types::Status::Stop as i32;
            }
            return params
        }
    }
}

#[wasm_bindgen]
pub fn solve(input:JsValue) -> Result<JsValue, JsValue> {
    let mut params: SimulatorState = from_value(input)?;

    // run every line until stopped
    loop {
        params = execute_line(params);
        if params.sim.status == types::Status::Stop as i32 {
            break;
        }
    }
    
    Ok(to_value(&params)?)
}
