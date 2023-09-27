import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import * as actions from './actions';
import * as selectors from './selectors';
import { useAppDispatch } from './configureStore';

import ButtonMenuItem from './ButtonMenuItem';
import MenuGroup from './MenuGroup';
import MenuAside from './MenuAside';

import styles from './BuildMenu.module.css';

interface BuildMenuProps {
  close: () => void;
}

const useDispatchAndClose = (action: () => actions.ThunkAction, close: () => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    () => {
      dispatch(action());
      close();
    },
    [action, close, dispatch]
  );
}

const BuildMenu: React.FC<BuildMenuProps> = props => {
  const isHirAvailable = useSelector(selectors.isHirAvailable);
  const isWasmAvailable = useSelector(selectors.isWasmAvailable);

  const compile = useDispatchAndClose(actions.performCompile, props.close);
  const compileToAssembly = useDispatchAndClose(actions.performCompileToAssembly, props.close);
  const compileToLLVM = useDispatchAndClose(actions.performCompileToLLVM, props.close);
  const compileToMir = useDispatchAndClose(actions.performCompileToMir, props.close);
  const compileToHir = useDispatchAndClose(actions.performCompileToNightlyHir, props.close);
  const compileToWasm = useDispatchAndClose(actions.performCompileToNightlyWasm, props.close);
  const execute = useDispatchAndClose(actions.performExecute, props.close);
  const test = useDispatchAndClose(actions.performTest, props.close);

  return (
    <MenuGroup title="Run Now">
      <ButtonMenuItem name="Run" onClick={execute}>
        Build and run the code, showing the output. 
        Equivalent to <code className={styles.code}>java Main.java</code>.
      </ButtonMenuItem>
      <ButtonMenuItem name="Build" onClick={compile}>
        Build the code without running it. 
        Equivalent to <code className={styles.code}>javac Main.java</code>.
      </ButtonMenuItem>
    </MenuGroup>
  );
};

const HirAside: React.FC = () => (
  <MenuAside>
    Note: HIR currently requires using the Nightly channel, selecting this
    option will switch to Nightly.
  </MenuAside>
);

const WasmAside: React.FC = () => (
  <MenuAside>
    Note: WASM currently requires using the Nightly channel, selecting this
    option will switch to Nightly.
  </MenuAside>
);

export default BuildMenu;
