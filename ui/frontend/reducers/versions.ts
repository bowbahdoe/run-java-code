import { Action, ActionType } from '../actions';
import { Version } from '../types';

const DEFAULT: State = {
};

export interface State {
  latest?: Version;
  valhalla?: Version;
  rustfmt?: Version;
  clippy?: Version;
  miri?: Version;
}

export default function crates(state = DEFAULT, action: Action) {
  switch (action.type) {
    case ActionType.VersionsLoadSucceeded: {
      const { latest, valhalla, rustfmt, clippy, miri } = action;
      return { latest, valhalla, rustfmt, clippy, miri };
    }
    default:
      return state;
  }
}
