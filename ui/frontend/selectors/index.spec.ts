import { editCode } from '../actions';
import reducer from '../reducers';

import { hasMainFunctionSelector } from './index';

const buildState = (code: string) => {
  const state = reducer(undefined, editCode(code));
  return state;
};

describe('checking for a main function', () => {
  test('empty code has no main', () => {
    expect(hasMainFunctionSelector(buildState(''))).toBe(false);
  });

  test('a classic main counts', () => {
    expect(hasMainFunctionSelector(
      buildState('public class Main {\n public static void main(String[] args) {} }'))).toBe(true);
  });

  test('a classic main with different args name counts', () => {
    expect(hasMainFunctionSelector(
      buildState('public class Main {\n public static void main(String[] stuff) {} }'))).toBe(true);
  });

  test('a classic main with a body counts', () => {
    expect(hasMainFunctionSelector(
      buildState(`public class Main {
         public static void main(String[] args) { System.out.println("hello"); } } }`))).toBe(true);
  });

  test('an instance main counts', () => {
    expect(hasMainFunctionSelector(
      buildState('public class Main {\n public void main(String[] args) {} }'))).toBe(true);
  });

  test('an classic main without args counts', () => {
    expect(hasMainFunctionSelector(
      buildState('public class Main {\n public void main() {} }'))).toBe(true);
  });

  test('a non-public main counts', () => {
    expect(hasMainFunctionSelector(
      buildState('public class Main {\n void main(String[] args) {} }'))).toBe(true);
  });

  test('a non-public main without args counts', () => {
    expect(hasMainFunctionSelector(buildState('public class Main {\n void main() {} }'))).toBe(true);
  });

  test('a top-level main counts', () => {
    expect(hasMainFunctionSelector(buildState('void main(String[] args) {}'))).toBe(true);
  });

  test('a top-level main without args counts', () => {
    expect(hasMainFunctionSelector(buildState('void main() {}'))).toBe(true);
  });

  test('leading indentation is ignored', () => {
    expect(hasMainFunctionSelector(buildState('\t void main()'))).toBe(true);
  });

  test('extra space everywhere is ignored', () => {
    expect(hasMainFunctionSelector(buildState('  public   void  main  (  )'))).toBe(true);
  });

  test('a commented-out main does not count', () => {
    expect(hasMainFunctionSelector(buildState('// void main()'))).toBe(false);
    expect(hasMainFunctionSelector(buildState('/* void main()'))).toBe(false);
  });

  test('a function with the substring main does not count', () => {
    expect(hasMainFunctionSelector(buildState('void mainly()'))).toBe(false);
  });
});
