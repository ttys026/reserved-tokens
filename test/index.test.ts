import { getValidVarName, reserved } from '../lib';

describe('test', () => {
  test('export', () => {
    expect(getValidVarName).toBeDefined();
    expect(reserved).toBeDefined();
  });

  test('getValidVarName', () => {
    expect(getValidVarName('varName')).toBe('varName');
    expect(getValidVarName('void')).toBe('void_1');
    expect(getValidVarName('const')).toBe('const_1');
    expect(getValidVarName('void')).toBe('void_2');
    expect(getValidVarName('type')).toBe('type');
    expect(getValidVarName('global')).toBe('global');
    expect(getValidVarName('const')).toBe('const_2');
  })
})