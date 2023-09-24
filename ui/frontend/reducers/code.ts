import { Action, ActionType } from '../actions';
import { performFormat } from './output/format';
import { performGistLoad } from './output/gist';

const DEFAULT: State = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`;

export type State = string;

export default function code(state = DEFAULT, action: Action): State {
  switch (action.type) {
    case ActionType.EditCode:
      return action.code;

    case ActionType.AddMainFunction:
      return `${state}\n\n${DEFAULT}`;

    case ActionType.AddImport:
      return `${action.code}\n${state}`;


    case ActionType.EnableFeatureGate:
      // Feature gates are not applicable in Java, keeping it unchanged
      return state;

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
