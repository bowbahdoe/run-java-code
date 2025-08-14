import { Action, ActionType } from '../actions';
import { performGistLoad } from './output/gist'
import { performFormat } from './output/format'

const DEFAULT: State = `void main() {
    IO.println("Hello, world!");
}`;

export type State = string;

export default function code(state = DEFAULT, action: Action): State {
  switch (action.type) {
    case ActionType.EditCode:
      return action.code;

    case ActionType.AddMainFunction:
      return `${state}\n\n${DEFAULT}`;

    case ActionType.AddImport:
      return action.code + state;

    case ActionType.EnableFeatureGate:
      return `#![feature(${action.featureGate})]\n${state}`;

    default: {
      if (performGistLoad.pending.match(action)) {
        return '';
      } else if (performGistLoad.fulfilled.match(action)) {
        return action.payload.code;
      } else if (performFormat.fulfilled.match(action)) {
        return action.payload.code;
      } else {
        return state;
      }
    }
  }
}
