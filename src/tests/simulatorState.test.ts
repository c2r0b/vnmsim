import { SimulatorState } from '../types/simulatorState';
import { initialState as simInitialState } from '../store/sim.slice'
import { initialState as ramInitialState } from '../store/ram.slice'
import { initialState as irInitialState } from '../store/ir.slice'
import { initialState as aluInitialState } from '../store/alu.slice'
import { initialState as pcInitialState } from '../store/pc.slice'
import { initialState as statsInitialState } from '../store/stats.slice'

import { stateMock, jsonMock, vnspMock } from './mocks'

describe('SimulatorState', () => {
  describe('constructor', () => {
    it('should initialize with default values if no parameters are passed', () => {
      const simulatorState = new SimulatorState();
      expect(simulatorState.sim).toEqual(simInitialState);
      expect(simulatorState.ram).toEqual(ramInitialState);
      expect(simulatorState.alu).toEqual(aluInitialState);
      expect(simulatorState.pc).toEqual(pcInitialState);
      expect(simulatorState.ir).toEqual(irInitialState);
      expect(simulatorState.stats).toEqual(statsInitialState);
    });

    it('should initialize with provided parameters', () => {
      const params = stateMock;
      const simulatorState = new SimulatorState(params);
      expect(simulatorState.sim).toEqual(params.sim);
      expect(simulatorState.ram).toEqual(params.ram);
      expect(simulatorState.alu).toEqual(params.alu);
      expect(simulatorState.pc).toEqual(params.pc);
      expect(simulatorState.ir).toEqual(params.ir);
      expect(simulatorState.stats).toEqual(params.stats);
    });
  });

  describe('fromJSON', () => {
    it('should correctly set state from JSON object', () => {
      const json = jsonMock;
      const simulatorState = new SimulatorState();
      simulatorState.fromJSON(json);
      expect(simulatorState.sim.title).toEqual(json.title);
      expect(simulatorState.sim.created).toEqual(json.created);
      expect(simulatorState.sim.codeLine).toEqual(json.codeLine);
      expect(simulatorState.sim.step).toEqual(json.step);
      expect(simulatorState.sim.status).toEqual(json.status);
      expect(simulatorState.sim.interval).toEqual(json.interval);
      expect(simulatorState.sim.focus).toEqual(json.focus);
      expect(simulatorState.alu.e1).toEqual(BigInt(json.alu.e1));
      expect(simulatorState.alu.e2).toEqual(BigInt(json.alu.e2));
      expect(simulatorState.alu.op).toBe(json.alu.op);
      expect(simulatorState.alu.acc).toEqual(BigInt(json.acc));
      expect(simulatorState.ir).toEqual(json.ir);
      expect(simulatorState.pc).toEqual(json.pc);
      expect(simulatorState.ram.code).toBe(json.code);
      expect(simulatorState.ram.variables.X).toEqual(BigInt(json.variables.X as any));
      expect(simulatorState.ram.variables.Y).toEqual(BigInt(json.variables.Y as any));
      expect(simulatorState.ram.variables.Z).toEqual(BigInt(json.variables.Z as any));
      expect(simulatorState.ram.variables.W).toEqual(BigInt(json.variables.W as any));
      expect(simulatorState.ram.variables.T).toEqual([
        BigInt(json.variables.T1 as any),
        BigInt(json.variables.T2 as any)
      ]);
    });
  });

  describe('fromVNSP', () => {
    it('should correctly parse and set state from VNSP file content', () => {
      const variablesToString = (variables: Record<string, bigint | bigint[] | BigInt[]>) => {
        return Object.keys(variables).filter(([key]) => key !== 'T')
          .map(([_, value]) => value?.toString())
      }
      const simulatorState = new SimulatorState();
      simulatorState.fromVNSP(vnspMock);
      expect(simulatorState.sim.title).toEqual(stateMock.sim.title);
      expect(simulatorState.ram.code).toEqual(stateMock.ram.code);
      expect(variablesToString(simulatorState.ram.variables))
        .toEqual(variablesToString(stateMock.ram.variables));
      expect(simulatorState.ram.variables.T.map((t) => t.toString()))
        .toEqual(stateMock.ram.variables.T.map((t) => t.toString()));
    });
  });

  describe('toData', () => {
    it('should correctly return SimulatorStateData', () => {
      const simulatorState = new SimulatorState(stateMock);
      expect(simulatorState.toData()).toEqual(stateMock);
    });
  });

  describe('toJSON', () => {
    it('should correctly convert the state to a JSON object with custom values', () => {
      const simulatorState = new SimulatorState(stateMock);
      expect(simulatorState.toJSON()).toEqual(jsonMock);
    });

    it('should include all relevant properties in the JSON object', () => {
      const simulatorState = new SimulatorState();
      const jsonResult = simulatorState.toJSON();
      
      Object.keys(jsonMock).forEach((key) => {
        expect(jsonResult).toHaveProperty(key);
      });
    });
  });
});
