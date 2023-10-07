import fetch from 'isomorphic-fetch';
import {AnyAction, ThunkAction as ReduxThunkAction} from '@reduxjs/toolkit';

import {clippyRequestSelector, codeSelector, getAction} from './selectors';
import State from './state';
import {
  AssemblyFlavor,
  Crate,
  DemangleAssembly,
  Editor,
  Focus,
  makePosition,
  Notification,
  Orientation,
  Page,
  PairCharacters,
  Position,
  Preview,
  PrimaryAction,
  PrimaryActionAuto,
  PrimaryActionCore,
  ProcessAssembly,
  Release,
  Runtime,
  Version,
} from './types';

import { performCommonExecute, wsExecuteRequest} from './reducers/output/execute';
import {performGistLoad} from './reducers/output/gist';

export const routes = {
  compile: '/compile',
  execute: '/execute',
  format: '/format',
  clippy: '/clippy',
  miri: '/miri',
  macroExpansion: '/macro-expansion',
  meta: {
    crates: '/meta/crates',
    version: {
      latest: '/meta/version/latest',
      valhalla: '/meta/version/valhalla',
      earlyAccess: '/meta/version/early_access',
    },
    gistSave: '/meta/gist',
    gistLoad: '/meta/gist/id',
  },
};

export type ThunkAction<T = void> = ReduxThunkAction<T, State, {}, Action>;
export type SimpleThunkAction<T = void> = ReduxThunkAction<T, State, {}, AnyAction>;

const createAction = <T extends string, P extends {}>(type: T, props?: P) => (
  Object.assign({ type }, props)
);

export enum ActionType {
  InitializeApplication = 'INITIALIZE_APPLICATION',
  DisableSyncChangesToStorage = 'DISABLE_SYNC_CHANGES_TO_STORAGE',
  SetPage = 'SET_PAGE',
  ChangeEditor = 'CHANGE_EDITOR',
  ChangeKeybinding = 'CHANGE_KEYBINDING',
  ChangeAceTheme = 'CHANGE_ACE_THEME',
  ChangeMonacoTheme = 'CHANGE_MONACO_THEME',
  ChangePairCharacters = 'CHANGE_PAIR_CHARACTERS',
  ChangeOrientation = 'CHANGE_ORIENTATION',
  ChangeAssemblyFlavor = 'CHANGE_ASSEMBLY_FLAVOR',
  ChangePrimaryAction = 'CHANGE_PRIMARY_ACTION',
  ChangeRuntime = 'CHANGE_RUNTIME',
  ChangeDemangleAssembly = 'CHANGE_DEMANGLE_ASSEMBLY',
  ChangeProcessAssembly = 'CHANGE_PROCESS_ASSEMBLY',
  ChangeRelease = 'CHANGE_RELEASE',
  ChangePreview = 'CHANGE_PREVIEW',
  ChangeFocus = 'CHANGE_FOCUS',
  CompileAssemblyRequest = 'COMPILE_ASSEMBLY_REQUEST',
  CompileAssemblySucceeded = 'COMPILE_ASSEMBLY_SUCCEEDED',
  CompileAssemblyFailed = 'COMPILE_ASSEMBLY_FAILED',
  CompileLlvmIrRequest = 'COMPILE_LLVM_IR_REQUEST',
  CompileLlvmIrSucceeded = 'COMPILE_LLVM_IR_SUCCEEDED',
  CompileLlvmIrFailed = 'COMPILE_LLVM_IR_FAILED',
  CompileHirRequest = 'COMPILE_HIR_REQUEST',
  CompileHirSucceeded = 'COMPILE_HIR_SUCCEEDED',
  CompileHirFailed = 'COMPILE_HIR_FAILED',
  CompileMirRequest = 'COMPILE_MIR_REQUEST',
  CompileMirSucceeded = 'COMPILE_MIR_SUCCEEDED',
  CompileMirFailed = 'COMPILE_MIR_FAILED',
  CompileWasmRequest = 'COMPILE_WASM_REQUEST',
  CompileWasmSucceeded = 'COMPILE_WASM_SUCCEEDED',
  CompileWasmFailed = 'COMPILE_WASM_FAILED',
  EditCode = 'EDIT_CODE',
  AddMainFunction = 'ADD_MAIN_FUNCTION',
  AddImport = 'ADD_IMPORT',
  EnableFeatureGate = 'ENABLE_FEATURE_GATE',
  GotoPosition = 'GOTO_POSITION',
  SelectText = 'SELECT_TEXT',
  RequestClippy = 'REQUEST_CLIPPY',
  ClippySucceeded = 'CLIPPY_SUCCEEDED',
  ClippyFailed = 'CLIPPY_FAILED',
  RequestMiri = 'REQUEST_MIRI',
  MiriSucceeded = 'MIRI_SUCCEEDED',
  MiriFailed = 'MIRI_FAILED',
  RequestCratesLoad = 'REQUEST_CRATES_LOAD',
  CratesLoadSucceeded = 'CRATES_LOAD_SUCCEEDED',
  RequestVersionsLoad = 'REQUEST_VERSIONS_LOAD',
  VersionsLoadSucceeded = 'VERSIONS_LOAD_SUCCEEDED',
  NotificationSeen = 'NOTIFICATION_SEEN',
  BrowserWidthChanged = 'BROWSER_WIDTH_CHANGED',
  SplitRatioChanged = 'SPLIT_RATIO_CHANGED',
}

