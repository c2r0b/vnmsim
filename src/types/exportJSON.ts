import type { Sim, Ram, Variables, Pc, Ir, Alu } from 'src-wasm/pkg/src_wasm'
import type { TypeFromWasm } from './fromWasm'

export type ExportJSON = TypeFromWasm<Sim> & {
  ir: TypeFromWasm<Ir>,
  pc: TypeFromWasm<Pc>,
  alu: Omit<TypeFromWasm<Alu>, 'acc'>,
  acc: TypeFromWasm<Alu>['acc'],
  code: TypeFromWasm<Ram["code"]>,
  variables: TypeFromWasm<Variables>,
}