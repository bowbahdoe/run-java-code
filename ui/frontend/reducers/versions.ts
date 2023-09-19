import { Action, ActionType } from '../actions';
import { Version } from '../types';

const DEFAULT: State = {
};

export interface State {
  java17?: Version;
  java18?: Version;
  java19?: Version;
  java20?: Version;
}

export default function crates(state = DEFAULT, action: Action) {
  switch (action.type) {
    case ActionType.VersionsLoadSucceeded: {
      const { java17, java18, java19, java20 } = action;
      return { java17, java18, java19, java20 };
    }
    default:
      return state;
  }
}