export const initializeApplication = () => createAction(ActionType.InitializeApplication);

export const disableSyncChangesToStorage = () => createAction(ActionType.DisableSyncChangesToStorage);

const setPage = (page: Page) =>
  createAction(ActionType.SetPage, { page });

export const navigateToIndex = () => setPage('index');
export const navigateToHelp = () => setPage('help');

export const changeEditor = (editor: Editor) =>
  createAction(ActionType.ChangeEditor, { editor });

export const changeKeybinding = (keybinding: string) =>
  createAction(ActionType.ChangeKeybinding, { keybinding });

export const changeAceTheme = (theme: string) =>
  createAction(ActionType.ChangeAceTheme, { theme });

export const changeMonacoTheme = (theme: string) =>
  createAction(ActionType.ChangeMonacoTheme, { theme });

export const changePairCharacters = (pairCharacters: PairCharacters) =>
  createAction(ActionType.ChangePairCharacters, { pairCharacters });

export const changeOrientation = (orientation: Orientation) =>
  createAction(ActionType.ChangeOrientation, { orientation });

export const changeAssemblyFlavor = (assemblyFlavor: AssemblyFlavor) =>
  createAction(ActionType.ChangeAssemblyFlavor, { assemblyFlavor });

export const changeDemangleAssembly = (demangleAssembly: DemangleAssembly) =>
  createAction(ActionType.ChangeDemangleAssembly, { demangleAssembly });

export const changeProcessAssembly = (processAssembly: ProcessAssembly) =>
  createAction(ActionType.ChangeProcessAssembly, { processAssembly });

const changePrimaryAction = (primaryAction: PrimaryAction) =>
  createAction(ActionType.ChangePrimaryAction, { primaryAction });

export const changeRuntime = (runtime: Runtime) =>
  createAction(ActionType.ChangeRuntime, { runtime });

export const changeRelease = (release: Release) =>
  createAction(ActionType.ChangeRelease, { release });

export const changePreview = (preview: Preview) =>
  createAction(ActionType.ChangePreview, { preview });

export const changeFocus = (focus?: Focus) =>
  createAction(ActionType.ChangeFocus, { focus });

type FetchArg = Parameters<typeof fetch>[0];

export function jsonGet(url: FetchArg) {
  return fetchJson(url, {
    method: 'get',
  });
}

export function jsonPost<T>(url: FetchArg, body: Record<string, any>): Promise<T> {
  return fetchJson(url, {
    method: 'post',
    body: JSON.stringify(body),
  });
}

async function fetchJson(url: FetchArg, args: RequestInit) {
  const headers = new Headers(args.headers);
  headers.set('Content-Type', 'application/json');

  let response;
  try {
    response = await fetch(url, { ...args, headers });
  } catch (networkError) {
    // e.g. server unreachable
    if (networkError instanceof Error) {
      throw ({
        error: `Network error: ${networkError.toString()}`,
      });
    } else {
      throw ({
        error: 'Unknown error while fetching JSON',
      });
    }
  }

  let body;
  try {
    body = await response.json();
  } catch (convertError) {
    if (convertError instanceof Error) {
      throw ({
        error: `Response was not JSON: ${convertError.toString()}`,
      });
    } else {
      throw ({
        error: 'Unknown error while converting JSON',
      });
    }
  }

  if (response.ok) {
    // HTTP 2xx
    return body;
  } else {
    // HTTP 4xx, 5xx (e.g. malformed JSON request)
    throw body;
  }
}

