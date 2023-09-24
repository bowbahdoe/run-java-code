import { editCode } from '../actions';
import reducer from '../reducers';


export const hasMainFunctionSelector = (state: any): boolean => {
  const code = state.code;
  const mainMethodPattern = /public\s+static\s+void\s+main\s*\(\s*String\s*\[\]\s+args\s*\)/;
  return mainMethodPattern.test(code);
};

const buildState = (code: string) => {
  const state = reducer(undefined, editCode(code));
  return state;
};

describe('checking for a main function', () => {
  test('empty code has no main', () => {
    expect(hasMainFunctionSelector(buildState(''))).toBe(false);
  });

test('a plain main counts', () => {
  const code = 'public static void main(String[] args)';
  const state = buildState(code);
  expect(hasMainFunctionSelector(state)).toBe(true);
});

  test('extra space everywhere is ignored', () => {
    expect(
      hasMainFunctionSelector(buildState('  public   static   void   main  (  String[]  args  )')),
    ).toBe(true);
  });

  test('a commented-out main does not count', () => {
    expect(hasMainFunctionSelector(buildState('// public static void main(String[] args)'))).toBe(
      false,
    );
    expect(
      hasMainFunctionSelector(buildState('/* public static void main(String[] args) */')),
    ).toBe(false);
  });

  test('a function with the substring main does not count', () => {
    expect(hasMainFunctionSelector(buildState('public static void mainly(String[] args)'))).toBe(
      false,
    );
  });
});