import errorReducer, { setError, clearError } from '../store/errors.slice';

describe('error reducer', () => {
  const initialState = {
    error: undefined,
    hasErrors: 0
  };

  it('should handle initial state', () => {
    expect(errorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setError', () => {
    const errorMessage = 'An error occurred';
    const action = { type: setError.type, payload: errorMessage };
    const state = errorReducer(initialState, action);
    expect(state.error).toEqual(errorMessage);
    expect(state.hasErrors).toEqual(1);
  });

  it('should handle clearError', () => {
    // First set an error to change the initial state
    const errorMessage = 'An error occurred';
    let state = errorReducer(initialState, setError(errorMessage));
    
    // Then clear the error
    state = errorReducer(state, clearError());
    expect(state).toEqual(initialState);
  });
});
