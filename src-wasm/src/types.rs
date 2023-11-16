use serde::{Serialize, Deserialize};
use wasm_bindgen::prelude::*;
use std::vec;

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
    pub interval: Option<i32>,
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
    pub fn get_t(&self, index: usize) -> Option<i32> {
        self.T.get(index).cloned()
    }

    // Method to set a T variable
    pub fn set_t(&mut self, index: usize, value: i32) {
        // if index is out of bounds, add new T variables until index is reached
        while index >= self.T.len() {
            self.add_t();
        }
        self.T[index] = value;
    }

    // Method to get a variable
    pub fn get(&self, var: String) -> Option<i32> {
        match var.as_str() {
            "X" => self.X,
            "Y" => self.Y,
            "Z" => self.Z,
            "W" => self.W,
            _ => {
                let t = var.replace("T","").parse::<usize>().unwrap();
                self.get_t(t)
            }
        }
    }

    // Method to set a variable
    pub fn set(&mut self, var: String, value: i32) {
        match var.as_str() {
            "X" => self.X = Some(value),
            "Y" => self.Y = Some(value),
            "Z" => self.Z = Some(value),
            "W" => self.W = Some(value),
            _ => {
                let t = var.replace("T","").parse::<usize>().unwrap();
                self.set_t(t, value);
            }
        }
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
    pub e1: i32,
    pub e2: i32,
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

pub enum Status {
  Stop = 0,
}