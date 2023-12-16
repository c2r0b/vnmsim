import type { Sim, Ram, Variables, Pc, Ir, Alu } from 'src-tauri/shared/pkg/shared'
import type { TypeFromWasm } from './fromWasm'

export type TypeToJSON<T> = {
  [P in keyof T as Exclude<P, 'free'>]: 
    T[P] extends (...args: any[]) => any ? never : // Exclude functions
    T[P] extends bigint ? string|number : // Handle BigInt as string
    T[P] extends BigInt[] ? string[] : // Handle ArrayBufferLike as array
    T[P]
}

type TypeFromWasmToJSON<T> = TypeToJSON<TypeFromWasm<T>>

type VariablesJSON = {
  [key in keyof Omit<TypeFromWasm<Variables>, 'T'>]: string|number
} & {
  [key in `T${number}`]: string|number;
};

export type ExportJSON = TypeFromWasmToJSON<Sim> & Pick<TypeFromWasmToJSON<Alu>, 'acc'> & {
  ir: TypeFromWasmToJSON<Ir>,
  pc: TypeFromWasmToJSON<Pc>,
  alu: Omit<TypeFromWasmToJSON<Alu>, 'acc'>,
  code: TypeFromWasmToJSON<Ram["code"]>,
  variables: VariablesJSON
}