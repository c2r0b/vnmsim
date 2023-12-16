import { clearAlu } from 'src/store/alu.slice'
import { clearError } from 'src/store/errors.slice'
import { clearIr } from 'src/store/ir.slice'
import { clearPc } from 'src/store/pc.slice'
import { clearRam } from 'src/store/ram.slice'
import { clearSim } from 'src/store/sim.slice'
import { clearStats } from 'src/store/stats.slice'

export const reset = (dispatch, _getState) => {
  dispatch(clearPc())
  dispatch(clearRam())
  dispatch(clearError())
  dispatch(clearIr())
  dispatch(clearAlu())
  dispatch(clearStats())
  dispatch(clearSim())
}
