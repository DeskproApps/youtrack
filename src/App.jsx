
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router'
import every from 'lodash/every';
import { Loader } from '@deskpro/apps-components';
import PageCreate from './ui/PageCreate';
import PageHome from './ui/PageHome';
import PageLink from './ui/PageLink';
import PageSettings from './ui/PageSettings';
import PageError from './ui/PageError';
import PageAuthenticate from './ui/PageAuthenticate';
import { setYoutrackSettings, tryAndSetAuthToken, notEmpty, getDomainUrl, getProp } from './utils';
import { createMemoryHistory as createHistory } from "history";
import { fetchIssue, fetchProjects } from './api';
import * as actions from './redux/actions';

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
class App extends React.PureComponent
{
  /**
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {
    const { storage } = this.props.dpapp;

    storage.getAppStorage([
      'user_settings', 'youtrack_settings'
    ]).then(data => {

      if (!data || typeof data !== "object" || !data.youtrack_settings || !every(data.youtrack_settings, notEmpty)) {
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
    }).then(() => {
      this.initialiseRequests();
    });
  }

  initialiseRequests = () => {
    const { customFields } = this.props.dpapp.context.get('ticket');
    return customFields.getAppField('youtrackCards', [])
      .then(this.fetchData)
      .then(this.storeData)
      ;
  };

  fetchData = resp => {
    return Promise.all([fetchProjects(), ...resp.map(fetchIssue)]);
  };

  storeData = data => {
    const [projects, ...tail] = data;

    this.props.dispatch(actions.setProjects(getProp(projects, 'body', [])));
    this.props.dispatch(actions.setIssues(tail.map(issue => getProp(issue, 'body', {}))));
  };

  /**
   * Generic error handler
   *
   * @param {*} err
   * @returns {*}
   */
  handleError = err => {
    const { dpapp, history } = this.props;

    if (getProp(err, 'errorData.statusCode', null) === 401) {
      history.push("authenticate", null);
      history.go(1);
      return err;
    }

    dpapp.ui.showErrorNotification(err);
    return err;
  };

  renderPageAuthenticate = (props) => <PageAuthenticate {...props} youtrackSettings={youtrackSettings} dpapp={this.props.dpapp}/>;

  renderPageHome = (props) => <PageHome {...props} dpapp={this.props.dpapp}/>;

  renderPageCreate = (props) => <PageCreate {...props} dpapp={this.props.dpapp} domain={getDomainUrl()} handleError={this.handleError} />;

  renderPageLink = (props) => <PageLink {...props} dpapp={this.props.dpapp}/>;

  render() {
    return (
      <Router history={history} >
        <Switch>
          <Route path="settings" component={PageSettings} />
          <Route path="authenticate" component={this.renderPageAuthenticate} />
          <Route path="home" render={this.renderPageHome} />
          <Route path="link" render={this.renderPageLink} />
          <Route path="create" render={this.renderPageCreate} />
          <Route path="error" component={PageError} />
          <Route path="loading" render={() => <Loader />} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {

  /**
   * instance of app client.
   */
  dpapp: PropTypes.object,

};

export default connect()(App);
