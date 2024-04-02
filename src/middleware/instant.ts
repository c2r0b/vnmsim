import __wbg_init, { solve } from 'src-tauri/shared/pkg/shared'
import { invoke } from '@tauri-apps/api'

import { load } from './load'
import { setStatus } from 'src/store/sim.slice'

import { Status } from 'src/types/status'
import type { SimulatorStateData } from '../types/simulatorState'
import { serialize } from 'src/utility/serialize'

// run the program without any delay
export const instant = (dispatch, getState) => {
  const { sim, ram, pc, ir, alu, stats } = getState()
  const params: SimulatorStateData = { sim, ram, pc, ir, alu, stats }
  const serializedData = serialize(params)
  
  // on desktop use Rust bindings
  if ('__TAURI_INTERNALS__' in window) {
    invoke('execute', { input: serializedData })
      .then(response => {
        dispatch(load(response as SimulatorStateData))
      })
      .catch(() => {
        alert("An error occured trying to run Instant. Please make sure the desktop app is up-to-date.")
        dispatch(setStatus(Status.STOP))
      })
  }
  // on browser use WebAssembly
  else {
    (async () => {
      let response
      try {
        await __wbg_init()
        response = solve(eval(`(${serializedData})`))
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
