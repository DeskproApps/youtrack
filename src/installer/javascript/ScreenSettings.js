
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isError from 'lodash/isError';

export default class ScreenSettings extends React.Component {

  static propTypes = {
    finishInstall: PropTypes.func.isRequired,
    installType: PropTypes.string.isRequired,
    settings: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
    settingsForm: PropTypes.func.isRequired,
    dpapp: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      oauthSettings: null,
      error: null
    };
  }

  componentDidMount() {
    const { oauth } = this.props.dpapp;

    oauth.settings('youtrack')
      .then( oauthSettings => this.setState({ oauthSettings, error: null }) )
      .catch( error => this.setState({ oauthSettings: null, error: new Error(error) }) )
    ;
  }

  onSettings(settings) {
    const { oauth } = this.props.dpapp;
    const { finishInstall } = this.props;
    const providerName = 'youtrack';

    // retrieve the oauth proxy settings for jira
    oauth.settings(providerName)
      .then(oauthSettings => {

        const connectionProps = {
          providerName,
          urlRedirect: oauthSettings.urlRedirect,
          urlAuthorize: `${settings.youtrackHubUrl}/api/rest/oauth2/auth`,
          urlAccessToken: `${settings.youtrackHubUrl}/api/rest/oauth2/token`,
          clientId: `${settings.youtrackClientId}`,
          clientSecret: `${settings.youtrackClientSecret}`,
          scopes: [
            `${settings.youtrackServiceId}`
          ]
        };
        return oauth.register(providerName, connectionProps).then(() => connectionProps);
      })
      .then(connectionProps => {
        // testing the oauth settings
        return oauth.access(providerName)
          .then((token) => { return connectionProps; })
           .catch(error => Promise.reject('oauth2 error'))
          ;
      })
      .then(() => finishInstall(settings).then(({ onStatus }) => onStatus()))
      .catch(error => {
        // auth error
        return new Error(error);
      }); // TODO display errors
  }

  render() {
    const { settings, values, finishInstall, settingsForm: SettingsForm } = this.props;
    const redirectUrl = this.state.oauthSettings ? this.state.oauthSettings.urlRedirect : null;
    const errorFree = !isError(this.state.error);

    if (settings.length) {
      let newSettings = [...settings];
      let newValues = { ...values, urlRedirect: errorFree ? 'Loading...' : 'Not Available' };

      if (redirectUrl && errorFree) {
        newValues.urlRedirect = redirectUrl;
        newSettings = newSettings.map(el => (el.name === 'urlRedirect' ? { ...el, defaultValue: redirectUrl } : el));
      }

      let formRef;
      return (
        <div className={'settings'}>
          <SettingsForm
            settings={newSettings}
            values={newValues}
            ref={ref => formRef = ref}
            onSubmit={this.onSettings.bind(this)}
          />
          <button className={'btn-action'} onClick={() => formRef.submit()}>Update Settings</button>
        </div>
      );
    }

    finishInstall(null)
      .then(({ onStatus }) => onStatus())
      .catch(error => new Error(error));
    return null;
  }
}
