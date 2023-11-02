import { setE1, setE2, setOp, setAcc } from 'src/store/alu.slice'
import { setIrCmd, setIrLoc } from 'src/store/ir.slice'
import { setPc } from 'src/store/pc.slice'
import { setCode, setVariable } from 'src/store/ram.slice'
import { setCodeLine, setCreated, setFocusCell, setFocusEl, setFocusVar, setStatus, setStep, setTitle } from 'src/store/sim.slice'

// load the simulator state from a JSON object
export const load = (obj) => {
  return (dispatch, _getState) => {
    // alu
    dispatch(setE1(obj.alu.e1))
    dispatch(setE2(obj.alu.e2))
    dispatch(setOp(obj.alu.op))
    dispatch(setAcc(obj.acc))

    // ir
    dispatch(setIrCmd(obj.ir.cmd))
    dispatch(setIrLoc(obj.ir.loc))

    // pc
    dispatch(setPc(obj.pc.val))
    dispatch(setStep(obj.pc.step))

    // sim
    dispatch(setTitle(obj.title))
    dispatch(setCreated(obj.created))
    dispatch(setStatus(obj.status))
    dispatch(setStep(obj.step))
    dispatch(setCodeLine(obj.codeLine))
    
    // focus
    dispatch(setFocusCell(obj.focus.cell))
    dispatch(setFocusEl(obj.focus.el))
    dispatch(setFocusVar(obj.focus.var))

    // ram
    dispatch(setCode(obj.code))
    if (obj.variables) {
      Object.entries(obj.variables).forEach(([key, value]) => {
        dispatch(setVariable({ name: key, value }))
      })
    }
  }
}
