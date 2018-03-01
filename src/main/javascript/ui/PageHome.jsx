import React from 'react';
import PropTypes from 'prop-types';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Loader, Tabs, TabLink, Container } from '@deskpro/react-components';
import partial from 'lodash/partial';
import { getProp, fetchAccessToken, storeAccessToken, setAuthToken, getDomainUrl } from '../utils';
import { fetchIssue, fetchIssues, fetchProjects, createIssue, deleteIssue } from '../api';
import TabIssues from './TabIssues';
import TabCreateIssues from './TabCreateIssue';

const customFieldID = 'youtrackCards';

/**
 * Renders a page which displays the issues which have been linked to the
 * open ticket.
 */
class PageHome extends React.PureComponent {

  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      projects: [],
      activeTab: 'issues',
      fetchData: true
    };
  }

  componentDidMount() {
    this.initialiseRequests();
  }

  initialiseRequests = () => {
    const { context, ui, dpapp } = this.props;

    return context.customFields.getAppField('youtrackCards', [])
      .then(this.fetchData)
      .then(this.storeData)
      .catch(err => {
        if (getProp(err, 'errorData.statusCode', null) === 401) {
          return fetchAccessToken()
            .then(partial(storeAccessToken, dpapp.storage))
            .then(() => context.customFields.getAppField('youtrackCards', []))
            .then(this.fetchData)
            .then(this.storeData)
            .catch(console.error);
        }
      });
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

  setStateCallback = data => this.setState({
    activeTab: getProp(data, 'tab', 'issues'),
    fetchData: getProp(data, 'fetchData', false)
  }, () => {
    if (getProp(data, 'fetchData', false)) {
      this.initialiseRequests();
    }
  });

  unlinkCallback = data => this.setState({
    activeTab: getProp(data, 'tab', 'issues'),
    fetchData: getProp(data, 'fetchData', false)
  }, () => {
    const { context, ui } = this.props;
    if (getProp(data, 'fetchData', false)) {
      return context.customFields.getAppField(customFieldID, [])
        .then(resp => context.customFields.setAppField(customFieldID, resp.filter(i => i !== data.issue)))
        .then(this.initialiseRequests)
        .catch(ui.error);
    }
  });

  createIssueRequest = data => {
    const { customFields } = this.props.context;

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
    const { context, ui, dpapp } = this.props;

    return dpapp.storage.getAppStorage(['user_settings'])
      .then(({user_settings: settings}) => {
        if (getProp(settings, 'access_token', null)) {
          setAuthToken(settings.access_token);
          return this.createIssueRequest(data);
        }
        return Promise.reject(new Error('MISSING TOKEN'));
      })
      .catch(err => {
        if (getProp(err, 'errorData.statusCode', null) === 401 || getProp(err, 'message', null) === 'MISSING TOKEN') {
          return fetchAccessToken()
            .then(partial(storeAccessToken, dpapp.storage))
            .then(() => this.createIssueRequest(data));
        }
      });
  };

  /**
   * @returns {XML}
   */
  render() {
    const { issues, projects, activeTab, fetchData } = this.state;

    return (
      <Container className="dp-youtrack-container" style={{ padding: 0 }}>
        {
          fetchData ?
            <div className="dp-text-center">
              <Loader />
            </div> :
            <div>
              <Tabs active={activeTab} onChange={this.handleTabChange}>
                <TabLink name="issues">Issues</TabLink>
                <TabLink name="create">Link Issue</TabLink>
              </Tabs>
              <TabIssues
                hidden={activeTab !== 'issues'}
                issues={issues}
                domain={getDomainUrl()}
                unlinkCallback={this.unlinkCallback}
                callback={this.handleTabChange}
              />
              <TabCreateIssues
                hidden={activeTab !== 'create'}
                projects={projects}
                callback={this.createIssueCallback}
              />
            </div>
        }
      </Container>
    );
  }
}

PageHome.propTypes = {
  /**
   * Instance of sdk ui.
   */
  ui: PropTypes.object.isRequired,
  /**
   * Instance of  context.
   */
  context: PropTypes.object
};

export default sdkConnect(PageHome);
