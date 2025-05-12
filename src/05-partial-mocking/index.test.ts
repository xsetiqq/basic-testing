jest.mock('./index', () => {
  const actual = jest.requireActual<typeof import('./index')>('./index');

  return {
    ...actual,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');

    consoleSpy.mockRestore();
  });
});
