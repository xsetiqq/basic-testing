import { simpleCalculator, Action } from './index';

describe('simpleCalculator - table driven tests', () => {
  test.each([
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 4, b: 6, action: Action.Multiply, expected: 24 },
    { a: 20, b: 5, action: Action.Divide, expected: 4 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  ])(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test.each([
    { a: '2', b: 2, action: Action.Add },
    { a: 2, b: '2', action: Action.Add },
    { a: 2, b: 2, action: '%' },
    { a: null, b: 2, action: Action.Subtract },
    { a: 2, b: undefined, action: Action.Multiply },
  ])('should return null for invalid input: %o', ({ a, b, action }) => {
    expect(simpleCalculator({ a, b, action })).toBeNull();
  });
});
