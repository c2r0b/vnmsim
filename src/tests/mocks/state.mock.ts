import { SimulatorStateData } from "src/types/simulatorState";

export const stateMock: SimulatorStateData = {
    sim: {
        title: 'Test',
        created: '2021-09-18T00:00:00.000Z',
        codeLine: 10,
        step: 2,
        status: 3,
        interval: 1000,
        focus: {
            cell: -1,
            var: '',
            el: '',
        },
    },
    ram: {
        code: 'ADD X',
        variables: {
            X: BigInt(10),
            Y: BigInt(5),
            Z: BigInt(2),
            W: BigInt(1),
            T: [BigInt(2), BigInt(3)],
        },
    },
    alu: {
      e1: BigInt(10),
      e2: BigInt(5),
      op: '+',
      acc: BigInt(2),
    },
    pc: {
        val: 10,
        step: 1,
    },
    ir: {
        cmd: 'ADD',
        loc: 'X',
    },
    stats: {
        executed_step: 3,
        alu_calculation: 5,
        variable_access: 1,
        cell_access: 7,
        performed_jmp: 3,
        performed_jmz: 2,
    },
}