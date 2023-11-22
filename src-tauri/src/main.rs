#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Window;

#[tauri::command]
fn execute(window: Window, input: src_wasm::SimulatorState) {
  let result:src_wasm::SimulatorState = src_wasm::execute(input);
  let _ = window.emit("execution-complete", result);
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![execute])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
