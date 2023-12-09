import { initialState as simInitialState } from '../store/sim.slice'
import { initialState as ramInitialState } from '../store/ram.slice'
import { initialState as irInitialState } from '../store/ir.slice'
import { initialState as aluInitialState } from '../store/alu.slice'
import { initialState as pcInitialState } from '../store/pc.slice'
import { initialState as statsInitialState } from '../store/stats.slice'

import type { SimulatorState as WasmSimulatorState } from 'src-tauri/shared/pkg'
import type { TypeFromWasm } from './fromWasm'
import type { ExportJSON } from './exportJSON'
import { isTVariable } from 'src/utility/tVariables'

export interface SimulatorStateData extends TypeFromWasm<WasmSimulatorState> {}

export class SimulatorState implements SimulatorStateData  {
  sim
  ram
  alu
  pc
  ir
  stats

  constructor(params: Partial<SimulatorStateData> = {}) {
    this.sim = params?.sim ?? simInitialState
    this.ram = params?.ram ?? ramInitialState
    this.alu = params?.alu ?? aluInitialState
    this.pc = params?.pc ?? pcInitialState
    this.ir = params?.ir ?? irInitialState
    this.stats = params?.stats ?? statsInitialState
  }

  fromJSON(obj: ExportJSON):void {
    this.alu = {
      e1: BigInt(obj.alu.e1),
      e2: BigInt(obj.alu.e2),
      op: obj.alu.op,
      acc: BigInt(obj.acc),
    }

    this.ir = obj.ir

    this.pc = obj.pc

    this.ram = {
      code: obj.code,
      variables: {
        X: BigInt(obj.variables.X ?? 0),
        Y: BigInt(obj.variables.Y ?? 0),
        Z: BigInt(obj.variables.Z ?? 0),
        W: BigInt(obj.variables.W ?? 0),
        T: Object.entries(obj.variables)
          .filter(([key]) => isTVariable(key))
          .map(([_key, value]) => BigInt((value as string).toString()))
      }
    }

    this.sim = {
      ...obj,
      ir: undefined,
      pc: undefined,
      alu: undefined,
      acc: undefined,
      code: undefined,
      variables: undefined,
    }
  }

  fromVNSP(file: string):void {
    // split input file lines
    const rows:string[] = file.split(/\n+/)

    // code for memory cells (removing NOP used as placeholders)
    const nop_cmds = new RegExp("NOP", "g")
    const code = rows[5].split(",").join("\fieldn").replace(nop_cmds, "")

    // X-Y-Z-W variables
    const variables = rows[8].split(',')

    // T1-40 variables
    const tVariables = rows[11].split(',')

    this.sim = {
      title: "Untitled",
      created: new Date().toISOString().slice(0, 10),
      codeLine: 0,
      step: 0,
      status: 0,
      focus: {
        el: "ir",
        cell: -1,
        var: -1,
      },
    }

    this.ram = {
      code,
      variables: {
        X: BigInt(variables[0]),
        Y: BigInt(variables[1]),
        Z: BigInt(variables[2]),
        W: BigInt(variables[3]),
        T: tVariables.map((v) => BigInt(v)),
      }
    }

    this.alu = {
      e1: BigInt(0),
      e2: BigInt(0),
      op: '',
      acc: BigInt(0),
    }

    this.pc = {
      val: 0,
      step: 1,
    }
    
    this.ir = {
      cmd: '',
      loc: ''
    }
  }

  toData(): SimulatorStateData {
    return {
      ...this
    }
  }

  toJSON(): ExportJSON {
    const variables = {
      ...this.ram.variables,
      T: undefined,
    }

    this.ram.variables.T.forEach((v, i) => {
      variables[`T${i}`] = v
    })

    return {
      ...this.sim,
      code: this.ram.code,
      variables,
      alu: {
        ...this.alu,
        acc: undefined
      },
      acc: this.alu.acc,
      ir: this.ir,
      pc: this.pc,
    }
  }
}