import __wbg_init, { solve } from 'src-wasm/pkg'
import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'

import { loadFromExecuteParams } from './load'
import { setStatus } from 'src/store/sim.slice'

import { Status } from 'src/types/status'
import type { TypeFromWasm } from '../types/fromWasm'
import type { ExecuteParams } from 'src-wasm/pkg'

// run the program without any delay
export const instant = (dispatch, getState) => {
  const { sim, ram, pc, ir, alu, stats } = getState()
  console.log("Running instant")
  
  // on desktop use Rust bindings
  if ('__TAURI__' in window) {
    console.log("Running tauri")
    invoke('execute', { sim, ram, pc, ir, alu })
    listen('execution-complete', (event) => {
      console.log(event.payload)
    })
  }
  // on browser use WebAssembly
  else {
    (async () => {
      let response
      try {
        await __wbg_init()
          const params: TypeFromWasm<ExecuteParams> = { sim, ram, pc, ir, alu, stats }
         response = solve(params)
        } catch (e) {
          console.error('Error initializing WebAssembly module:', e)
          alert("An error occured trying to run Instant. Please make sure the browser is up-to-date.")
          dispatch(setStatus(Status.STOP))
          return
        }
        dispatch(loadFromExecuteParams(response))
    })();
  }
}
