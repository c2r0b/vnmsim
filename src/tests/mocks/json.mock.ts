import { ExportJSON } from "src/types/exportJSON";

export const jsonMock: ExportJSON = {
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
    acc: '2',
    code: 'ADD X',
    variables: {
        X: '10',
        Y: '5',
        Z: '2',
        W: '1',
        T1: '2',
        T2: '3',
    },
    alu: {
      e1: '10',
      e2: '5',
      op: '+',
    },
    pc: {
        val: 10,
        step: 1,
    },
    ir: {
        cmd: 'ADD',
        loc: 'X',
    }
};