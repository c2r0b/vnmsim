import pcReducer, { clearPc, incrementPc, setPc, setPcStep, initialState } from '../store/pc.slice';

describe('pcReducer', () => {
  it('should handle initial state', () => {
    expect(pcReducer(undefined, { type: 'unknown' })).toEqual({
      val: 0,
      step: 1,
    });
  });
});

describe('reducers', () => {
  it('should handle clearPc', () => {
    const previousState = { val: 10, step: 1 };
    expect(pcReducer(previousState, clearPc())).toEqual(initialState);
  });

  it('should handle incrementPc', () => {
    const previousState = { val: 1, step: 2 };
    expect(pcReducer(previousState, incrementPc())).toEqual({ val: 3, step: 2 });
  });

  it('should handle setPc', () => {
    const previousState = { val: 1, step: 1 };
    const newValue = 5;
    expect(pcReducer(previousState, setPc(newValue))).toEqual({ val: 5, step: 1 });
    expect(pcReducer(previousState, setPc(undefined))).toEqual({ val: initialState.val, step: 1 });
  });

  it('should handle setPcStep', () => {
    const previousState = { val: 1, step: 1 };
    const newStep = 3;
    expect(pcReducer(previousState, setPcStep(newStep))).toEqual({ val: 1, step: 3 });
    expect(pcReducer(previousState, setPcStep(undefined))).toEqual({ val: 1, step: initialState.step });
  });
});
