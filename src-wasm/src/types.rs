use serde::{Serialize, Deserialize};
use wasm_bindgen::prelude::*;
use enum_iterator::Sequence;
use std::{collections::HashMap, vec};

#[wasm_bindgen(getter_with_clone)]
#[derive(Serialize, Deserialize, Clone)]
pub struct SimFocus {
    pub el: String,
    pub cell: i32,
    pub var: String
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Serialize, Deserialize, Clone)]
pub struct Sim  {
    pub title: String,
    pub created: String,
    pub codeLine: i32,
    pub step: i32,
    pub status: i32,
    pub interval: i32,
    pub focus: SimFocus
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Serialize, Deserialize, Clone)]
pub struct Variables {
    pub Y: Option<i32>,
    pub X: Option<i32>,
    pub Z: Option<i32>,
    pub W: Option<i32>,
    pub T: Vec<i32>,
}
impl Variables {
    // Initialize the struct with empty values
    pub fn new() -> Variables {
        Variables {
            X: None,
            Y: None,
            Z: None,
            W: None,
            T: vec![]
        }
    }

    // Method to add a T variable
    pub fn add_t(&mut self) {
        self.T.push(0);
    }

    // Method to get a T variable
    pub fn get_t(&self, index: usize) -> Option<&i32> {
        self.T.get(index)
    }

    // Method to set a T variable
    pub fn set_t(&mut self, index: usize, value: i32) {
        self.T[index] = value;
    }
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Serialize, Deserialize, Clone)]
pub struct Ram {
    pub code: String,
    pub variables: Variables
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Serialize, Deserialize, Clone)]
pub struct Ir {
    pub cmd: String,
    pub loc: String
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Serialize, Deserialize, Clone)]
pub struct Alu {
    pub e1: String,
    pub e2: String,
    pub op: String,
    pub acc: i32
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Clone)]
pub struct Pc {
    pub val: i32,
    pub step: i32
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Clone)]
pub struct Stats {
    pub executed_step: i32,
    pub alu_calculation: i32,
    pub variable_access: i32,
    pub cell_access: i32,
    pub performed_jmp: i32,
    pub performed_jmz: i32
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Serialize, Deserialize, Clone)]
pub struct SimulatorState {
    pub sim: Sim,
    pub ram: Ram,
    pub pc: Pc,
    pub ir: Ir,
    pub alu: Alu,
    pub stats: Stats
}

#[derive(Sequence)]
pub enum Steps {
    Stop = 0,
    Startup = 1,
    IrCmd = 2,
    IrLoc = 3,
    PcStep = 4,
    PcValue = 5,
    IrDecoder = 6,
    AluOperation = 7,
    AluOperand = 8,
    AluResult = 9,
}

pub enum Status {
  Stop = 0,
}