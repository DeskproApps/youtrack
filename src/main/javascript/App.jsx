
import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from '@deskpro/apps-sdk-react';
import every from 'lodash/every';
import { Loader } from '@deskpro/react-components';
import { setRestApi, setAuthToken, notEmpty } from './utils';
import PageHome from './ui/PageHome';
import PageSettings from './ui/PageSettings';

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
    const { oauth, context, ui, route } = this.props;
    const { storage } = this.props.dpapp;

    storage.getAppStorage(['user_settings', 'youtrackHubUrl']).then(({user_settings: settings, youtrackHubUrl }) => {
      if (settings && settings.access_token) {
        setAuthToken(settings.access_token);
        route.to('home');
        return;
      }

      oauth.access('youtrack')
        .then((resp) => {
          if (resp && resp.access_token) {
            setAuthToken(resp.access_token);
            return storage.setAppStorage('user_settings', {access_token: resp.access_token });
          }
        })
        .then(() =>{
          route.to('home');
        })
      ;

    });

    // Promise.all([clientId, hubUrl, urlRedir]).then(data => (
    //   route.to(every(data, notEmpty) ? 'home' : 'settings')
    // )).catch(ui.error);
  }

  render() {
    return (
      <Routes>
        <Route location={'settings'} component={PageSettings} />
        <Route location={'home'} component={PageHome} />
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
