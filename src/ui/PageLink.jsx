import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Action, ActionBar, Panel, Separator } from '@deskpro/apps-components';
import debounce from '@deskpro/js-utils/dist/debounce';
import { Form, Input, Select, required } from '../Forms';
import Issue from './Issue';
import { getProjects } from '../redux/selectors';
import { searchIssues } from '../api';

/**
 * Renders a tab containing a form which is used to link an existing Github issue
 * to the open ticket.
 */
class PageLink extends React.PureComponent {
  static propTypes = {
    projects: PropTypes.array
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
    console.warn(project);
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

  render() {
    const { projects } = this.props;
    const { issues } = this.state;

    console.log(projects);
    return (
      <Panel border={"none"} >
        <ActionBar title="Search for an issue">
          <Action icon="close" onClick={this.backHome} />
        </ActionBar>
        <Form name="search_issue">
          <Input type="search" name="search" onChange={this.handleSearch}/>
        </Form>
        <Separator title="or" />
        <ActionBar title="Link issue" />
        <Form name="link_issue">
          <Select
            label=    "Project:"
            name=     "project"

            validate= {required}
            onChange= {this.handleProjectChange}
            options={(() => projects.map(project => ({ label: project.name, value: project.shortName })))()}
            required
          />
        </Form>
        {issues.map(issue => <Issue key={issue.id} issue={issue} onLink={() => this.linkIssue(issue)}/>)}
      </Panel>
    );
  }
}

export default connect(state => ({
  projects: getProjects(state)
}))(PageLink);
