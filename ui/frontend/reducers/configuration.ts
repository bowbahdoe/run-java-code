import {Action, ActionType} from '../actions';
import {
  AssemblyFlavor,
  DemangleAssembly,
  Editor,
  Orientation,
  PairCharacters,
  Preview,
  PrimaryAction,
  PrimaryActionAuto,
  ProcessAssembly,
  Release,
  Runtime,
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
  runtime: Runtime;
  release: Release;
  preview: Preview;
}

const DEFAULT: State = {
  editor: Editor.Ace,
  ace: {
    keybinding: 'ace',
    theme: 'eclipse',
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
  runtime: Runtime.Latest,
  release: Release.Java25,
  preview: Preview.Disabled,
};

const maxRelease = (runtime: Runtime) => {
  if (runtime == Runtime.Valhalla) {
    return Release.Java23;
  }
  else if (runtime == Runtime.EarlyAccess) {
    return Release.Java26;
  }
  else {
    return Release.Java25;
  }
}

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
    case ActionType.ChangeAssemblyFlavor:
      return { ...state, assemblyFlavor: action.assemblyFlavor };
    case ActionType.ChangeDemangleAssembly:
      return { ...state, demangleAssembly: action.demangleAssembly };
    case ActionType.ChangeProcessAssembly:
      return { ...state, processAssembly: action.processAssembly };
    case ActionType.ChangePrimaryAction:
      return { ...state, primaryAction: action.primaryAction };
    case ActionType.ChangeRuntime: {
      return { ...state, runtime: action.runtime, release: maxRelease(action.runtime)  };
    }
    case ActionType.ChangeRelease: {

      return { ...state, release: action.release };
    }
    case ActionType.ChangePreview:
      return { ...state, preview: action.preview, release: maxRelease(state.runtime) };
    default:
      return state;
  }
}
