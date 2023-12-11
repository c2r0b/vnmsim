import reducer, {
  clearAlu,
  setE1,
  setE2,
  setOp,
  setAcc,
  calculate,
  initialState
} from '../store/alu.slice';

describe('aluSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle clearAlu', () => {
    const previousState = { e1: BigInt(1), e2: BigInt(2), op: '+', acc: BigInt(3) };
    expect(reducer(previousState, clearAlu())).toEqual(initialState);
  });

  it('should handle setE1', () => {
    const e1Value = BigInt(10);
    expect(reducer(initialState, setE1(e1Value))).toEqual({ ...initialState, e1: e1Value });
    expect(reducer(initialState, setE1(''))).toEqual({ ...initialState, e1: initialState.e1 });
  });

  it('should handle setE2', () => {
    const e2Value = BigInt(20);
    expect(reducer(initialState, setE2(e2Value))).toEqual({ ...initialState, e2: e2Value });
    expect(reducer(initialState, setE2(''))).toEqual({ ...initialState, e2: initialState.e2 });
  });

  it('should handle setOp', () => {
    const opValue = '+';
    expect(reducer(initialState, setOp(opValue))).toEqual({ ...initialState, op: opValue });

    const opValue2 = '-';
    expect(reducer(initialState, setOp(opValue2))).toEqual({ ...initialState, op: opValue2 });

    expect(reducer(initialState, setOp(''))).toEqual({ ...initialState, op: initialState.op });
  });

  it('should handle setAcc', () => {
    const accValue = BigInt(30);
    expect(reducer(initialState, setAcc(accValue))).toEqual({ ...initialState, acc: accValue });
    expect(reducer(initialState, setAcc(''))).toEqual({ ...initialState, acc: initialState.acc });
  });

  describe('calculate', () => {
    it('should handle addition', () => {
      const state = { e1: BigInt(1), e2: BigInt(2), op: '+', acc: BigInt(0) };
      expect(reducer(state, calculate())).toEqual({ ...state, acc: BigInt(3) });
    });
    
    it('should handle subtraction', () => {
      const state = { e1: BigInt(2), e2: BigInt(1), op: '-', acc: BigInt(0) };
      expect(reducer(state, calculate())).toEqual({ ...state, acc: BigInt(1) });
    });

    it('should handle multiplication', () => {
      const state = { e1: BigInt(3), e2: BigInt(2), op: '*', acc: BigInt(0) };
      expect(reducer(state, calculate())).toEqual({ ...state, acc: BigInt(6) });
    });

    it('should handle division', () => {
      const state = { e1: BigInt(4), e2: BigInt(2), op: '/', acc: BigInt(0) };
      expect(reducer(state, calculate())).toEqual({ ...state, acc: BigInt(2) });
    });
  });
});
