
import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from '@deskpro/apps-sdk-react';
import every from 'lodash/every';
import partial from 'lodash/partial';
import { Loader } from '@deskpro/react-components';
import PageHome from './ui/PageHome';
import PageSettings from './ui/PageSettings';
import PageError from './ui/PageError';
import {
  setRestApi, setDomainUrl, setAuthToken, setAuthClient, fetchAccessToken, notEmpty, storeAccessToken
} from './utils';

/**
 * Renders a Youtrack Deskpro app.
 */
export default class App extends React.PureComponent {

  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    setRestApi(this.props.dpapp.restApi);
    setAuthClient(this.props.oauth);
  }

  /**
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {
    const { oauth, settings, context, ui, route, dpapp } = this.props;
    const { storage } = this.props.dpapp;

    storage.getAppStorage([
      'youtrackClientId', 'youtrackClientSecret', 'youtrackHubUrl', 'youtrackServiceId', 'urlRedirect'
    ]).then(data => {

      if (!every(data, notEmpty)) {
        return route.to('settings');
      }

      let url = document.createElement('a');
      url.href = data.youtrackHubUrl;
      setDomainUrl(`${url.protocol}//${url.hostname}`); //TODO AG: REFACTOR INTO REDUX STORE!!!!!

      return storage.getAppStorage(['user_settings']).then(({user_settings: settings}) => {
        if (settings && settings.access_token) {
          setAuthToken(settings.access_token);
          return route.to('home');
        }

        return fetchAccessToken()
          .then(partial(storeAccessToken, storage))
          .then(route.to('home'));
      });
    }).catch(error => {
      route.to('error', {
        error: {
          type: 'Authentication Error',
          message: 'An error occurred trying to authenticate the app. Please check your settings and try again.'
        }
      });
    });
  }

  render() {
    return (
      <Routes>
        <Route location={'settings'} component={PageSettings} />
        <Route location={'home'} component={PageHome} />
        <Route location={'error'} component={PageError} />
        <Route defaultRoute>
          <div className="dp-text-center">
            <Loader />
          </div>
        </Route>
      </Routes>
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