// We made some strange decisions with how the `fetchJson` function
// communicates errors, so we untwist those here to fit better with
// redux-toolkit's ideas.
export const adaptFetchError = async <R>(cb: () => Promise<R>): Promise<R> => {
  let result;

  try {
    result = await cb();
  } catch (e) {
    if (e && typeof e === 'object' && 'error' in e && typeof e.error === 'string') {
      throw new Error(e.error);
    } else {
      throw new Error('An unknown error occurred');
    }
  }

  if (result && typeof result === 'object' && 'error' in result && typeof result.error === 'string') {
    throw new Error(result.error);
  }

  return result;
}

function performAutoOnly(): ThunkAction {
  return function(dispatch, getState) {
    const state = getState();
    const action = getAction(state);

    return dispatch(performCommonExecute(action));
  };
}

const performExecuteOnly = (): ThunkAction => performCommonExecute('run');
const performCompileOnly = (): ThunkAction => performCommonExecute('build');


interface CompileSuccess {
  code: string;
  stdout: string;
  stderr: string;
}

interface CompileFailure {
  error: string;
}

const requestCompileAssembly = () =>
  createAction(ActionType.CompileAssemblyRequest);

const receiveCompileAssemblySuccess = ({ code, stdout, stderr }: CompileSuccess) =>
  createAction(ActionType.CompileAssemblySucceeded, { code, stdout, stderr });

const receiveCompileAssemblyFailure = ({ error }: CompileFailure) =>
  createAction(ActionType.CompileAssemblyFailed, { error });

const requestCompileLlvmIr = () =>
  createAction(ActionType.CompileLlvmIrRequest);

const receiveCompileLlvmIrSuccess = ({ code, stdout, stderr }: CompileSuccess) =>
  createAction(ActionType.CompileLlvmIrSucceeded, { code, stdout, stderr });

const receiveCompileLlvmIrFailure = ({ error }: CompileFailure) =>
  createAction(ActionType.CompileLlvmIrFailed, { error });

const requestCompileHir = () =>
  createAction(ActionType.CompileHirRequest);

const receiveCompileHirSuccess = ({ code, stdout, stderr }: CompileSuccess) =>
  createAction(ActionType.CompileHirSucceeded, { code, stdout, stderr });

const receiveCompileHirFailure = ({ error }: CompileFailure) =>
  createAction(ActionType.CompileHirFailed, { error });

const requestCompileMir = () =>
  createAction(ActionType.CompileMirRequest);

const receiveCompileMirSuccess = ({ code, stdout, stderr }: CompileSuccess) =>
  createAction(ActionType.CompileMirSucceeded, { code, stdout, stderr });

const receiveCompileMirFailure = ({ error }: CompileFailure) =>
  createAction(ActionType.CompileMirFailed, { error });

const requestCompileWasm = () =>
  createAction(ActionType.CompileWasmRequest);

const receiveCompileWasmSuccess = ({ code, stdout, stderr }: CompileSuccess) =>
  createAction(ActionType.CompileWasmSucceeded, { code, stdout, stderr });

const receiveCompileWasmFailure = ({ error }: CompileFailure) =>
  createAction(ActionType.CompileWasmFailed, { error });

const PRIMARY_ACTIONS: { [index in PrimaryAction]: () => ThunkAction } = {
  [PrimaryActionCore.Compile]: performCompileOnly,
  [PrimaryActionCore.Execute]: performExecuteOnly,
  [PrimaryActionAuto.Auto]: performAutoOnly,
};

export const performPrimaryAction = (): ThunkAction => (dispatch, getState) => {
  const state = getState();
  const primaryAction = PRIMARY_ACTIONS[state.configuration.primaryAction];
  dispatch(primaryAction());
};

const performAndSwitchPrimaryAction = (inner: () => ThunkAction, id: PrimaryAction) => (): ThunkAction => dispatch => {
  dispatch(changePrimaryAction(id));
  dispatch(inner());
};

export const performExecute =
  performAndSwitchPrimaryAction(performExecuteOnly, PrimaryActionCore.Execute);
export const performCompile =
  performAndSwitchPrimaryAction(performCompileOnly, PrimaryActionCore.Compile);

export const editCode = (code: string) =>
  createAction(ActionType.EditCode, { code });

export const addMainFunction = () =>
  createAction(ActionType.AddMainFunction);

export const addImport = (code: string) =>
  createAction(ActionType.AddImport, { code });

export const enableFeatureGate = (featureGate: string) =>
  createAction(ActionType.EnableFeatureGate, { featureGate });

export const gotoPosition = (line: string | number, column: string | number) =>
  createAction(ActionType.GotoPosition, makePosition(line, column));

export const selectText = (start: Position, end: Position) =>
  createAction(ActionType.SelectText, { start, end });

