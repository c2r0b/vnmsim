import { lastStep } from 'src/middleware/execute';
import simReducer, {
    clearSim,
    setTitle,
    setCreated,
    initialState,
    setCodeLine,
    incrementCodeLine,
    setStep,
    incrementStep,
    setStatus,
    setInterval,
    setFocusCell,
    setFocusVar,
    setFocusEl,
    clearFocus,
    clearFocusEl,
    stopSim,
  } from '../store/sim.slice';
  
  describe('sim reducer', () => {
    it('should handle initial state', () => {
      expect(simReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle clearSim', () => {
      const updatedState = { ...initialState, title: 'test' };
      const actual = simReducer(updatedState, clearSim());
      expect(actual).toEqual(initialState);
    });
  
    it('should handle setTitle', () => {
      const title = 'new title';
      const actual = simReducer(initialState, setTitle(title));
      expect(actual.title).toEqual(title);
    });

    it('should handle setCreated', () => {
      const created = '2021-01-01';
      const actual = simReducer(initialState, setCreated(created));
      expect(actual.created).toEqual(created);
    });

    it('should handle setCreated with empty string', () => {
      const actual = simReducer(initialState, setCreated(''));
      expect(actual.created).toEqual(initialState.created);
    });

    it('should handle setCodeline', () => {
      const codeLine = 1;
      const actual = simReducer(initialState, setCodeLine(codeLine));
      expect(actual.codeLine).toEqual(codeLine);

      // invalid codeLine
      const actual2 = simReducer(initialState, setCodeLine(undefined));
      expect(actual2.codeLine).toEqual(initialState.codeLine);
    });

    it('should handle incrementCodeLine', () => {
      const actual = simReducer(initialState, incrementCodeLine());
      expect(actual.codeLine).toEqual(initialState.codeLine + 1);
    });

    it('should handle setStep', () => {
      const step = 1;
      const actual = simReducer(initialState, setStep(step));
      expect(actual.step).toEqual(step);

      // invalid step
      const actual2 = simReducer(initialState, setStep(undefined));
      expect(actual2.step).toEqual(initialState.step);
    });

    it('should handle incrementStep', () => {
      const actual = simReducer(initialState, incrementStep());
      expect(actual.step).toEqual(initialState.step + 1);
    });

    it('should handle incrementStep when step is lastStep', () => {
      const step = lastStep;
      const actual = simReducer({ ...initialState, step }, incrementStep());
      expect(actual.step).toEqual(1);
    });
    
    it('should handle incrementStep when step is lastStep and status is 3', () => {
      const step = lastStep;
      const actual = simReducer({ ...initialState, step, status: 3 }, incrementStep());
      expect(actual.step).toEqual(1);
      expect(actual.codeLine).toEqual(initialState.codeLine + 1);
    });

    it('should handle setStatus', () => {
      const status = 1;
      const actual = simReducer(initialState, setStatus(status));
      expect(actual.status).toEqual(status);

      // invalid status
      const actual2 = simReducer(initialState, setStatus(undefined));
      expect(actual2.status).toEqual(initialState.status);
    });

    it('should handle setInterval', () => {
      const interval = 1000;
      const actual = simReducer(initialState, setInterval(interval));
      expect(actual.interval).toEqual(interval);
    });

    it('should handle setFocusCell', () => {
      const cell = 1;
      const actual = simReducer(initialState, setFocusCell(cell));
      expect(actual.focus.cell).toEqual(cell);

      // invalid cell
      const actual2 = simReducer(initialState, setFocusCell(undefined));
      expect(actual2.focus.cell).toEqual(initialState.focus.cell);
    });

    it('should handle setFocusVar', () => {
      const variable = 1;
      const actual = simReducer(initialState, setFocusVar(variable));
      expect(actual.focus.var).toEqual(variable);
    });

    it('should handle setFocusEl', () => {
      const el = 'test';
      const actual = simReducer(initialState, setFocusEl(el));
      expect(actual.focus.el).toEqual(el);
    });

    it('should handle clearFocus', () => {
      const updatedState = { ...initialState, focus: { cell: 1, var: 'X', el: 'test' } };
      const actual = simReducer(updatedState, clearFocus());
      expect(actual.focus).toEqual(initialState.focus);
    });

    it('should handle clearFocusEl', () => {
      const updatedState = { ...initialState, focus: { cell: 1, var: 'X', el: 'test' } };
      const actual = simReducer(updatedState, clearFocusEl());
      expect(actual.focus.el).toEqual(initialState.focus.el);
    });

    it('should handle stopSim', () => {
      const updatedState = { ...initialState, focus: { cell: 1, var: 'X', el: 'test' }, codeLine: 1 };
      const actual = simReducer(updatedState, stopSim());
      expect(actual.status).toEqual(initialState.status);
      expect(actual.focus).toEqual(initialState.focus);
      expect(actual.codeLine).toEqual(initialState.codeLine);
    });
});