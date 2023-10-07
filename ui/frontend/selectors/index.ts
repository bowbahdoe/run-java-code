import { source } from 'common-tags';
import { createSelector } from '@reduxjs/toolkit';

import { State } from '../reducers';
import {
  AceResizeKey,
  Release,
  Orientation,
  Preview,
  PrimaryActionAuto,
  PrimaryActionCore,
  Version, Runtime,
} from '../types';

export const codeSelector = (state: State) => state.code;
export const positionSelector = (state: State) => state.position;
export const selectionSelector = (state: State) => state.selection;

const HAS_TESTS_RE = /^\s*#\s*\[\s*test\s*([^"]*)]/m;
export const hasTestsSelector = createSelector(codeSelector, code => !!code.match(HAS_TESTS_RE));

const HAS_MAIN_FUNCTION_RE =
  /^\s*(public\s+)?\s*(static\s+)?\s*\s*void\s+main\s*(\(\s*\)|\(String\s*\[\]\s*[a-z|A-Z|0-9]+\))/m;
export const hasMainFunctionSelector = createSelector(codeSelector, code => !!code.match(HAS_MAIN_FUNCTION_RE));

const autoPrimaryActionSelector = createSelector(
  hasMainFunctionSelector,
  ( hasMainFunction) => {
    if (hasMainFunction) {
      return PrimaryActionCore.Execute;
    } else {
      return PrimaryActionCore.Compile;
    }
  },
);

/* export const runAsTest = createSelector(
  autoPrimaryActionSelector,
  primaryAction => primaryAction === PrimaryActionCore.Test,
); */

export const getAction = createSelector(
  autoPrimaryActionSelector,
  ( primaryAction) => {
    if (primaryAction === PrimaryActionCore.Execute) {
      return 'run';
    } else {
      return 'build';
    }
  },
);

const rawPrimaryActionSelector = (state: State) => state.configuration.primaryAction;

export const isAutoBuildSelector = createSelector(
  rawPrimaryActionSelector,
  autoPrimaryActionSelector,
  (primaryAction, autoPrimaryAction) => (
    primaryAction === PrimaryActionAuto.Auto && autoPrimaryAction === PrimaryActionCore.Compile
  ),
);

const primaryActionSelector = createSelector(
  rawPrimaryActionSelector,
  autoPrimaryActionSelector,
  (primaryAction, autoPrimaryAction): PrimaryActionCore => (
    primaryAction === PrimaryActionAuto.Auto ? autoPrimaryAction : primaryAction
  ),
);

const LABELS: { [index in PrimaryActionCore]: string } = {
  [PrimaryActionCore.Compile]: 'Build',
  [PrimaryActionCore.Execute]: 'Run',
};

export const getExecutionLabel = createSelector(primaryActionSelector, primaryAction => LABELS[primaryAction]);

const getLatest = (state: State) => state.versions?.latest;
const getEarlyAccess = (state: State) => state.versions?.earlyAccess;
const getValhalla = (state: State) => state.versions?.valhalla;

const versionNumber = (v: Version | undefined) => v ? v.version : '';
export const latestVersionText = createSelector(getLatest, versionNumber);
export const earlyAccessVersionText = createSelector(getEarlyAccess, versionNumber);
export const valhallaVersionText = createSelector(getValhalla, versionNumber);

const versionDetails = (v: Version | undefined) => v ? `${v.date} ${v.hash.slice(0, 20)}` : '';

export const clippyVersionDetailsText = createSelector(getLatest, versionDetails);
export const rustfmtVersionDetailsText = createSelector(getLatest, versionDetails);
export const miriVersionDetailsText = createSelector(getLatest, versionDetails);

const runtimeSelector = (state: State) => state.configuration.runtime;
const releaseSelector = (state: State) => state.configuration.release;

export const isWasmAvailable = false;
export const isHirAvailable = false;

export const getRuntimeLabel = (state: State) => {
  const { configuration: { runtime } } = state;
  return `${runtime}`;
};

export const isReleaseDefault = createSelector(
  runtimeSelector,
  releaseSelector,
  (runtime, release) => {
    if (runtime == Runtime.Valhalla) {
      return release == Release.Java20;
    }
    else {
      return release == Release.Java21;
    }
  }
);

export const getPreviewSet = (state: State) => (
  state.configuration.preview !== Preview.Disabled
);

export const getAdvancedOptionsSet = createSelector(
  isReleaseDefault,
  (releaseDefault) => (
    !releaseDefault
  ),
);

export const hasProperties = (obj: {}) => Object.values(obj).some(val => !!val);

const getOutputs = (state: State) => [
  state.output.assembly,
  state.output.clippy,
  state.output.execute,
  state.output.format,
  state.output.gist,
  state.output.llvmIr,
  state.output.mir,
  state.output.hir,
  state.output.miri,
  state.output.wasm,
];

export const getSomethingToShow = createSelector(
  getOutputs,
  a => a.some(hasProperties),
);

export const baseUrlSelector = (state: State) =>
  state.globalConfiguration.baseUrl;

const gistSelector = (state: State) =>
  state.output.gist;

// Selects url.query of build configs.
const urlQuerySelector = createSelector(
  gistSelector,
  gist => {
    const res = new URLSearchParams();
    if (gist.runtime) { res.set('runtime', gist.runtime) }
    if (gist.release) { res.set('release', gist.release) }
    if (gist.preview) { res.set('preview', gist.preview) }
    return res;
  },
);

