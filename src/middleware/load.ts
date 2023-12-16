import { setE1, setE2, setOp, setAcc } from 'src/store/alu.slice'
import { setIrCmd, setIrLoc } from 'src/store/ir.slice'
import { setPc } from 'src/store/pc.slice'
import { setCode, setVariable } from 'src/store/ram.slice'
import { setCodeLine, setCreated, setFocusCell, setFocusEl, setFocusVar, setStatus, setStep, setTitle } from 'src/store/sim.slice'
import { setStats } from 'src/store/stats.slice'
import { SimulatorStateData } from 'src/types/simulatorState'

// update the simulator state from a an SimulatorState object
export const load = (obj:SimulatorStateData) => {
  return (dispatch, _getState) => {
    // alu
    dispatch(setE1(obj.alu.e1))
    dispatch(setE2(obj.alu.e2))
    dispatch(setOp(obj.alu.op))
    dispatch(setAcc(obj.alu.acc))

    // ir
    dispatch(setIrCmd(obj.ir.cmd))
    dispatch(setIrLoc(obj.ir.loc))

    // pc
    dispatch(setPc(obj.pc.val))
    dispatch(setStep(obj.pc.step))

    // sim
    dispatch(setTitle(obj.sim.title))
    dispatch(setCreated(obj.sim.created))
    dispatch(setStatus(obj.sim.status))
    dispatch(setStep(obj.sim.step))
    dispatch(setCodeLine(obj.sim.codeLine))

    // stats
    dispatch(setStats(obj.stats))
    
    // focus
    dispatch(setFocusCell(obj.sim.focus.cell))
    dispatch(setFocusEl(obj.sim.focus.el))
    dispatch(setFocusVar(obj.sim.focus.var))

    // ram
    dispatch(setCode(obj.ram.code))
    if (obj.ram.variables) {
      Object.entries(obj.ram.variables).forEach(([key, value]) => {
        if (key === 'T' && Array.isArray(value)) {
          value.forEach((v, i) => {
            dispatch(setVariable({ name: `T${i}`, value: v }))
          })
        }
        else {
          dispatch(setVariable({ name: key, value }))
        }
      })
    }
  }
}
