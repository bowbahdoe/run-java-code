import { Action, ActionType } from '../actions';
import { Version } from '../types';

const DEFAULT: State = {
};

export interface State {
  java19?: Version;
  java20?: Version;
  rustfmt?: Version;
  clippy?: Version;
  miri?: Version;
}

export default function crates(state = DEFAULT, action: Action) {
  switch (action.type) {
    case ActionType.VersionsLoadSucceeded: {
      const { java19, java20, rustfmt, clippy, miri } = action;
      return { java19, java20, rustfmt, clippy, miri };
    }
    default:
      return state;
  }
}
