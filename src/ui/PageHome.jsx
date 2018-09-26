import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Panel, Tabs, TabMenu } from '@deskpro/apps-components';

import { getProp, getDomainUrl } from '../utils';
import { fetchIssue, fetchProjects, createIssue } from '../api';
import TabIssues from './TabIssues';
import TabCreateIssues from './TabCreateIssue';

const customFieldID = 'youtrackCards';

/**
 * Renders a page which displays the issues which have been linked to the
 * open ticket.
 */
class PageHome extends React.Component {

  state = {
    issues: [],
    projects: [],
    activeTab: 'issues',
    fetchData: true
  };

  componentDidMount() {
    this.initialiseRequests();
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

    return this.setState({
      projects: getProp(projects, 'body', []),
      issues: tail.map(issue => getProp(issue, 'body', {})),
      fetchData: false
    });
  };

  handleTabChange = activeTab => this.setState({ activeTab });

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

  setStateCallback = data => this.setState({
    activeTab: getProp(data, 'tab', 'issues'),
    fetchData: getProp(data, 'fetchData', false)
  }, () => {
    if (getProp(data, 'fetchData', false)) {
      this.initialiseRequests().catch(this.handleError);
    }
  });

  unlinkCallback = data => this.setState({
    activeTab: getProp(data, 'tab', 'issues'),
    fetchData: getProp(data, 'fetchData', false)
  }, () => {
    const { customFields } = this.props.dpapp.context.get('ticket');
    if (getProp(data, 'fetchData', false)) {

      return customFields.getAppField(customFieldID, [])
        .then(resp => {
          return customFields.setAppField(customFieldID, resp.filter(i => i.toLowerCase() !== data.issue.toLowerCase()))
        })
        .then(this.initialiseRequests)
        .catch(this.handleError);
    }
  });

  createIssueRequest = data => {
    const { customFields } = this.props.dpapp.context.get('ticket');

    const issue = getProp(data, 'issue', '');

    if (issue.search !== '') {
      if (issue.search.indexOf('http') === 0) {
        const found = issue.search.match(/\/youtrack\/issue\/(.*)/);
        if (found) {
          return customFields.getAppField(customFieldID, [])
            .then((issues) => {
              return customFields.setAppField(customFieldID, [...issues, found[1]])
                .then(() => this.setStateCallback(data))
                .catch(console.log);
            });
        }
      } else {
        return customFields.getAppField(customFieldID, [])
          .then((issues) => {
            return customFields.setAppField(customFieldID, [...issues, issue.search])
              .then(() => this.setStateCallback(data))
              .catch(console.log);
          });
      }
    }

    return createIssue(issue)
      .then((resp) => {
        return customFields.getAppField(customFieldID, [])
          .then((issues) => {
            const issueId = resp.headers.location.split('/').pop();

            return customFields.setAppField(customFieldID, [...issues, issueId])
              .then(() => this.setStateCallback(data))
              .catch(console.log);
          });
      });
  };

  createIssueCallback = data => {
    this.createIssueRequest(data).catch(this.handleError);
  };

  /**
   * @returns {XML}
   */
  render() {
    const { fetchData } = this.state;

    if (fetchData) {
      return <Loader />;
    }

    const { issues, projects, activeTab } = this.state;

    return [
      <Tabs active={activeTab} onChange={this.handleTabChange} className={"dp-spacer"}>
        <TabMenu name="issues">Issues</TabMenu>
        <TabMenu name="create">Link Issue</TabMenu>
      </Tabs>,
      <TabIssues
        hidden=         {activeTab !== 'issues'}
        issues=         {issues}
        domain=         {getDomainUrl()}
        unlinkCallback= {this.unlinkCallback}
        callback=       {this.handleTabChange}
      />,
      <TabCreateIssues
        domain=   {getDomainUrl()}
        hidden=   {activeTab !== 'create'}
        projects= {projects}
        callback= {this.createIssueCallback}
      />
    ];
  }
}

PageHome.propTypes = {

  location: PropTypes.object.isRequired,

  history: PropTypes.object.isRequired,

  /**
   * Instance of dpapp.
   */
  dpapp: PropTypes.object
};

export default PageHome;
