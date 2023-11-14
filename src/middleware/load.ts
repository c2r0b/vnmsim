import { setE1, setE2, setOp, setAcc } from 'src/store/alu.slice'
import { setIrCmd, setIrLoc } from 'src/store/ir.slice'
import { setPc } from 'src/store/pc.slice'
import { setCode, setVariable } from 'src/store/ram.slice'
import { setCodeLine, setCreated, setFocusCell, setFocusEl, setFocusVar, setStatus, setStep, setTitle } from 'src/store/sim.slice'
import { setStats } from 'src/store/stats.slice'

import type { ExecuteParams } from 'src-wasm/pkg/src_wasm'

// update the simulator state from a an ExecuteParams object
export const loadFromExecuteParams = (obj:ExecuteParams) => {
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
    dispatch(setStatus(obj.sim.status))
    dispatch(setStep(obj.sim.step))
    dispatch(setCodeLine(obj.sim.codeLine))

    // stats
    dispatch(setStats(obj.stats))

    // ram
    dispatch(setCode(obj.ram.code))
    if (obj.ram.variables) {
      Object.entries(obj.ram.variables).forEach(([key, value]) => {
        dispatch(setVariable({ name: key, value }))
      })
    }
  }
}

// load the simulator state from a JSON object
export const loadFromJson = (obj) => {
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
