import React from 'react';

import { createBrowserHistory as createHistory, Path, Location } from 'history';
import { createRouter, PlainOrThunk } from './uss-router';
import UssRouter from './uss-router/Router';

import qs from 'qs';
import Route from 'route-parser';

import * as actions from './actions';
import State from './state';
import { Channel, Edition, Mode, Page, JavaVersion } from './types';

const homeRoute = new Route('/');
const helpRoute = new Route('/help');

interface Substate {
  page: Page;
  configuration: {
    channel: Channel;
    mode: Mode;
    edition: Edition;
    java_version: JavaVersion;
  };
  output: {
    gist: {
      id?: string;
    }
  }
}

const stateSelector = ({ page, configuration: { channel, mode, edition, java_version}, output }: State): Substate => ({
  page,
  configuration: {
    channel,
    mode,
    edition,
    java_version,
  },
  output: {
    gist: {
      id: output.gist.id,
    },
  },
});

const stateToLocation = ({ page, configuration, output }: Substate): Partial<Path> => {
  switch (page) {
    case 'help': {
      return {
        pathname: '/help',
      };
    }

    default: {
      const query = {
        mode: configuration.mode,
        edition: configuration.edition,
        java_version: configuration.java_version,
        gist: output.gist.id,
      };
      return {
        pathname: `/?${qs.stringify(query)}`,
      };
    }
  }
};

const locationToAction = (location: Location): PlainOrThunk<State, actions.Action> | null => {
  const matchedHelp = helpRoute.match(location.pathname);

  if (matchedHelp) {
    return actions.helpPageLoad();
  }

  const matched = homeRoute.match(location.pathname);

  if (matched) {
    return actions.indexPageLoad(qs.parse(location.search.slice(1)));
  }

  return null;
};

export default class Router extends React.Component<RouterProps> {
  private router: any;

  public constructor(props: RouterProps) {
    super(props);

    const history = createHistory();

    const { store, reducer } = props;

    this.router = createRouter({
      store, reducer,
      history, stateSelector, locationToAction, stateToLocation,
    });
  }

  public render() {
    return <UssRouter router={this.router}>{this.props.children}</UssRouter>;
  }
}

interface RouterProps {
  children: React.ReactNode;
  store: any;
  reducer: any;
}
