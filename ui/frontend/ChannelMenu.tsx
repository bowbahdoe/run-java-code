import React, { Fragment, useCallback, version } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MenuGroup from './MenuGroup';
import SelectOne from './SelectOne';

import * as actions from './actions';
import * as selectors from './selectors';
import State from './state';
import { Version } from './types';

import styles from './ChannelMenu.module.css';

interface VersionMenuProps {
  close: () => void;
}

const ChannelMenu: React.FC<VersionMenuProps> = props => {
  const version = useSelector((state: State) => state.versions);
  const java17Version = useSelector(selectors.java17VersionText);
  const java18Version = useSelector(selectors.java18VersionText);
  const java19Version = useSelector(selectors.java19VersionText);
  const java20Version = useSelector(selectors.java20VersionText);
  const java21Version = useSelector(selectors.java21VersionText);
  const dispatch = useDispatch();
  const changeChannel = useCallback((version: Version) => {
    dispatch(actions.changeVersion(version));
    props.close();
  }, [dispatch, props]);

  return (
    <Fragment>
      <MenuGroup title="Channel &mdash; Choose the rust version">
        <SelectOne
          name="Stable channel"
          currentValue={version}
          thisValue={Version.Java17}
          changeValue={changeChannel}
        >
          <Desc>Currently using the Java17 Version: {java17Version}</Desc>
        </SelectOne>
        <SelectOne
          name="Stable channel"
          currentValue={version}
          thisValue={Version.Java18}
          changeValue={changeChannel}
        >
          <Desc>Currently using the Java18 Version: {java18Version}</Desc>
        </SelectOne>
        <SelectOne
          name="Stable channel"
          currentValue={version}
          thisValue={Version.Java19}
          changeValue={changeChannel}
        >
          <Desc>Currently using the Java19 Version: {java19Version}</Desc>
        </SelectOne>
        <SelectOne
          name="Stable channel"
          currentValue={version}
          thisValue={Version.Java20}
          changeValue={changeChannel}
        >
          <Desc>Currently using the Java20 Version: {java20Version}</Desc>
        </SelectOne>
        <SelectOne
          name="Stable channel"
          currentValue={version}
          thisValue={Version.Java21}
          changeValue={changeChannel}
        >
          <Desc>Currently using the Java21 Version: {java21Version}</Desc>
        </SelectOne>
      </MenuGroup>
    </Fragment>

  );
};

const Desc: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <p className={styles.description}>{children}</p>
);

export default ChannelMenu;
