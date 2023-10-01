import { Action, ActionType } from '../actions';
import {
  AssemblyFlavor,
  Backtrace,
  Version,
  DemangleAssembly,
  Edition,
  Editor,
  Mode,
  Orientation,
  PairCharacters,
  Preview,
  PrimaryAction,
  PrimaryActionAuto,
  ProcessAssembly,
} from '../types';

export interface State {
  editor: Editor;
  ace: {
    keybinding: string;
    theme: string;
    pairCharacters: PairCharacters;
  };
  monaco: {
    theme: string;
  };
  orientation: Orientation;
  assemblyFlavor: AssemblyFlavor;
  demangleAssembly: DemangleAssembly;
  processAssembly: ProcessAssembly;
  primaryAction: PrimaryAction;
  version: Version;
  mode: Mode;
  edition: Edition;
  backtrace: Backtrace;
  preview: Preview;
}

const DEFAULT: State = {
  editor: Editor.Ace,
  ace: {
    keybinding: 'ace',
    theme: 'github',
    pairCharacters: PairCharacters.Enabled,
  },
  monaco: {
    theme: 'vscode-dark-plus',
  },
  orientation: Orientation.Automatic,
  assemblyFlavor: AssemblyFlavor.Att,
  demangleAssembly: DemangleAssembly.Demangle,
  processAssembly: ProcessAssembly.Filter,
  primaryAction: PrimaryActionAuto.Auto,
  version: Version.Java21,
  mode: Mode.Debug,
  edition: Edition.JavaStandardEdition,
  backtrace: Backtrace.Disabled,
  preview: Preview.Disabled,
};

export default function configuration(state = DEFAULT, action: Action): State {
  switch (action.type) {
    case ActionType.ChangeEditor:
      return { ...state, editor: action.editor };
    case ActionType.ChangeKeybinding: {
      const { ace } = state;

      return { ...state, ace: { ...ace, keybinding: action.keybinding } };
    }
    case ActionType.ChangeAceTheme: {
      const { ace } = state;
      return { ...state, ace: { ...ace, theme: action.theme } };
    }
    case ActionType.ChangePairCharacters: {
      const { ace } = state;
      return { ...state, ace: { ...ace, pairCharacters: action.pairCharacters } };
    }
    case ActionType.ChangeMonacoTheme: {
      const { monaco } = state;
      return { ...state, monaco: { ...monaco, theme: action.theme } };
    }
    case ActionType.ChangeOrientation:
      return { ...state, orientation: action.orientation };
    case ActionType.ChangeMode:
      return { ...state, mode: action.mode };
    case ActionType.ChangeEdition: {
      return { ...state, edition: action.edition };
    }
    case ActionType.ChangeBacktrace:
      return { ...state, backtrace: action.backtrace };
    case ActionType.ChangePreview:
      return { ...state, preview: action.preview };
    default:
      return state;
  }
}
