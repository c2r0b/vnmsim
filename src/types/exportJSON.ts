import type { Sim, Ram, Variables, Pc, Ir, Alu } from 'src-tauri/shared/pkg'
import type { TypeFromWasm } from './fromWasm'

export type TypeToJSON<T> = {
  [P in keyof T as Exclude<P, 'free'>]: 
    T[P] extends (...args: any[]) => any ? never : // Exclude functions
    T[P] extends bigint ? string : // Handle BigInt as string
    T[P] extends BigInt[] ? string[] : // Handle ArrayBufferLike as array
    T[P]
}

type TypeFromWasmToJSON<T> = TypeToJSON<TypeFromWasm<T>>

type VariablesJSON = {
  [key in keyof Omit<TypeFromWasm<Variables>, 'T'>]: string
} & {
  [key in `T${number}`]: string;
};

export type ExportJSON = TypeFromWasmToJSON<Sim> & {
  ir: TypeFromWasmToJSON<Ir>,
  pc: TypeFromWasmToJSON<Pc>,
  alu: Omit<TypeFromWasmToJSON<Alu>, 'acc'>,
  acc: TypeFromWasmToJSON<Alu>['acc'],
  code: TypeFromWasmToJSON<Ram["code"]>,
  variables: VariablesJSON
}