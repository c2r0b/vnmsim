import { getTVariableIndexFromName, isTVariable } from 'src/utility/tVariables'
import { calculate, setAcc, setE1, setE2, setOp } from 'src/store/alu.slice'
import { setIrCmd, setIrLoc } from 'src/store/ir.slice'
import { incrementPc, setPc } from 'src/store/pc.slice'
import { setVariable } from 'src/store/ram.slice'
import { clearFocus, clearFocusEl, incrementStep, setCodeLine, setFocusCell, setFocusEl, setFocusVar, setStatus, setStep, stopSim } from 'src/store/sim.slice'
import { incrementAluCalculation, incrementCellAccess, incrementExecutedStep, incrementPerformedJmp, incrementPerformedJmz, incrementVariableAccess } from 'src/store/stats.slice'

import { Status } from 'src/types/status'
import { Steps } from 'src/types/steps'

export const lastStep = Object.keys(Steps).length / 2 - 1

const commands = {
  LOD: '=',
  STO: '=',
  ADD: '+',
  SUB: '-',
  MUL: '*',
  DIV: '/',
}

export const execute = (dispatch, getState) => {
  dispatch(incrementStep())

  let { sim, ram, pc, ir, alu } = getState()
  let line = (ram.code || "").split("\n")[sim.codeLine]

  // stop if RAM out of bounds
  if (ram.code.length < sim.codeLine + 1) {
    dispatch(setStatus(Status.STOP))
    return
  }

  // get line, interpret comments as NOP operations
  line = (
    (!line || line.match(/^((\d+)|(\/\/[\s\S]*))$/i))
    ? 'NOP'
    : line
  )

  // pardon inline comments
  line = line.split("//")[0]

  // execute code related to the current simulator step
  switch(sim.step) {
    case Steps.STOP: {
      return
    }
    case Steps.STARTUP: {
      if (sim.interval) dispatch(clearFocus())
      dispatch(incrementExecutedStep())

      // stop the simulator if the PC has a negative value
      if (pc.val < 0) {
        dispatch(setPc(0))
        dispatch(setStep(lastStep))
        dispatch(setStatus(Status.PAUSE))
      }
      break
    }
    case Steps.IR_CMD: {
      if (sim.interval) dispatch(setFocusCell(pc.val))
      if (sim.interval) dispatch(setFocusEl('ir.input'))
      dispatch(setIrCmd(line.substr(0, 3).toUpperCase()))
      dispatch(setIrLoc(""))
      break
    }
    case Steps.IR_LOC: {
      if (sim.interval) dispatch(setFocusCell(pc.val))
      if (sim.interval) dispatch(setFocusEl('ir.input'))
      dispatch(setIrLoc(line.substr(4).toUpperCase().trim()))
      break
    }
    case Steps.PC_STEP: {
      if (sim.interval) dispatch(setFocusCell(-1))
      if (sim.interval) dispatch(setFocusEl('pc.increment'))
      break
    }
    case Steps.PC_VALUE: {
      if (sim.interval) dispatch(setFocusEl('pc.input'))
      dispatch(incrementPc())
      break
    }
    case Steps.IR_DECODER: {
      if (sim.interval) dispatch(setFocusEl('ir.decoder'))
      break
    }
    case Steps.ALU_OPERATION: {
      // get correct alu operation
      switch (ir.cmd) {
        case 'NOP': {
          dispatch(setStep(lastStep))
          if (sim.interval) dispatch(clearFocusEl())
          break
        }
        case 'HLT': {
          dispatch(setStep(lastStep))
          dispatch(setPc(0))
          dispatch(stopSim())
          break
        }
        case 'JMP': {
          dispatch(setStep(lastStep))
          if (sim.interval) dispatch(setFocusEl('pc.input'))
          dispatch(setPc(+ir.loc))
          dispatch(setCodeLine(+ir.loc - 1))
          dispatch(incrementPerformedJmp())
          break
        }
        case 'JMZ': {
          if (sim.interval) dispatch(setFocusEl('acc.field'))
          break
        }
        default: {
          if (sim.interval) dispatch(setFocusEl('alu.op'))
          dispatch(setOp(commands[ir.cmd] || "="))
          break
        }
      }
      break
    }
    case Steps.ALU_OPERAND: {
      // JMZ instruction behaviour
      if (ir.cmd == 'JMZ') {
        if (alu.acc == 0) {
          if (sim.interval) dispatch(setFocusEl('pc.input'))
          dispatch(setPc(+ir.loc))
          dispatch(setCodeLine(+ir.loc - 1))
          dispatch(incrementPerformedJmz())
        }
        else {
          if (sim.interval) dispatch(clearFocusEl())
        }
        dispatch(setStep(lastStep))
        break
      }
      // STO instruction behaviour
      else if (ir.cmd == 'STO') {
        if (sim.interval) dispatch(setFocusEl('acc.field'))
        break
      }
      // aything but LOD instruction behaviour
      else if (ir.cmd != 'LOD') {
        dispatch(setE1(alu.acc))
      }

      // parse data portion (instruction register loc)
      // #n
      if (ir.loc.startsWith('#')) {
        dispatch(setE2(+ir.loc.replace('#','')))
      }
      else {
        if (sim.interval) dispatch(setFocusVar(ir.loc))
        
        // get variable value
        let value;
        if (isTVariable(ir.loc)) {
          value = ram.variables.T[getTVariableIndexFromName(ir.loc)]
        }
        else {
          value = ram.variables[ir.loc]
        }
        dispatch(setE2(value || 0))

        // variable
        if (ir.loc.match(/[TXYZW]/)) {
          dispatch(incrementVariableAccess())
        }
        // memory cell
        else {
          dispatch(incrementCellAccess())
        }
      }
      dispatch(setFocusEl('alu.p2'))
      break
    }
    case Steps.ALU_RESULT: {
      if (ir.cmd != 'STO') {
        if (sim.interval) {
          dispatch(setFocusEl('acc.field'))
          dispatch(setFocusVar(''))
        }

        // execute operation
        switch (alu.op) {
          case '=': {
            dispatch(setAcc(parseInt(alu.e2) || 0))
            break
          }
          default: {
            dispatch(incrementAluCalculation())
            dispatch(calculate())
            break
          }
        }
      }
      // STO instruction -> edit variable
      else if (ir.loc.match(/T|X|Y|Z|W/)) {
        if (sim.interval) dispatch(setFocusVar(ir.loc))
        dispatch(setVariable({ name: ir.loc, value: alu.acc }))
        dispatch(incrementVariableAccess())
      }
      break
    }
  }
}
