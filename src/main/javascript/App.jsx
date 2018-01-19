
import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from '@deskpro/apps-sdk-react';
import every from 'lodash/every';
import { Loader } from '@deskpro/react-components';
import { setRestApi, setAuthToken, notEmpty } from './utils';
import PageHome from './ui/PageHome';
import PageSettings from './ui/PageSettings';
import PageError from './ui/PageError';

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
  }

  /**
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {
    const { oauth, route, settings, context, ui, route, dpapp } = this.props;
    const { storage } = this.props.dpapp;


    storage.getAppStorage([
      'youtrackClientId', 'youtrackClientSecret', 'youtrackHubUrl', 'youtrackServiceId', 'urlRedirect'
		]).then(data => {

      if (!every(data, notEmpty)) {
				return route.to('settings')
			}

		  return storage.getAppStorage(['user_settings']).then(({user_settings: settings}) => {
				if (settings && settings.access_token) {
					setAuthToken(settings.access_token);
					return route.to('home');
				}

				oauth.access('youtrack').then(resp => {
					if (resp && resp.access_token) {
						setAuthToken(resp.access_token);
						return storage.setAppStorage('user_settings', {access_token: resp.access_token});
					}
				}).then(route.to('home'));
      });
		}).catch(ui.error)
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
  /**
   * Instance of sdk storage.
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
