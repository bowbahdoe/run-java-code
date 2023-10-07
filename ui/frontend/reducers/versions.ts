import { Action, ActionType } from '../actions';
import { Version } from '../types';

const DEFAULT: State = {
};

export interface State {
  latest?: Version;
  valhalla?: Version;
  earlyAccess?: Version;
}

export default function crates(state = DEFAULT, action: Action) {
  switch (action.type) {
    case ActionType.VersionsLoadSucceeded: {
      const { latest, valhalla, earlyAccess } = action;
      return { latest, valhalla, earlyAccess };
    }
    default:
      return state;
  }
}
