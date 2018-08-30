
import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router'
import every from 'lodash/every';
import { Loader } from '@deskpro/apps-components';
import PageHome from './ui/PageHome';
import PageSettings from './ui/PageSettings';
import PageError from './ui/PageError';
import PageAuthenticate from './ui/PageAuthenticate';
import { setYoutrackSettings, tryAndSetAuthToken, notEmpty } from './utils';
import { createMemoryHistory as createHistory } from "history";

const history = createHistory({
  initialEntries: ["loading"],
  initialIndex: 0
});

let youtrackSettings = {
  youtrackServiceId:  null,
  youtrackHubUrl:     null
};

/**
 * Renders a Youtrack Deskpro app.
 */
export default class App extends React.PureComponent
{
  /**
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {
    const { storage } = this.props.dpapp;

    storage.getAppStorage([
      'user_settings', 'youtrack_settings'
    ]).then(data => {

      if (!every(data, notEmpty)) {
        history.push("settings", null);
        history.go(1);
        return;
      }

      let url = document.createElement('a');
      url.href = data.youtrack_settings.youtrackHubUrl;
      const youtrackHostUrl = `${url.protocol}//${url.hostname}`;
      setYoutrackSettings({ //TODO AG: REFACTOR INTO REDUX STORE!!!!!
        youtrackServiceId:  data.youtrack_settings.youtrackServiceId,
        youtrackHubUrl:     data.youtrack_settings.youtrackHubUrl,
        youtrackHostUrl
      });

      if (tryAndSetAuthToken(data.user_settings)) {
        history.push("home");
      } else {
        history.push('authenticate');
      }
      history.go(1);

    }).catch(error => {
      console.error(error);
      history.push("settings", {
        error: {
          type: 'Authentication Error',
          message: 'An error occurred trying to authenticate the app. Please check your settings and try again.'
        }
      });
    });
  }

  renderPageAuthenticate = (props) => <PageAuthenticate {...props} youtrackSettings={youtrackSettings} dpapp={this.props.dpapp}/>;

  renderPageHome = (props) => <PageHome {...props} dpapp={this.props.dpapp}/>;

  render() {
    return (
      <Router history={history} >
        <Switch>
          <Route path="settings" component={PageSettings} />
          <Route path="authenticate" component={this.renderPageAuthenticate} />
          <Route path="home" render={this.renderPageHome} />
          <Route path="error" component={PageError} />
          <Route path={"loading"} render={() => <Loader />} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {

  settings: PropTypes.object,

  oauth: PropTypes.object,
  /**
   * instance of sdk storage.
   * @see https://deskpro.gitbooks.io/deskpro-apps/content/api/props/storage.html
   */
  dpapp: PropTypes.object,

  /**
   * instance of sdk route.
   * @see https://deskpro.gitbooks.io/deskpro-apps/content/api/props/route.html
   */
  route: PropTypes.object,

  /**
   * instance of core-sdk context.
   * @see https://deskpro.gitbooks.io/deskpro-apps/content/api/props/route.html
   */
  context: PropTypes.object,

  /**
   * instance of sdk ui.
   */
  ui: PropTypes.object
};
