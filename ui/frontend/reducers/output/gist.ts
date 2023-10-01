import { Draft, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { jsonGet, jsonPost, routes } from '../../actions';
import { baseUrlSelector, codeSelector } from '../../selectors';
import RootState from '../../state';
import { Preview, Release, Runtime } from '../../types';
import { RequestsInProgress } from './sharedStateManagement';

const sliceName = 'output/gist';

const initialState: State = {
  requestsInProgress: 0,
};

interface State extends RequestsInProgress {
  id?: string;
  url?: string;
  code?: string;
  stdout?: string;
  stderr?: string;
  runtime?: Runtime;
  release?: Release;
  preview?: Preview;
}

interface SuccessProps {
  id: string;
  url: string;
  code: string;
  stdout: string;
  stderr: string;
  runtime: Runtime;
  release: Release;
  preview: Preview;
}

type PerformGistLoadProps = Pick<
  SuccessProps,
  Exclude<keyof SuccessProps, 'url' | 'code' | 'stdout' | 'stderr'>
>;

interface GistResponseBody {
  id: string;
  url: string;
  code: string;
}

export const performGistLoad = createAsyncThunk<
  SuccessProps,
  PerformGistLoadProps,
  { state: RootState }
>(`${sliceName}/load`, async ({ id, runtime, release }, { getState }) => {
  const state = getState();
  const baseUrl = baseUrlSelector(state);
  const gistUrl = new URL(routes.meta.gistLoad, baseUrl);
  const u = new URL(id, gistUrl);

  const gist = await jsonGet(u);
  return { runtime: runtime, release: release, ...gist };
});

export const performGistSave = createAsyncThunk<SuccessProps, void, { state: RootState }>(
  `${sliceName}/save`,
  async (_arg, { getState }) => {
    const state = getState();
    const code = codeSelector(state);
    const {
      configuration: { runtime, release, preview },
      output: {
        execute: { stdout = '', stderr = '' },
      },
    } = state;

    const json = await jsonPost<GistResponseBody>(routes.meta.gistSave, { code });
    return { ...json, code, stdout, stderr, runtime, release, preview };
  },
);

const pending = (state: Draft<State>) => {
  state.requestsInProgress += 1;
};

const fulfilled = (state: Draft<State>, action: PayloadAction<SuccessProps>) => {
  state.requestsInProgress -= 1;
  Object.assign(state, action.payload);
};

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(performGistLoad.pending, pending)
      .addCase(performGistLoad.fulfilled, fulfilled)
      .addCase(performGistSave.pending, pending)
      .addCase(performGistSave.fulfilled, fulfilled);
  },
});

export default slice.reducer;
