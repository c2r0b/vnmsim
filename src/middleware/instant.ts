import __wbg_init, { solve } from 'src-wasm/pkg'
import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'

import { load } from './load'
import { setStatus } from 'src/store/sim.slice'

import { Status } from 'src/types/status'
import type { SimulatorStateData } from '../types/simulatorState'

// run the program without any delay
export const instant = (dispatch, getState) => {
  const { sim, ram, pc, ir, alu, stats } = getState()
  const params: SimulatorStateData = { sim, ram, pc, ir, alu, stats }
  
  // on desktop use Rust bindings
  if ('__TAURI__' in window) {
    console.log("Running tauri")
    invoke('execute', params)
    listen('execution-complete', (event) => {
      dispatch(load(event.payload as SimulatorStateData))
    })
  }
  // on browser use WebAssembly
  else {
    (async () => {
      let response
      try {
        await __wbg_init()
        response = solve(params)
      } catch (e) {
        console.error('Error initializing WebAssembly module:', e)
        alert("An error occured trying to run Instant. Please make sure the browser is up-to-date.")
        dispatch(setStatus(Status.STOP))
        return
      }
      dispatch(load(response))
    })();
  }
}
