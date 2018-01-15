
import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from '@deskpro/apps-sdk-react';
import { isUndefined } from 'lodash/isUndefined';
import { some } from 'lodash/some';
import { setRestApi } from './utils';
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
    const { route, context, ui } = this.props;

    const clientId = context.customFields.getAppField('youtrackClientId');
    const hubUrl = context.customFields.getAppField('youtrackHubUrl');
    const urlRedir = context.customFields.getAppField('urlRedirect');

    // Promise.all([clientId, hubUrl, urlRedir]).then(data => {
    //   console.log(data);
    //   console.log(some(data, isUndefined));
    //   if (some(data, isUndefined)) {
    //     return route.to('settings');
    //   }
    // }).catch(ui.error);

    // The app setting will be empty the first time the app is run.
    // Route to the settings page on the first run so the admin can setup
    // oauth creds.
    // if (!storage.app.settings) {
    //   return route.to('settings');
    // }

    // // The user does not have an oauth access token yet. Send them to the
    // // authentication page.
    // if (!storage.app.user_settings) {
    //   return route.to('auth');
    // }
    // customFields.getAppField('youtrackCards').then(resp => {
    //   console.log("YOUTRACK CARDS", resp);
    // }).catch(this.props.ui.error);
  }

  render() {
    return (
      <Routes>
        <Route location={'settings'} component={PageSettings} />
        <Route defaultRoute>
          <PageHome />
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
   * Instance of sdk oauth.
   * @see https://deskpro.gitbooks.io/deskpro-apps/content/api/props/oauth.html
   */
  oauth: PropTypes.object,

  /**
   * Instance of sdk route.
   * @see https://deskpro.gitbooks.io/deskpro-apps/content/api/props/route.html
   */
  route: PropTypes.object,

  context: PropTypes.object,

  ui: PropTypes.object
};
