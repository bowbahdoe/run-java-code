import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import ButtonMenuItem from './ButtonMenuItem';
import MenuGroup from './MenuGroup';
import MenuAside from './MenuAside';

import * as selectors from './selectors';
import * as actions from './actions';
import { useAppDispatch } from './configureStore';
import { performFormat } from './reducers/output/format';

interface ToolsMenuProps {
  close: () => void;
}

const ToolsMenu: React.FC<ToolsMenuProps> = props => {
  const rustfmtVersionDetails = useSelector(selectors.rustfmtVersionDetailsText);
  const clippyVersionDetails = useSelector(selectors.clippyVersionDetailsText);
  const miriVersionDetails = useSelector(selectors.miriVersionDetailsText);

  const dispatch = useAppDispatch();
  const clippy = useCallback(() => {
    dispatch(actions.performClippy());
    props.close();
  }, [dispatch, props]);
  const miri = useCallback(() => {
    dispatch(actions.performMiri());
    props.close();
  }, [dispatch, props]);
  const format = useCallback(() => {
    dispatch(performFormat());
    props.close();
  }, [dispatch, props]);

  return (
    <MenuGroup title="Tools">
      <ButtonMenuItem
        name="Rustfmt"
        onClick={format}>
        <div>Format this code with Rustfmt.</div>
        <MenuAside> ({rustfmtVersionDetails})</MenuAside>
      </ButtonMenuItem>
      <ButtonMenuItem
        name="Clippy"
        onClick={clippy}>
        <div>Catch common mistakes and improve the code using the Clippy linter.</div>
        <MenuAside> ({clippyVersionDetails})</MenuAside>
      </ButtonMenuItem>
      <ButtonMenuItem
        name="Miri"
        onClick={miri}>
        <div>
          Execute this program in the Miri interpreter to detect certain
          cases of undefined behavior (like out-of-bounds memory access).
        </div>
        <MenuAside> ({miriVersionDetails})</MenuAside>
      </ButtonMenuItem>
    </MenuGroup>
  );
};

export default ToolsMenu;