interface GeneralSuccess {
  stdout: string;
  stderr: string;
}

const requestClippy = () =>
  createAction(ActionType.RequestClippy);

interface ClippyRequestBody {
  code: string;
  release: string;
  action: string;
}

interface ClippyResponseBody {
  success: boolean;
  stdout: string;
  stderr: string;
}

type ClippySuccess = GeneralSuccess;

const receiveClippySuccess = ({ stdout, stderr }: ClippySuccess) =>
  createAction(ActionType.ClippySucceeded, { stdout, stderr });

const receiveClippyFailure = ({ error }: CompileFailure) =>
  createAction(ActionType.ClippyFailed, { error });

export function performClippy(): ThunkAction {
  // TODO: Check a cache
  return function(dispatch, getState) {
    dispatch(requestClippy());

    const body: ClippyRequestBody = clippyRequestSelector(getState());

    return jsonPost<ClippyResponseBody>(routes.clippy, body)
      .then(json => dispatch(receiveClippySuccess(json)))
      .catch(json => dispatch(receiveClippyFailure(json)));
  };
}

const requestMiri = () =>
  createAction(ActionType.RequestMiri);

interface MiriRequestBody {
  code: string;
  release: string;
}

interface MiriResponseBody {
  success: boolean;
  stdout: string;
  stderr: string;
}

type MiriSuccess = GeneralSuccess;

const receiveMiriSuccess = ({ stdout, stderr }: MiriSuccess) =>
  createAction(ActionType.MiriSucceeded, { stdout, stderr });

const receiveMiriFailure = ({ error }: CompileFailure) =>
  createAction(ActionType.MiriFailed, { error });

export function performMiri(): ThunkAction {
  // TODO: Check a cache
  return function(dispatch, getState) {
    dispatch(requestMiri());

    const state = getState();
    const code = codeSelector(state);
    const { configuration: {
      release,
    } } = state;
    const body: MiriRequestBody = { code, release };

    return jsonPost<MiriResponseBody>(routes.miri, body)
      .then(json => dispatch(receiveMiriSuccess(json)))
      .catch(json => dispatch(receiveMiriFailure(json)));
  };
}


const requestCratesLoad = () =>
  createAction(ActionType.RequestCratesLoad);

const receiveCratesLoadSuccess = ({ crates }: { crates: Crate[] }) =>
  createAction(ActionType.CratesLoadSucceeded, { crates });

export function performCratesLoad(): ThunkAction {
  return function(dispatch) {
    dispatch(requestCratesLoad());

    return jsonGet(routes.meta.crates)
      .then(json => dispatch(receiveCratesLoadSuccess(json)));
    // TODO: Failure case
  };
}

const requestVersionsLoad = () =>
  createAction(ActionType.RequestVersionsLoad);

const receiveVersionsLoadSuccess = ({
  latest, valhalla, earlyAccess,
}: {
  latest: Version,
  valhalla: Version,
  earlyAccess: Version
}) =>
  createAction(ActionType.VersionsLoadSucceeded, { latest, valhalla, earlyAccess });

export function performVersionsLoad(): ThunkAction {
  return function(dispatch) {
    dispatch(requestVersionsLoad());

    const latest = jsonGet(routes.meta.version.latest);
    const valhalla = jsonGet(routes.meta.version.valhalla);
    const earlyAccess = jsonGet(routes.meta.version.earlyAccess);

    const all = Promise.all([ latest, valhalla, earlyAccess ]);

    return all
      .then(([ latest, valhalla, earlyAccess ]) => dispatch(receiveVersionsLoadSuccess({
        latest,
        valhalla,
        earlyAccess,
      })));
    // TODO: Failure case
  };
}

const notificationSeen = (notification: Notification) =>
  createAction(ActionType.NotificationSeen, { notification });

export const seenRustSurvey2022 = () => notificationSeen(Notification.RustSurvey2022);

export const browserWidthChanged = (isSmall: boolean) =>
  createAction(ActionType.BrowserWidthChanged, { isSmall });

export const splitRatioChanged = () =>
  createAction(ActionType.SplitRatioChanged);

function parseRuntime(s?: string): Runtime | null {
  switch (s) {
    case 'latest':
      return Runtime.Latest
    case 'valhalla':
      return Runtime.Valhalla
    case 'early_access':
      return Runtime.EarlyAccess
    default:
      return null;
  }
}

