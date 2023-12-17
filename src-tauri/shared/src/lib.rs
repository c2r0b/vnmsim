pub mod types;
pub use types::{SimulatorState, Status};

pub fn execute_line(input:SimulatorState) -> SimulatorState {
    let mut params = input.clone();
    let code_length: i32 = params.ram.code.split("\n").count() as i32;

    if code_length < params.sim.codeLine {
        params.sim.status = Status::Stop as i32;
        return params
    }
    
    // get current line, interpret comments as NOP operations
    let mut line = match params.ram.code.split("\n").nth(params.sim.codeLine as usize) {
        Some(line) => line,
        None => {
            // Handle the case where the line doesn't exist
            params.sim.status = Status::Stop as i32;
            return params;
        }
    };
    
    if line == "" || line.starts_with("//") {
        line = "NOP";
    }
    // pardon inline comments
    line = line.split("//").next().unwrap_or("NOP");

    // stop the simulator if the PC has a negative value
    if params.pc.val < 0 {
        params.pc.val = 0;
        return params
    }
    
    // get instruction and location from code line
    let cmd = line[0..3].to_uppercase();
    let loc = line.get(4..).map_or_else(|| "", str::trim).to_uppercase().to_string();
    
    // increment pc
    params.pc.val += params.pc.step;

    // alu operation (match cmd: NOP, HLT, ...)
    match cmd.as_str() {
        "NOP" => {
            params.sim.codeLine += 1;
            return params
        },
        "HLT" => {
            params.pc.val = 0;
            params.sim.status = Status::Stop as i32;
            return params
        },
        "JMP" => {
            params.stats.performed_jmp += 1;
            params.pc.val = loc.parse::<i32>().unwrap();
            params.sim.codeLine = params.pc.val;
            return params
        },
        "JMZ" => {
            params.stats.performed_jmz += 1;
            if params.alu.acc == 0 {
                params.pc.val = loc.parse::<i32>().unwrap();
                params.sim.codeLine = params.pc.val;
            }
            else {
                params.sim.codeLine += 1;
            }
            return params
        },
        "LOD" => {
            params.alu.e1 = params.alu.acc; 
            params.alu.op = "=".to_string()
        },
        "STO" => {
            params.alu.op = "=".to_string();

            if !loc.starts_with("#") {
                params.ram.variables.set(loc, params.alu.acc);
        
                // increment variable access counter
                params.stats.variable_access += 1;
        
            }
            params.sim.codeLine += 1;
            return params
        },
        "ADD" => {
            params.alu.op = "+".to_string()
        },
        "SUB" => {
            params.alu.op = "-".to_string()
        },
        "MUL" => {
            params.alu.op = "*".to_string()
        },
        "DIV" => {
            params.alu.op = "/".to_string()
        },
        _ => {}
    }

    // parse data portion (instruction register loc)
    if loc.starts_with("#") { // #n
        params.alu.e2 = loc.replace("#","").parse::<i64>().unwrap();
    }
    else { // X, Y, Z, W, T1, T2, ...
        params.alu.e2 = params.ram.variables.get(loc).unwrap();
        
        // increment variable access counter
        params.stats.variable_access += 1;
    }

    // execute operation
    match cmd.as_str() {
        "ADD" => {
            params.alu.e1 = params.alu.acc;
            params.alu.acc = params.alu.e1 + params.alu.e2;
            params.stats.alu_calculation += 1;
        },
        "SUB" => {
            params.alu.e1 = params.alu.acc;
            params.alu.acc = params.alu.e1 - params.alu.e2;
            params.stats.alu_calculation += 1;
        },
        "MUL" => {
            params.alu.e1 = params.alu.acc;
            params.alu.acc = params.alu.e1 * params.alu.e2;
            params.stats.alu_calculation += 1;
        },
        "DIV" => {
            params.alu.e1 = params.alu.acc;
            params.alu.acc = params.alu.e1 / params.alu.e2;
            params.stats.alu_calculation += 1;
        },
        _ => {
            params.alu.acc = params.alu.e2;
        }
    }

    params.sim.codeLine += 1;
    params
}

pub fn execute(input:SimulatorState) -> SimulatorState {
    let mut params = input.clone();
    // run every line until stopped
    loop {
        params = execute_line(params.clone());
        params.stats.executed_step += 1;
        if params.sim.status == Status::Stop as i32 {
            params.pc.val = 0;
            params.sim.codeLine = 0;
            break;
        }
    }
    params
}

#[cfg(feature = "wasm")]
use serde_wasm_bindgen::{from_value, to_value};

#[cfg(feature = "wasm")]
use wasm_bindgen::prelude::*;

#[cfg(feature = "wasm")]
#[cfg_attr(feature = "wasm", wasm_bindgen)]
pub fn solve(input:JsValue) -> Result<JsValue, JsValue> {
    let mut params: SimulatorState = from_value(input)?;
    params = execute(params);
    Ok(to_value(&params)?)
}
