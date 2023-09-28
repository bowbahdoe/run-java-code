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
  const java19Version = useSelector(selectors.java19VersionText);
  const java20Version = useSelector(selectors.java20VersionText);

  const dispatch = useDispatch();
  const changeChannel = useCallback((channel: Channel) => {
    dispatch(actions.changeChannel(channel));
    props.close();
  }, [dispatch, props]);

  return (
    <Fragment>
      <MenuGroup title="Choose the Java runtime">
        <SelectOne
          name="Java 19"
          currentValue={channel}
          thisValue={Channel.Java19}
          changeValue={changeChannel}
        >
          <Desc>Build using Java 19</Desc>
          <Desc>({java19Version})</Desc>
        </SelectOne>
        <SelectOne
          name="Java 20"
          currentValue={channel}
          thisValue={Channel.Java20}
          changeValue={changeChannel}
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

export default ChannelMenu;
