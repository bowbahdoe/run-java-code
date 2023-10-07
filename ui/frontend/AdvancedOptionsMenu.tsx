import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from './actions';
import { Either as EitherConfig, Select as SelectConfig } from './ConfigElement';
import MenuGroup from './MenuGroup';
import { State } from './reducers';
import * as selectors from './selectors';
import {Release, Preview, Runtime} from './types';

const AdvancedOptionsMenu: React.FC = () => {
  const isReleaseDefault = useSelector(selectors.isReleaseDefault);
  const release = useSelector((state: State) => state.configuration.release);
  const runtime = useSelector((state: State) => state.configuration.runtime);
  const isPreviewSet = useSelector(selectors.getPreviewSet);
  const preview = useSelector((state: State) => state.configuration.preview);

  const dispatch = useDispatch();

  const changeRelease = useCallback((e: Release) => dispatch(actions.changeRelease(e)), [dispatch]);
  const changePreview = useCallback((b: Preview) => dispatch(actions.changePreview(b)), [dispatch]);

  return (
    <MenuGroup title="Advanced options">
      <SelectConfig
        name="Release"
        value={release}
        isNotDefault={!isReleaseDefault}
        onChange={changeRelease}
      >
        { runtime != Runtime.EarlyAccess ? null : <option value={Release.Java22}>22</option> }
        { runtime == Runtime.Valhalla ? null : <option value={Release.Java21}>21</option> }
        <option value={Release.Java20}>20</option>
        <option value={Release.Java19}>19</option>
        <option value={Release.Java18}>18</option>
        <option value={Release.Java17}>17</option>
        <option value={Release.Java16}>16</option>
        <option value={Release.Java15}>15</option>
        <option value={Release.Java14}>14</option>
        <option value={Release.Java13}>13</option>
        <option value={Release.Java12}>12</option>
        <option value={Release.Java11}>11</option>
        <option value={Release.Java10}>10</option>
        <option value={Release.Java9}>9</option>
        <option value={Release.Java8}>8</option>
      </SelectConfig>

      <EitherConfig
        id="preview"
        name="Preview"
        a={Preview.Disabled}
        b={Preview.Enabled}
        value={preview}
        isNotDefault={isPreviewSet}
        onChange={changePreview} />
    </MenuGroup>
  );
};

export default AdvancedOptionsMenu;
