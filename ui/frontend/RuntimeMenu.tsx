import React, { Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MenuGroup from './MenuGroup';
import SelectOne from './SelectOne';

import * as actions from './actions';
import * as selectors from './selectors';
import State from './state';
import { Runtime } from './types';

import styles from './RuntimeMenu.module.css';

interface RuntimeMenuProps {
  close: () => void;
}

const RuntimeMenu: React.FC<RuntimeMenuProps> = props => {
  const runtime = useSelector((state: State) => state.configuration.runtime);
  const latestVersion = useSelector(selectors.latestVersionText);
  const java20Version = useSelector(selectors.java20VersionText);

  const dispatch = useDispatch();
  const changeRuntime = useCallback((runtime: Runtime) => {
    dispatch(actions.changeRuntime(runtime));
    props.close();
  }, [dispatch, props]);

  return (
    <Fragment>
      <MenuGroup title="Choose the Java runtime">
        <SelectOne
          name="Latest"
          currentValue={runtime}
          thisValue={Runtime.Latest}
          changeValue={changeRuntime}
        >
          <Desc>Build using Java 19</Desc>
          <Desc>({latestVersion})</Desc>
        </SelectOne>
        <SelectOne
          name="Java 20"
          currentValue={runtime}
          thisValue={Runtime.Java20}
          changeValue={changeRuntime}
        >
          <Desc>Build using Java 20</Desc>
          <Desc>({java20Version})</Desc>

        </SelectOne>
      </MenuGroup>
    </Fragment>

  );
};

const Desc: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <p className={styles.description}>{children}</p>
);

export default RuntimeMenu;
