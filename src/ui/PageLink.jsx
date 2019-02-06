import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Action, ActionBar, Panel, Separator } from '@deskpro/apps-components';
import debounce from '@deskpro/js-utils/dist/debounce';
import { Form, Input, Select, required } from '../Forms';
import Issue from './Issue';
import { getProjects } from '../redux/selectors';
import { fetchIssues, searchIssues } from '../api';
import * as actions from '../redux/actions';
import { getDomainUrl } from '../utils';

/**
 * Renders a tab containing a form which is used to link an existing Github issue
 * to the open ticket.
 */
class PageLink extends React.PureComponent {
  static propTypes = {
    projects: PropTypes.array,

    dispatch: PropTypes.func,

    /**
     * Instance of dpapp.
     */
    dpapp: PropTypes.object,
  };

  static defaultProps = {
    projects: []
  };

  state = {
    issues: [],
    query:  '',
  };

  /**
   * Called when the repo value changes
   *
   * @param {{project: string}} project
   */
  handleProjectChange = (project) => {
    const { dpapp }  = this.props;

    fetchIssues(project)
      .then((items) => {
        this.setState({ issues: items });
      }).catch(dpapp.ui.showErrorNotification);
  };

  doSearch = (value) => {
    const { dpapp }  = this.props;

    searchIssues(value)
      .then((items) => {
        this.setState({ issues: items });
      }).catch(dpapp.ui.showErrorNotification);
  };

  debouncedSearch = debounce(this.doSearch, 1000);

  handleSearch = (value) => {
    if (value) {
      this.debouncedSearch(value)
    } else {
      this.setState({ issueData: [] });
    }
  };

  backHome = () => {
    const { history }  = this.props;
    history.push("home", null);
    history.go(1);
  };

  linkIssue = (issue) => {
    const { dispatch, dpapp } = this.props;
    dispatch(actions.linkIssue(issue));
    dpapp.ui.badgeCount = dpapp.ui.badgeCount + 1;
    this.backHome();
  };

  render() {
    const { projects, dpapp } = this.props;
    const { issues } = this.state;

    return (
      <Panel border={"none"} >
        <ActionBar title={dpapp.t('link_page.search_issue')}>
          <Action icon="close" onClick={this.backHome} />
        </ActionBar>
        <Form name="search_issue">
          <Input type="search" name="search" onChange={this.handleSearch}/>
        </Form>
        <Separator title={dpapp.t('orSeparator')} />
        <ActionBar title={dpapp.t('link_page.link_issue')} />
        <Form name="link_issue">
          <Select
            label={`${dpapp.t('youtrack.project')}:`}
            name=     "project"

            validate= {required}
            onChange= {this.handleProjectChange}
            placeholder={dpapp.t('youtrack.please_select')}
            options={(() => projects.map(project => ({ label: project.name, value: project.shortName })))()}
            required
          />
        </Form>
        {issues.map(issue => (
          <Issue
            key={issue.id}
            issue={issue}
            domain={getDomainUrl()}
            linkCallback={this.linkIssue}
          />
        ))}
      </Panel>
    );
  }
}

export default connect(state => ({
  projects: getProjects(state)
}))(PageLink);
