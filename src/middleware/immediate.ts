import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'

// run the program without any delay
export const immediate = (dispatch, getState) => {
  const { sim, ram, pc, ir, alu } = getState()
  
  // on desktop use Rust bindings
  if ('__TAURI__' in window) {
    invoke('execute', { sim, ram, pc, ir, alu })
    listen('execution-complete', (event) => {
      console.log(event.payload)
    })
  }
  // on browser use WebAssembly
  else {

  }
}
