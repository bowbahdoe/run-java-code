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
  const compile = useDispatchAndClose(actions.performCompile, props.close);
  const execute = useDispatchAndClose(actions.performExecute, props.close);

  return (
    <MenuGroup title="Run Now">
      <ButtonMenuItem name="Run" onClick={execute}>
          Build and run the code, showing the output.
      </ButtonMenuItem>
      <ButtonMenuItem name="Build" onClick={compile}>
          Build the code without running it.
      </ButtonMenuItem>
    </MenuGroup>
  );
};

export default BuildMenu;
