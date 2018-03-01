import React from 'react';
import PropTypes from 'prop-types';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Container, Heading, Group, SearchInline } from '@deskpro/react-components';
import { reduxForm } from '@deskpro/react-components/dist/bindings';
import { searchIssues } from '../api';

const { Form, Select, Input, Textarea, Button } = reduxForm;

class TabCreateIssue extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchResults: []
    };
    this.searchRef = null;
  }

  handleSubmit = issue => {
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

  handleSearchSelect = (searchValue) => {
    this.setState({
      searchValue: searchValue.split(' - ')[0],
      searchResults: []
    });
  };

  render() {
    const { hidden, projects } = this.props;
    const { searchValue, searchResults } = this.state;

    if (hidden) {
      return null;
    }

    return (
      <Container className="dp-github-container">
        <Form name="create_issue" onSubmit={this.handleSubmit}>
          <Heading size={3} style={{ margin: '0 0 10px 0' }}>
            Existing Issue
          </Heading>
          <Group label="Issue ID or URL">
            <SearchInline
              value={searchValue}
              results={searchResults}
              autoComplete="off"
              ref={ref => { this.searchRef = ref; }}
              onChange={this.handleSearchChange}
              onSelect={this.handleSearchSelect}
            />
          </Group>

          <Heading size={3} style={{ margin: '0 0 10px 0' }}>
            Create Issue
          </Heading>
          <Select
            label="Project:"
            id="project"
            name="project"
            options={(() => projects.map(project => ({ label: project.name, value: project.shortName })))()}
          />
          <Input
            label="Summary:"
            id="summary"
            name="summary"
          />
          <Textarea
            label="Description:"
            id="desc"
            name="desc"
          />
          <Button>Link issue</Button>
        </Form>
      </Container>
    );
  }
}


TabCreateIssue.propTypes = {
  /**
   * A callback
   */
  callback: PropTypes.func,

  /**
   * A callback
   */
  context: PropTypes.object.isRequired,

  /**
   * Whether or not the tab is hidden or not.
   */
  hidden: PropTypes.bool,

  /**
   * Instance of sdk ui.
   */
  ui: PropTypes.object.isRequired,

  /**
   * A list of Youtrack projects
   */
  projects: PropTypes.array.isRequired,

  /**
   * A list of existing Youtrack issues
   */
  projectIssues: PropTypes.array.isRequired
};


TabCreateIssue.defaultProps = {
  callback: () => {}
};

export default sdkConnect(TabCreateIssue);
