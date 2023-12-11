import reducer, {
  clearRam,
  setCode,
  setVariable,
  addTVariable,
  initialState
} from '../store/ram.slice';

describe('clearRam reducer', () => {
  it('should reset the state to initial state', () => {
    const previousState = { code: 'ADD X', variables: {
      X: BigInt(1),
      Y: BigInt(2),
      Z: BigInt(3),
      W: BigInt(4),
      T: [BigInt(5), BigInt(6)],
    } };
    expect(reducer(previousState, clearRam())).toEqual(initialState);
  });
});

describe('setCode reducer', () => {
  it('should set the code value', () => {
    const code = 'new code';
    const result = reducer(initialState, setCode(code));
    expect(result.code).toEqual(code);
  });
});

describe('setVariable reducer', () => {
  it('should set a regular variable', () => {
    const action = { payload: { name: 'X', value: 123 } };
    const result = reducer(initialState, setVariable(action.payload));
    expect(result.variables.X?.toString()).toEqual(action.payload.value.toString());
  });

  it('should set a T-variable', () => {
    const action = { payload: { name: 'T0', value: 456 } };
    const result = reducer(initialState, setVariable(action.payload));
    expect(result.variables.T[0].toString()).toEqual(action.payload.value.toString());
  });
});

describe('addTVariable reducer', () => {
  it('should add a new T-variable', () => {
    const previousState = { ...initialState, variables: { ...initialState.variables, T: [BigInt(1), BigInt(2)] } };
    const result = reducer(previousState, addTVariable());
    expect(result.variables.T.length).toEqual(3);
  });
});
