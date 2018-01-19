
import React from 'react';
import PropTypes from 'prop-types';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Loader, Tabs, TabLink, Container } from '@deskpro/react-components';
import { getProp } from '../utils';
import { fetchIssue, fetchProjects, deleteIssue } from '../api';
import TabIssues from './TabIssues';
import TabCreateIssues from './TabCreateIssue';

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
    this.fetchData();
  }

  fetchData = () => {
    const { context, ui } = this.props;

    return context.customFields.getAppField('youtrackCards', []).then(resp => {
      return Promise.all([fetchProjects(), ...resp.map(fetchIssue)]).then(data => {
        const [head, ...tail] = data;

        return this.setState({
          projects: getProp(head, 'body', []),
          issues: tail.map(issue => getProp(issue, 'body', {})),
          fetchData: false
        });
      });
    }).catch(ui.error);
  };

  handleTabChange = activeTab => this.setState({ activeTab });

  callback = data => this.setState({
    activeTab: getProp(data, 'tab', 'issues'),
    fetchData: getProp(data, 'fetchData', false)
  }, () => {
    if (getProp(data, 'fetchData', false)) {
      this.fetchData();
    }
  });

  unlinkCallback = data => this.setState({
    activeTab: getProp(data, 'tab', 'issues'),
    fetchData: getProp(data, 'fetchData', false)
  }, () => {
    const { context, ui } = this.props;
    if (getProp(data, 'fetchData', false)) {
      return context.customFields.getAppField('youtrackCards', [])
        .then(resp => context.customFields.setAppField('youtrackCards', resp.filter(i => i !== data.issue)))
        .then(this.fetchData)
        .catch(ui.error);
    }
  });

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
                <TabLink name="create">Create Issue</TabLink>
              </Tabs>
              <TabIssues
                hidden={activeTab !== 'issues'}
                issues={issues}
                unlinkCallback={this.unlinkCallback}
                callback={this.handleTabChange}
              />
              <TabCreateIssues
                hidden={activeTab !== 'create'}
                projects={projects}
                callback={this.callback}
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
