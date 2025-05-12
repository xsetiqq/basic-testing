import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    expect(timeoutSpy).toHaveBeenCalledWith(callback, 1000);
    timeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 500);

    jest.advanceTimersByTime(499);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();
    const intervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 1000);

    expect(intervalSpy).toHaveBeenCalledWith(callback, 1000);
    intervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const fakePath = 'data.txt';
  const fakeFullPath = `/full/path/${fakePath}`;
  const fakeContent = Buffer.from('Hello World');

  beforeEach(() => {
    (join as jest.Mock).mockReturnValue(fakeFullPath);
  });

  test('should call join with pathToFile', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(fakePath);

    expect(join).toHaveBeenCalledWith(__dirname, fakePath);
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(fakePath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fsPromises.readFile as jest.Mock).mockResolvedValue(fakeContent);

    const result = await readFileAsynchronously(fakePath);

    expect(result).toBe('Hello World');
  });
});
