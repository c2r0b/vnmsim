import { isTVariable, getTVariableNameFromIndex, getTVariableIndexFromName } from '../utility/tVariables';

describe('T variables utils', () => {
  
  describe('isTVariable', () => {
    it('should return true for strings starting with "T" followed by numbers', () => {
      expect(isTVariable('T1')).toBe(true);
      expect(isTVariable('T20')).toBe(true);
      expect(isTVariable('T0')).toBe(true);
    });

    it('should return false for strings not starting with "T" or without numbers', () => {
      expect(isTVariable('X1')).toBe(false);
      expect(isTVariable('T')).toBe(false);
      expect(isTVariable('Test')).toBe(false);
    });
  });

  describe('getTVariableNameFromIndex', () => {
    it('should return a string with "T" prefixed to the given number', () => {
      expect(getTVariableNameFromIndex(1)).toBe('T1');
      expect(getTVariableNameFromIndex(10)).toBe('T10');
    });
  });

  describe('getTVariableIndexFromName', () => {
    it('should return the number part from a string prefixed with "T"', () => {
      expect(getTVariableIndexFromName('T1')).toBe(1);
      expect(getTVariableIndexFromName('T20')).toBe(20);
      expect(getTVariableIndexFromName('T0')).toBe(0);
    });

    it('should handle improperly formatted strings gracefully', () => {
      expect(getTVariableIndexFromName('T')).toBeNaN();
      expect(getTVariableIndexFromName('TX')).toBeNaN();
    });
  });

});
