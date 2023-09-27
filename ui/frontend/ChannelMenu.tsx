import React, { Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MenuGroup from './MenuGroup';
import SelectOne from './SelectOne';

import * as actions from './actions';
import * as selectors from './selectors';
import State from './state';
import { Channel } from './types';

import styles from './ChannelMenu.module.css';

interface ChannelMenuProps {
  close: () => void;
}

const ChannelMenu: React.FC<ChannelMenuProps> = props => {
  const channel = useSelector((state: State) => state.configuration.channel);
  const stableVersion = useSelector(selectors.stableVersionText);
  const betaVersion = useSelector(selectors.betaVersionText);
  const nightlyVersion = useSelector(selectors.nightlyVersionText);
  const java19Version = useSelector(selectors.java19VersionText);
  const java20Version = useSelector(selectors.java20VersionText);
  const betaVersionDetails = useSelector(selectors.betaVersionDetailsText);
  const nightlyVersionDetails = useSelector(selectors.nightlyVersionDetailsText);

  const dispatch = useDispatch();
  const changeChannel = useCallback((channel: Channel) => {
    dispatch(actions.changeChannel(channel));
    props.close();
  }, [dispatch, props]);

  return (
    <Fragment>
      <MenuGroup title="Channel &mdash; Choose the Java version">
        <SelectOne
          name="Java 17"
          currentValue={channel}
          thisValue={Channel.Stable}
          changeValue={changeChannel}
        >
          <Desc>Build using Java 17: {stableVersion}</Desc>
        </SelectOne>
        <SelectOne
          name="Java 18"
          currentValue={channel}
          thisValue={Channel.Beta}
          changeValue={changeChannel}
        >
          <Desc>Build using Java 18: {betaVersion}</Desc>
          <Desc>({betaVersionDetails})</Desc>
        </SelectOne>
        <SelectOne
          name="Java 19"
          currentValue={channel}
          thisValue={Channel.Nightly}
          changeValue={changeChannel}
        >
          <Desc>Build using Java 19: {nightlyVersion}</Desc>
          <Desc>({nightlyVersionDetails})</Desc>
        </SelectOne>
        <SelectOne
          name="Java 20"
          currentValue={channel}
          thisValue={Channel.Java19}
          changeValue={changeChannel}
        >
          <Desc>Build using Java 20</Desc>
          <Desc>({java19Version})</Desc>
        </SelectOne>
        <SelectOne
          name="Java 21"
          currentValue={channel}
          thisValue={Channel.Java20}
          changeValue={changeChannel}
        >
          <Desc>Build using Java 21</Desc>
          <Desc>({java20Version})</Desc>

        </SelectOne>
      </MenuGroup>
    </Fragment>

  );
};

const Desc: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <p className={styles.description}>{children}</p>
);

export default ChannelMenu;