export const showGistLoaderSelector = createSelector(
  gistSelector,
  gist => gist.requestsInProgress > 0,
);

export const permalinkSelector = createSelector(
  baseUrlSelector, urlQuerySelector, gistSelector,
  (baseUrl, originalQuery, gist) => {
    const u = new URL(baseUrl);
    const query = new URLSearchParams(originalQuery);
    if (gist.id) { query.set('gist', gist.id) }
    u.search = query.toString();
    return u.href;
  },
);

export const textChangedSinceShareSelector = createSelector(
  codeSelector, gistSelector,
  (code, gist) => code !== gist.code
)

const codeBlock = (code: string, language = '') =>
  '```' + language + `\n${code}\n` + '```';

const maybeOutput = (code: string | undefined, whenPresent: (_: string) => void) => {
  if (code && code.length !== 0) { whenPresent(code); }
};

const snippetSelector = createSelector(
  gistSelector, permalinkSelector,
  (gist, permalink) => {
    let snippet = '';

    maybeOutput(gist.code, code => {
      snippet += source`
        ${codeBlock(code, 'rust')}

        ([Playground](${permalink}))
      `;
    });

    maybeOutput(gist.stdout, stdout => {
      snippet += '\n\n';
      snippet +=
        source`
          Output:

          ${codeBlock(stdout)}
        `;
    });

    maybeOutput(gist.stderr, stderr => {
      snippet += '\n\n';
      snippet +=
        source`
          Errors:

          ${codeBlock(stderr)}
        `;
    });

    return snippet;
  },
);

export const urloUrlSelector = createSelector(
  snippetSelector,
  snippet => {
    const newUsersPostUrl = new URL('https://users.rust-lang.org/new-topic');
    newUsersPostUrl.searchParams.set('body', snippet);
    return newUsersPostUrl.href;
  },
);

export const codeUrlSelector = createSelector(
  baseUrlSelector, urlQuerySelector, gistSelector,
  (baseUrl, originalQuery, gist) => {
    const u = new URL(baseUrl);
    const query = new URLSearchParams(originalQuery);
    if (gist.code) { query.set('code', gist.code) }
    u.search = new URLSearchParams(query).toString();
    return u.href;
  },
);

const notificationsSelector = (state: State) => state.notifications;

const NOW = new Date();

const RUST_SURVEY_2022_END = new Date('2022-12-19T00:00:00Z');
const RUST_SURVEY_2022_OPEN = NOW <= RUST_SURVEY_2022_END;
export const showRustSurvey2022Selector = createSelector(
  notificationsSelector,
  notifications => RUST_SURVEY_2022_OPEN && !notifications.seenRustSurvey2022,
);

export const anyNotificationsToShowSelector = createSelector(
  showRustSurvey2022Selector,
  (...allNotifications) => allNotifications.some(n => n),
);

export const clippyRequestSelector = createSelector(
  codeSelector,
  releaseSelector,
  getAction,
  (code, release, action) => ({ code, release, action }),
);

export const formatRequestSelector = createSelector(
  codeSelector,
  releaseSelector,
  (code, release) => ({ code, release }),
);

const focus = (state: State) => state.output.meta.focus;
export const isOutputFocused = createSelector(
  focus,
  (focus) => !!focus,
);

const orientationConfig = (state: State) => state.configuration.orientation;
const browserWidthIsSmall = (state: State) => state.browser.isSmall;

export const orientation = createSelector(
  orientationConfig,
  browserWidthIsSmall,
  (orientation, widthIsSmall) => {
    if (orientation == Orientation.Automatic) {
      if (widthIsSmall) { return Orientation.Horizontal } else { return Orientation.Vertical }
    } else {
      return orientation;
    }
  }
)

const ratioGeneration = (state: State) => state.browser.ratioGeneration;

export const aceResizeKey = createSelector(
  focus,
  ratioGeneration,
  (focus, ratioGeneration): AceResizeKey => [focus, ratioGeneration],
)

const aceConfig = (s: State) => s.configuration.ace;
export const aceKeybinding = createSelector(aceConfig, c => c.keybinding);
export const acePairCharacters = createSelector(aceConfig, c => c.pairCharacters);
export const aceTheme = createSelector(aceConfig, c => c.theme);

export const offerCrateAutocompleteOnUse = createSelector(
  releaseSelector,
  (release) => release !== Release.Java21,
);

const websocket = (state: State) => state.websocket;

export const websocketFeatureFlagEnabled = createSelector(websocket, (ws) => ws.featureFlagEnabled);

export const useWebsocketSelector = createSelector(
  websocket,
  (ws) => ws.connected && ws.featureFlagEnabled,
);

export type WebSocketStatus =
  { state: 'disconnected' } |
  { state: 'connected' } |
  { state: 'error', error: string };

export const websocketStatusSelector = createSelector(
  websocket,
  (ws): WebSocketStatus => {
    if (ws.error) { return { state: 'error', error: ws.error }; }
    if (ws.connected) { return { state: 'connected' }; }
    return { state: 'disconnected' };
  }
);

export const executeRequestPayloadSelector = createSelector(
  codeSelector,
  (state: State) => state.configuration,
  (_state: State, { action }: { action: string }) => ({ action }),
  (code, configuration, { action }) => ({
    runtime: configuration.runtime,
    release: configuration.release,
    action,
    code,
    preview: configuration.preview == Preview.Enabled,
  }),
);
