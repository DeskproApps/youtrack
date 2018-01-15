
import React from 'react';
import PropTypes from 'prop-types';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Container, Heading, List, Button } from '@deskpro/react-components';
import Issue from './Issue';

class TabIssues extends React.PureComponent {

  renderIssues = issues => issues.map(issue => <Issue issue={issue} key={issue.id} />);

  render() {
    const { issues, hidden, callback } = this.props;

    if (hidden) {
      return null;
    }

    return (
      <Container>
        <Heading size={3}>Issues</Heading>
        <List className="dp-youtrack-issues">
          {issues.length ? this.renderIssues(issues) : 'There are no issues currently linked.'}
        </List>
        <Button onClick={() => callback('create')}>
          {issues.length ? 'Create another issue' : 'Create an issue'}
        </Button>
      </Container>
    );
  }
}

TabIssues.propTypes = {
  /**
   * Whether or not the tab is hidden.
   */
  hidden: PropTypes.bool,

  /**
   * List of Youtrack issues.
   */
  issues: PropTypes.array,

  /**
   * Callback handler for Button
   */
  callback: PropTypes.func.isRequired
};


export default sdkConnect(TabIssues);
