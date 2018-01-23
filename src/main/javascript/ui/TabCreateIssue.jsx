
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
    const { hidden, projects } = this.props;

    if (hidden) {
      return null;
    }

    return (
      <Container className="dp-github-container">
        <Heading size={3} style={{ margin: '0 0 10px 0' }}>Create Issue</Heading>
        <Form name="create_issue" onSubmit={this.handleSubmit}>
          <Select
            label="Project:"
            id="project"
            name="project"
            validate={validators.required}
            options={(() => projects.map(project => ({ label: project.name, value: project.shortName })))()}
          />
          <Input
            label="Summary:"
            id="summary"
            name="summary"
            validate={validators.required}
          />
          <Textarea
            label="Description:"
            id="desc"
            name="desc"
            validate={validators.required}
          />
          <Button>Create issue</Button>
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
};


TabCreateIssue.defaultProps = {
  callback: () => {}
};

export default sdkConnect(TabCreateIssue);
