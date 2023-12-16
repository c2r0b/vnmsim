import { execute } from '../middleware/execute';

import aluReducer, { calculate, setAcc, setE1, setE2, setOp } from 'src/store/alu.slice';
import irReducer, { setIrCmd, setIrLoc } from 'src/store/ir.slice';
import pcReducer, { incrementPc, setPc } from 'src/store/pc.slice';
import ramReducer, { setVariable } from 'src/store/ram.slice';
import simReducer, { clearFocus, clearFocusEl, incrementStep, setCodeLine, setFocusCell, setFocusEl, setFocusVar, setStatus, setStep, stopSim, initialState as simInitalState } from 'src/store/sim.slice';
import statsReducer, { incrementAluCalculation, incrementCellAccess, incrementExecutedStep, incrementPerformedJmp, incrementPerformedJmz, incrementVariableAccess } from 'src/store/stats.slice';

import * as Samples from '../samples';
import { SimulatorState } from 'src/types/simulatorState';
import { Status } from 'src/types/status';

let state:any = {};

const dispatch = (action: any) => {
    switch(action.type) {
        case 'ir/setIrCmd': {
            state.ir = irReducer(state.ir, setIrCmd(action.payload));
            break;
        }
        case 'ir/setIrLoc': {
            state.ir = irReducer(state.ir, setIrLoc(action.payload));
            break;
        }
        case 'pc/incrementPc': {
            state.pc = pcReducer(state.pc, incrementPc());
            break;
        }
        case 'pc/setPc': {
            state.pc = pcReducer(state.pc, setPc(action.payload));
            break;
        }
        case 'ram/setVariable': {
            state.ram = ramReducer(state.ram, setVariable(action.payload));
            break;
        }
        case 'alu/setE1': {
            state.alu = aluReducer(state.alu, setE1(action.payload));
            break;
        }
        case 'alu/setE2': {
            state.alu = aluReducer(state.alu, setE2(action.payload));
            break;
        }
        case 'alu/setOp': {
            state.alu = aluReducer(state.alu, setOp(action.payload));
            break;
        }
        case 'alu/setAcc': {
            state.alu = aluReducer(state.alu, setAcc(action.payload));
            break;
        }
        case 'alu/calculate': {
            state.alu = aluReducer(state.alu, calculate());
            break;
        }
        case 'sim/setCodeLine': {
            state.sim = simReducer(state.sim, setCodeLine(action.payload));
            break;
        }
        case 'sim/setStep': {
            state.sim = simReducer(state.sim, setStep(action.payload));
            break;
        }
        case 'sim/incrementStep': {
            state.sim = simReducer(state.sim, incrementStep());
            break;
        }
        case 'sim/setStatus': {
            state.sim = simReducer(state.sim, setStatus(action.payload));
            break;
        }
        case 'sim/setFocusCell': {
            state.sim = simReducer(state.sim, setFocusCell(action.payload));
            break;
        }
        case 'sim/setFocusVar': {
            state.sim = simReducer(state.sim, setFocusVar(action.payload));
            break;
        }
        case 'sim/setFocusEl': {
            state.sim = simReducer(state.sim, setFocusEl(action.payload));
            break;
        }
        case 'sim/clearFocus': {
            state.sim = simReducer(state.sim, clearFocus());
            break;
        }
        case 'sim/clearFocusEl': {
            state.sim = simReducer(state.sim, clearFocusEl());
            break;
        }
        case 'sim/stopSim': {
            state.sim = simReducer(state.sim, stopSim());
            break;
        }
        case 'stats/incrementAluCalculation': {
            state.stats = statsReducer(state.stats, incrementAluCalculation());
            break;
        }
        case 'stats/incrementCellAccess': {
            state.stats = statsReducer(state.stats, incrementCellAccess());
            break;
        }
        case 'stats/incrementExecutedStep': {
            state.stats = statsReducer(state.stats, incrementExecutedStep());
            break;
        }
        case 'stats/incrementPerformedJmp': {
            state.stats = statsReducer(state.stats, incrementPerformedJmp());
            break;
        }
        case 'stats/incrementPerformedJmz': {
            state.stats = statsReducer(state.stats, incrementPerformedJmz());
            break;
        }
        case 'stats/incrementVariableAccess': {
            state.stats = statsReducer(state.stats, incrementVariableAccess());
            break;
        }
        default: {
            console.log('unknown action', action);
        }
    }
}

const getState = () => {
    return state;
}
  
describe('execute middleware', () => {
    // execute all samples
    Object.entries(Samples).forEach(([name, sample]) => {
        it(`should execute sample ${name}`, () => {
            const data = new SimulatorState();
            data.fromJSON({
                ...sample.input,
                codeLine: 0,
                created: '2021-01-01',
                focus: simInitalState.focus,
                status: Status.PLAY,
                title: name
            });
            state = data.toData();

            do {
                execute(dispatch, getState);
            } while (state.sim.status)
            
            expect(state.sim.codeLine).toEqual(sample.result.codeLine);
            expect(state.sim.step).toEqual(sample.result.step);
            expect(state.sim.status).toEqual(sample.result.status);
            expect(state.alu.acc.toString()).toEqual(sample.result.acc.toString());
            expect(state.alu.e1.toString()).toEqual(sample.result.alu.e1.toString());
            expect(state.alu.e2.toString()).toEqual(sample.result.alu.e2.toString());
            expect(state.alu.op).toEqual(sample.result.alu.op);
            expect(state.ir.cmd).toEqual(sample.result.ir.cmd);
            expect(state.ir.loc).toEqual(sample.result.ir.loc);
            expect(state.pc.val).toEqual(sample.result.pc.val);
            expect(state.pc.step).toEqual(sample.result.pc.step);
            expect(state.ram.variables.X?.toString()).toEqual(sample.result.variables.X.toString());
            expect(state.ram.variables.Y?.toString()).toEqual(sample.result.variables.Y.toString());
            expect(state.ram.variables.Z?.toString()).toEqual(sample.result.variables.Z.toString());
            expect(state.ram.variables.W?.toString()).toEqual(sample.result.variables.W.toString());
        });
    });
});