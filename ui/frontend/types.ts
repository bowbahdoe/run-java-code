export type Page = 'index' | 'help';

export interface Position {
  line: number;
  column: number;
}

export const makePosition = (line: string | number, column: string | number): Position =>
  ({ line: +line, column: +column });

export interface Selection {
  start?: Position;
  end?: Position;
}

export interface Crate {
  id: string;
  name: string;
  version: string;
}

export interface Version {
  version: string;
  hash: string;
  date: string;
}

export interface CommonEditorProps {
  code: string;
  execute: () => any;
  onEditCode: (_: string) => any;
  position: Position;
  selection: Selection;
  crates: Crate[];
}

export enum Editor {
  Simple = 'simple',
  Ace = 'ace',
  Monaco = 'monaco',
}

export enum PairCharacters {
  Enabled = 'enabled',
  Disabled = 'disabled',
}

export enum Orientation {
  Automatic = 'automatic',
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum AssemblyFlavor {
  Att = 'att',
  Intel = 'intel',
}

export enum DemangleAssembly {
  Demangle = 'demangle',
  Mangle = 'mangle',
}

export enum ProcessAssembly {
  Filter = 'filter',
  Raw = 'raw',
}

export enum PrimaryActionAuto {
  Auto = 'auto',
}

export enum PrimaryActionCore {
  Compile = 'compile',
  Execute = 'execute',
}

export type PrimaryAction = PrimaryActionCore | PrimaryActionAuto;

export enum Runtime {
  Latest = 'latest',
  Valhalla = 'valhalla',
  EarlyAccess = 'early_access'
}

export enum Release {
  Java8 = '8',
  Java9 = '9',
  Java10 = '10',
  Java11 = '11',
  Java12 = '12',
  Java13 = '13',
  Java14 = '14',
  Java15 = '15',
  Java16 = '16',
  Java17 = '17',
  Java18 = '18',
  Java19 = '19',
  Java20 = '20',
  Java21 = '21',
  Java22 = '22'
}

export enum Preview {
  Disabled = 'disabled',
  Enabled = 'enabled',
}

export enum Focus {
  Clippy = 'clippy',
  Miri = 'miri',
  LlvmIr = 'llvm-ir',
  Mir = 'mir',
  Hir = 'hir',
  Wasm = 'wasm',
  Asm = 'asm',
  Execute = 'execute',
  Format = 'format',
  Gist = 'gist',
}

export enum Notification {
  RustSurvey2022 = 'rust-survey-2022',
}

export type AceResizeKey = [Focus | undefined, number];
