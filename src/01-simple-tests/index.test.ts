import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 4, action: Action.Subtract })).toBe(6);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 7, action: Action.Multiply })).toBe(42);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 20, b: 4, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Exponentiate })).toBe(
      16,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2', b: 3, action: Action.Add })).toBeNull();
  });
});