function parseRelease(s?: string): Release | null {
  switch (s) {
    case '8':
      return Release.Java8;
    case '9':
      return Release.Java9;
    case '10':
      return Release.Java10;
    case '11':
      return Release.Java11;
    case '12':
      return Release.Java12;
    case '13':
      return Release.Java13;
    case '14':
      return Release.Java14;
    case '15':
      return Release.Java15;
    case '16':
      return Release.Java16;
    case '17':
      return Release.Java17;
    case '18':
      return Release.Java18;
    case '19':
      return Release.Java19;
    case '20':
      return Release.Java20;
    case '21':
      return Release.Java21;
    case '22':
      return Release.Java22;
    default:
      return null;
  }
}

function parsePreview(s?: string): Preview | null {
  switch (s) {
    case 'enabled':
      return Preview.Enabled;
    case 'disabled':
      return Preview.Disabled;
    default:
      return null;
  }
}

export function indexPageLoad({
  code,
  gist,
  runtime: runtimeString,
  release: releaseString,
  preview: previewString,
}: { code?: string, gist?: string, runtime?: string, release?: string, preview?: string }): ThunkAction {
  return function(dispatch) {
    const runtime = parseRuntime(runtimeString) || Runtime.Latest;
    const release = parseRelease(releaseString) || Release.Java21;
    const preview = parsePreview(previewString) || Preview.Disabled;

    dispatch(navigateToIndex());

    if (code) {
      dispatch(editCode(code));
    } else if (gist) {
      dispatch(performGistLoad({ id: gist, runtime, release, preview }));
    }

    dispatch(changeRelease(release));
    dispatch(changePreview(preview));
    dispatch(changeRuntime(runtime));
  };
}

export function helpPageLoad() {
  return navigateToHelp();
}

export function showExample(code: string): ThunkAction {
  return function(dispatch) {
    dispatch(navigateToIndex());
    dispatch(editCode(code));
  };
}

export type Action =
  | ReturnType<typeof initializeApplication>
  | ReturnType<typeof disableSyncChangesToStorage>
  | ReturnType<typeof setPage>
  | ReturnType<typeof changePairCharacters>
  | ReturnType<typeof changeAssemblyFlavor>
  | ReturnType<typeof changePreview>
  | ReturnType<typeof changeRuntime>
  | ReturnType<typeof changeDemangleAssembly>
  | ReturnType<typeof changeRelease>
  | ReturnType<typeof changeEditor>
  | ReturnType<typeof changeFocus>
  | ReturnType<typeof changeKeybinding>
  | ReturnType<typeof changeOrientation>
  | ReturnType<typeof changePrimaryAction>
  | ReturnType<typeof changeProcessAssembly>
  | ReturnType<typeof changeAceTheme>
  | ReturnType<typeof changeMonacoTheme>
  | ReturnType<typeof requestCompileAssembly>
  | ReturnType<typeof receiveCompileAssemblySuccess>
  | ReturnType<typeof receiveCompileAssemblyFailure>
  | ReturnType<typeof requestCompileLlvmIr>
  | ReturnType<typeof receiveCompileLlvmIrSuccess>
  | ReturnType<typeof receiveCompileLlvmIrFailure>
  | ReturnType<typeof requestCompileMir>
  | ReturnType<typeof receiveCompileMirSuccess>
  | ReturnType<typeof receiveCompileMirFailure>
  | ReturnType<typeof requestCompileHir>
  | ReturnType<typeof receiveCompileHirSuccess>
  | ReturnType<typeof receiveCompileHirFailure>
  | ReturnType<typeof requestCompileWasm>
  | ReturnType<typeof receiveCompileWasmSuccess>
  | ReturnType<typeof receiveCompileWasmFailure>
  | ReturnType<typeof editCode>
  | ReturnType<typeof addMainFunction>
  | ReturnType<typeof addImport>
  | ReturnType<typeof enableFeatureGate>
  | ReturnType<typeof gotoPosition>
  | ReturnType<typeof selectText>
  | ReturnType<typeof requestClippy>
  | ReturnType<typeof receiveClippySuccess>
  | ReturnType<typeof receiveClippyFailure>
  | ReturnType<typeof requestMiri>
  | ReturnType<typeof receiveMiriSuccess>
  | ReturnType<typeof receiveMiriFailure>
  | ReturnType<typeof requestCratesLoad>
  | ReturnType<typeof receiveCratesLoadSuccess>
  | ReturnType<typeof requestVersionsLoad>
  | ReturnType<typeof receiveVersionsLoadSuccess>
  | ReturnType<typeof notificationSeen>
  | ReturnType<typeof browserWidthChanged>
  | ReturnType<typeof splitRatioChanged>
  | ReturnType<typeof wsExecuteRequest>
  ;
