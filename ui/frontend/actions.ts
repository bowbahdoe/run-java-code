import fetch from 'isomorphic-fetch';
import { ThunkAction as ReduxThunkAction, AnyAction } from '@reduxjs/toolkit';

import {
  codeSelector,
  runAsTest,
} from './selectors';
import State from './state';
import {
  Backtrace,
  Edition,
  Editor,
  Focus,
  Mode,
  Notification,
  Orientation,
  Page,
  PairCharacters,
  Preview,
  PrimaryAction,
  PrimaryActionAuto,
  PrimaryActionCore,
  ProcessAssembly,
  Position,
  makePosition,
  Version,
} from './types';

import { ExecuteRequestBody, performCommonExecute, wsExecuteRequest } from './reducers/output/execute';
import { performGistLoad } from './reducers/output/gist';

export const routes = {
  compile: '/compile',
  execute: '/execute',
  format: '/format',
  meta: {
    version: {
      java17: '/meta/version/java17_',
      java18: '/meta/version/java28_',
      java19: '/meta/version/java19_',
      java20: '/meta/version/java20_',
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
  ChangeMode = 'CHANGE_MODE',
  ChangeEdition = 'CHANGE_EDITION',
  ChangeBacktrace = 'CHANGE_BACKTRACE',
  ChangePreview = 'CHANGE_PREVIEW',
  ChangeFocus = 'CHANGE_FOCUS',
  EditCode = 'EDIT_CODE',
  AddMainFunction = 'ADD_MAIN_FUNCTION',
  AddImport = 'ADD_IMPORT',
  EnableFeatureGate = 'ENABLE_FEATURE_GATE',
  GotoPosition = 'GOTO_POSITION',
  SelectText = 'SELECT_TEXT',
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


export const changeProcessAssembly = (processAssembly: ProcessAssembly) =>
  createAction(ActionType.ChangeProcessAssembly, { processAssembly });

const changePrimaryAction = (primaryAction: PrimaryAction) =>
  createAction(ActionType.ChangePrimaryAction, { primaryAction });

export const changeMode = (mode: Mode) =>
  createAction(ActionType.ChangeMode, { mode });

export const changeEdition = (edition: Edition) =>
  createAction(ActionType.ChangeEdition, { edition });

export const changeBacktrace = (backtrace: Backtrace) =>
  createAction(ActionType.ChangeBacktrace, { backtrace });

export const changePreview = (preview: Preview) =>
  createAction(ActionType.ChangePreview, { preview });

export const reExecuteWithBacktrace = (): ThunkAction => dispatch => {
  dispatch(changeBacktrace(Backtrace.Enabled));
  dispatch(performExecuteOnly());
};

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



const performExecuteOnly = (): ThunkAction => performCommonExecute('bin', false);
const performCompileOnly = (): ThunkAction => performCommonExecute('lib', false);

interface CompileRequestBody extends ExecuteRequestBody {
  target: string;
  assemblyFlavor: string;
  demangleAssembly: string;
  processAssembly: string;
}

type CompileResponseBody = CompileSuccess;

interface CompileSuccess {
  code: string;
  stdout: string;
  stderr: string;
}

interface CompileFailure {
  error: string;
}

function performCompileShow(
  target: string,
  { request, success, failure }: {
    request: () => Action,
    success: (body: CompileResponseBody) => Action,
    failure: (f: CompileFailure) => Action,
  }): ThunkAction {
  // TODO: Check a cache
  return function(dispatch, getState) {
    dispatch(request());

    const state = getState();
    const code = codeSelector(state);
    const { configuration: {
      mode,
      edition,
      assemblyFlavor,
      demangleAssembly,
      processAssembly,
    } } = state;
    const tests = runAsTest(state);
    const backtrace = state.configuration.backtrace === Backtrace.Enabled;
    const body: CompileRequestBody = {
      mode,
      edition,
      version:
      tests,
      code,
      target,
      backtrace,
    };

    return jsonPost<CompileResponseBody>(routes.compile, body)
      .then(json => dispatch(success(json)))
      .catch(json => dispatch(failure(json)));
  };
}


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



const requestVersionsLoad = () =>
  createAction(ActionType.RequestVersionsLoad);

const receiveVersionsLoadSuccess = ({
  java17, java18,  java19, java20,
}: {
  java17: Version,
  java18: Version,
  java19: Version,
  java20: Version,
}) =>
  createAction(ActionType.VersionsLoadSucceeded, { java17, java18, java19, java20});

export function performVersionsLoad(): ThunkAction {
  return function(dispatch) {
    dispatch(requestVersionsLoad());

    const java17 = jsonGet(routes.meta.version.java17);
    const java18 = jsonGet(routes.meta.version.java18);
    const java19 = jsonGet(routes.meta.version.java19);
    const java20 = jsonGet(routes.meta.version.java20);

    const all = Promise.all([java17, java18, java19, java20]);

    return all
      .then(([java17, java18, java19, java20]) => dispatch(receiveVersionsLoadSuccess({
        java17,
        java18,
        java19,
        java20,
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


function parseMode(s?: string): Mode | null {
  switch (s) {
    case 'debug':
      return Mode.Debug;
    case 'release':
      return Mode.Release;
    default:
      return null;
  }
}

function parseEdition(s?: string): Edition | null {
  switch (s) {
    case 'javaSE':
      return Edition.JavaStandardEdition;
    case 'javaEE':
      return Edition.JavaEnterpriseEdition;
    case 'javaME':
      return Edition.JavaMicroEdition;
    case 'javaME':
      return Edition.JavaFX;
    default:
      return null;
  }
}

export function indexPageLoad({
  code,
  gist,
  version,
  mode: modeString,
  edition: editionString,
}: { code?: string, gist?: string, version?: string, mode?: string, edition?: string }): ThunkAction {
  return function(dispatch) {
    const channel = version;
    const mode = parseMode(modeString) || Mode.Debug;
    let maybeEdition = parseEdition(editionString);

    dispatch(navigateToIndex());

    if (code || gist) {
      // We need to ensure that any links that predate the existence
      // of editions will *forever* pick 2015. However, if we aren't
      // loading code, then allow the edition to remain the default.
      if (!maybeEdition) {
        maybeEdition = Edition.JavaStandardEdition;
      }
    }

    const edition = maybeEdition || Edition.Rust2021;

    if (code) {
      dispatch(editCode(code));
    } else if (gist) {
      dispatch(performGistLoad({ id: gist, channel, mode, edition }));
    }

    dispatch(changeMode(mode));
    dispatch(changeEdition(edition));
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
  | ReturnType<typeof changeBacktrace>
  | ReturnType<typeof changePreview>
  | ReturnType<typeof changeEdition>
  | ReturnType<typeof changeEditor>
  | ReturnType<typeof changeFocus>
  | ReturnType<typeof changeKeybinding>
  | ReturnType<typeof changeMode>
  | ReturnType<typeof changeOrientation>
  | ReturnType<typeof changePrimaryAction>
  | ReturnType<typeof changeProcessAssembly>
  | ReturnType<typeof changeAceTheme>
  | ReturnType<typeof changeMonacoTheme>
  | ReturnType<typeof editCode>
  | ReturnType<typeof addMainFunction>
  | ReturnType<typeof addImport>
  | ReturnType<typeof enableFeatureGate>
  | ReturnType<typeof gotoPosition>
  | ReturnType<typeof selectText>
  | ReturnType<typeof requestVersionsLoad>
  | ReturnType<typeof receiveVersionsLoadSuccess>
  | ReturnType<typeof notificationSeen>
  | ReturnType<typeof browserWidthChanged>
  | ReturnType<typeof splitRatioChanged>
  | ReturnType<typeof wsExecuteRequest>
  ;
