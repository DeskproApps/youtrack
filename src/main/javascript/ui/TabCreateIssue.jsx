
import React from 'react';
import PropTypes from 'prop-types';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Container, Heading } from '@deskpro/react-components';
import { Form, Select, Input, Textarea, Button, validators } from '@deskpro/react-components/lib/bindings/redux-form';

class TabCreateIssue extends React.PureComponent {

  handleSubmit = issue => {
    const { callback } = this.props;

    return callback({ activeTab: 'issues', fetchData: true, issue });
  };

  render() {
    const { hidden, projects, projectIssues } = this.props;

    if (hidden) {
      return null;
    }

    return (
      <Container className="dp-github-container">
        <Form name="create_issue" onSubmit={this.handleSubmit}>
          <Heading size={3} style={{ margin: '0 0 10px 0' }}>Existing Issue</Heading>
          <Select
            label="Issue:"
            id="issueId"
            name="issueId"
            options={(() => projectIssues.map(issue => ({ label: issue.id, value: issue.id })))()}
          />

          <Heading size={3} style={{ margin: '0 0 10px 0' }}>Create Issue</Heading>
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
