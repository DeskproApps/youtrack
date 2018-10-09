
import React from 'react';
import PropTypes from 'prop-types';
import Issue from './Issue';
import { Button, Panel, ListItem, List } from '@deskpro/apps-components';


class TabIssues extends React.PureComponent {

  renderIssues = (issues, domain) => issues.map(issue => (
    <Issue issue={issue} domain={domain} unlinkCallback={this.props.unlinkCallback} key={issue.id} />
  ));

  render() {
    const { issues, hidden, callback, domain } = this.props;

    if (hidden) {
      return null;
    }

    return (
      [
        <List className="dp-spacer">
          {issues.length ? this.renderIssues(issues, domain) : 'There are no issues currently linked.'}
        </List>,

        <Button onClick={() => callback('create')} className={"dp-Button--wide"}>
          {issues.length ? 'Create another issue' : 'Create an issue'}
        </Button>
      ]
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
   * Delete issue handler
   */
  unlinkCallback: PropTypes.func,

  /**
   * Callback handler for Button
   */
  callback: PropTypes.func.isRequired,

  /**
   * The youtrack domain
   */
  domain: PropTypes.string.isRequired
};

TabIssues.defaultProps = {
  unlinkCallback: () => {}
};

export default TabIssues;
