
import React from 'react';
import PropTypes from 'prop-types';
import isError from 'lodash/isError';
import {
  fetchAccessToken,
  storeAccessToken,
  setRestApi,
  setAuthClient,
  setStorageClient,
  setYoutrackSettings
} from '../utils'

export default class AdminSettings extends React.Component {

  static propTypes = {
    finishInstall: PropTypes.func.isRequired,
    installType: PropTypes.string.isRequired,
    settings: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
    settingsForm: PropTypes.func.isRequired,
    dpapp: PropTypes.object.isRequired
  };

  state = {
    oauthSettings: null,
    error: null,
    values: null
  };

  componentDidMount() {

    setRestApi(this.props.dpapp.restApi);
    setAuthClient(this.props.dpapp.oauth);
    setStorageClient(this.props.dpapp.storage);

    const { oauth, storage } = this.props.dpapp;

    let fetchPreviousValues;

    if (this.props.installType !== 'install') {
      fetchPreviousValues = storage.getAppStorage('youtrack_settings').then(data => ({ values:data }))
    } else {
      fetchPreviousValues = Promise.resolve({ values: null })
    }

    fetchPreviousValues
      .then(
        state => oauth.settings('youtrack', { grant: "implicit" })
          .then(
            oauthSettings => ({ ...state, oauthSettings, error: null } )
          )
          .catch(
            error => ({ ...state, oauthSettings: null, error: new Error(error) })
          )
      )
      .then(state => this.setState(state))
    ;
  }

  onSettings(settings) {
    const { finishInstall } = this.props;
    setYoutrackSettings({ ...settings });

    fetchAccessToken()
      .then(storeAccessToken)
      .then(() => finishInstall({ youtrack_settings: settings }).then(({ onStatus }) => onStatus()))
      .catch(error => {
        console.error('oauth2 error', error);
        return new Error(error);
      });
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

      if (this.state.values) {
        newValues = { ...newValues, ...this.state.values }
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
