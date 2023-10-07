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
  const earlyAccessVersion = useSelector(selectors.earlyAccessVersionText);
  const valhallaVersion = useSelector(selectors.valhallaVersionText);

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
          <Desc>Build using the latest version</Desc>
          <Desc>({latestVersion})</Desc>
        </SelectOne>
        <SelectOne
          name="Early Access"
          currentValue={runtime}
          thisValue={Runtime.EarlyAccess}
          changeValue={changeRuntime}
        >
          <Desc>Build using an early access build</Desc>
          <Desc>({earlyAccessVersion})</Desc>
        </SelectOne>
        <SelectOne
          name="Valhalla"
          currentValue={runtime}
          thisValue={Runtime.Valhalla}
          changeValue={changeRuntime}
        >
          <Desc>Build using an early access Valhalla prototype</Desc>
          <Desc>({valhallaVersion})</Desc>
        </SelectOne>
      </MenuGroup>
    </Fragment>

  );
};

const Desc: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <p className={styles.description}>{children}</p>
);

export default RuntimeMenu;
