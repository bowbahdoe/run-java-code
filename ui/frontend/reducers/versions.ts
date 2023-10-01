import { Action, ActionType } from '../actions';
import { Version } from '../types';

const DEFAULT: State = {
};

export interface State {
  latest?: Version;
  valhalla?: Version;
}

export default function crates(state = DEFAULT, action: Action) {
  switch (action.type) {
    case ActionType.VersionsLoadSucceeded: {
      const { latest, valhalla } = action;
      return { latest, valhalla };
    }
    default:
      return state;
  }
}
