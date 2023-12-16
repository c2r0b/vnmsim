import irReducer, { clearIr, setIrCmd, setIrLoc, initialState } from '../store/ir.slice';

describe('irSlice', () => {
  // Testing clearIr action
  it('should handle initial state', () => {
    expect(irReducer(undefined, { type: 'unknown' })).toEqual({
      cmd: '',
      loc: ''
    });
  });

  it('should handle clearIr', () => {
    const actual = irReducer(initialState, clearIr());
    expect(actual).toEqual(initialState);
  });

  // Testing setIrCmd action
  it('should handle setIrCmd', () => {
    const testCmd = 'LOD';
    const actual = irReducer(initialState, setIrCmd(testCmd));
    expect(actual.cmd).toEqual(testCmd);
    expect(actual.loc).toEqual('');
  });

  // Testing setIrLoc action
  it('should handle setIrLoc', () => {
    const testLoc = 'X';
    const actual = irReducer(initialState, setIrLoc(testLoc));
    expect(actual.loc).toEqual(testLoc);
  });
});
