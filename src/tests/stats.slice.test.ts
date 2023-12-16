import statsReducer, {
  initialState,
  clearStats,
  setStats,
  incrementExecutedStep,
  incrementAluCalculation,
  incrementVariableAccess,
  incrementCellAccess,
  incrementPerformedJmp,
  incrementPerformedJmz
} from '../store/stats.slice';

describe('statsSlice', () => {
  it('should handle initial state', () => {
    expect(statsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearStats', () => {
    const actual = statsReducer(initialState, clearStats());
    expect(actual).toEqual(initialState);
  });

  it('should handle setStats', () => {
    const newStats = {
      executed_step: 5,
      alu_calculation: 3,
      variable_access: 2,
      cell_access: 4,
      performed_jmp: 1,
      performed_jmz: 0,
    };
    const actual = statsReducer(initialState, setStats(newStats));
    expect(actual).toEqual(newStats);
  });

  it('should handle incrementExecutedStep', () => {
    const actual = statsReducer(initialState, incrementExecutedStep());
    expect(actual.executed_step).toEqual(1);
  });

  it('should handle incrementAluCalculation', () => {
    const actual = statsReducer(initialState, incrementAluCalculation());
    expect(actual.alu_calculation).toEqual(1);
  });

  it('should handle incrementVariableAccess', () => {
    const actual = statsReducer(initialState, incrementVariableAccess());
    expect(actual.variable_access).toEqual(1);
  });

  it('should handle incrementCellAccess', () => {
    const actual = statsReducer(initialState, incrementCellAccess());
    expect(actual.cell_access).toEqual(1);
  });

  it('should handle incrementPerformedJmp', () => {
    const actual = statsReducer(initialState, incrementPerformedJmp());
    expect(actual.performed_jmp).toEqual(1);
  });

  it('should handle incrementPerformedJmz', () => {
    const actual = statsReducer(initialState, incrementPerformedJmz());
    expect(actual.performed_jmz).toEqual(1);
  });
});
