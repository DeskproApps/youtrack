import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, List, ListItem } from '@deskpro/apps-components';
import Issue from './Issue';


// import { SearchInline} from '@deskpro/react-components';
import { Form, Select, Input, Textarea, Group } from '../Forms';
import { searchIssues } from '../api';

class TabCreateIssue extends React.Component
{
  state = {
    searchValue: '',
    searchResults: []
  };

  searchRef = null;

  handleCreate = values => {

    const { project, ...others } = values;
    const issue = { project: project && project.value ? project.value: null, ...others };

    const { callback } = this.props;
    issue.search = this.state.searchValue.split(' - ')[0]; // eslint-disable-line

    return callback({ activeTab: 'issues', fetchData: true, issue });
  };

  handleSearchChange = (searchValue) => {
    this.setState({
      searchValue: searchValue.split(' - ')[0]
    });

    searchIssues(searchValue)
      .then((issues) => {
        return this.setState({ searchResults: issues });
      });
  };

  handleLink = ({ issue }) => {

    const { callback } = this.props;
    return callback({ activeTab: 'issues', fetchData: true, issue: { search: issue } });
  };

  renderIssues = (issues, domain) => issues.map(issue => (
    <Issue issue={issue} domain={this.props.domain} linkCallback={this.handleLink} key={issue.id} />
  ));

  render() {
    const { hidden, projects } = this.props;
    const { searchValue, searchResults } = this.state;

    if (hidden) {
      return null;
    }

    return [
      <Form name="create_issue" onSubmit={this.handleCreate}>

        <Panel title={"Choose an existing issue"} border={"none"}>

          <Group label="Issue ID or URL">
            <Input name={"search"} onChange={this.handleSearchChange} autoComplete="off"/>
            { searchResults.length ? <List>{this.renderIssues(searchResults, "")}</List> : <noscript/> }
          </Group>

        </Panel>

      </Form>,

      <Form name="create_issue" onSubmit={this.handleCreate}>

        <Panel title={"Create a new issue"} border={"none"}>
          <Select
            label="Project:"
            name="project"
            options={(() => projects.map(project => ({ label: project.name, value: project.shortName })))()}
          />

          <Input
            label="Summary:"
            name="summary"
          />

          <Textarea
            label="Description:"
            name="desc"
          />

          <div className="dp-form-group">
            <Button className={"dp-Button--wide"}>Link issue</Button>
          </div>

        </Panel>

      </Form>
    ];
  }
}


TabCreateIssue.propTypes = {

  /**
   * The youtrack domain
   */
  domain: PropTypes.string.isRequired,

  /**
   * A callback
   */
  callback: PropTypes.func,

  /**
   * Whether or not the tab is hidden or not.
   */
  hidden: PropTypes.bool,

  /**
   * A list of Youtrack projects
   */
  projects: PropTypes.array.isRequired
};


TabCreateIssue.defaultProps = {
  callback: () => {}
};

export default TabCreateIssue;
