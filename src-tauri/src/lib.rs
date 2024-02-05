#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use shared::types::SimulatorState;
use shared::execute as simExecute;
use tauri::utils::debug_eprintln;

#[tauri::command]
fn execute(input: String) -> SimulatorState {
  let data:SimulatorState = serde_json::from_str(&input).unwrap();
  debug_eprintln!("execute");
  let result:SimulatorState = simExecute(data);
  result.into()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![execute])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
