import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Action, List, Panel } from '@deskpro/apps-components';

import { getProp, getDomainUrl } from '../utils';
import Issue from './Issue';
import { getIssues } from '../redux/selectors';
import * as actions from '../redux/actions';

const customFieldID = 'youtrackCards';

/**
 * Renders a page which displays the issues which have been linked to the
 * open ticket.
 */
class PageHome extends React.Component {
  static propTypes = {

    location: PropTypes.object.isRequired,

    history: PropTypes.object.isRequired,

    /**
     * Instance of dpapp.
     */
    dpapp: PropTypes.object,

    /**
     * Error callback
     */
    handleError: PropTypes.func,

    issues: PropTypes.array,

    dispatch: PropTypes.func,
  };

  componentDidUpdate() {
    const { issues, dpapp } = this.props;

    if (issues && issues.length) {
      dpapp.ui.badgeCount = issues.length;
      dpapp.ui.showBadgeCount();
    } else if (issues) {
      dpapp.ui.hideBadgeCount();
    }
  }

  handleTabChange = activeTab => this.setState({ activeTab });

  unlinkCallback = data => this.setState({
    activeTab: getProp(data, 'tab', 'issues'),
    fetchData: getProp(data, 'fetchData', false)
  }, () => {
    const { customFields } = this.props.dpapp.context.get('ticket');
    if (getProp(data, 'fetchData', false)) {

      return customFields.getAppField(customFieldID, [])
        .then(resp => {
          return customFields.setAppField(customFieldID, resp.filter(i => i.toLowerCase() !== data.issue.toLowerCase()))
        })
        .catch(this.handleError);
    }
  });

  openLink = () => {
    const { history } = this.props;
    history.push("link", null);
    history.go(1);
  };

  openCreate = () => {
    const { history } = this.props;
    history.push("create", null);
    history.go(1);
  };

  handleUnlinkIssue = (issue) => {
    this.props.dispatch(actions.unlinkIssue(issue));
  };

  /**
   * @returns {XML}
   */
  render() {
    const { issues, dpapp } = this.props;

    console.warn(dpapp.t('create'));
    return (
      <Panel title={dpapp.t('home.linked_issues')} border={"none"} className="dp-github-container">
        <Action icon={"search"} label={dpapp.t('find')} onClick={this.openLink}/>
        <Action icon={"add"} label={dpapp.t('create')} onClick={this.openCreate}/>
        <List className="dp-github-issues">
          {issues.map((issue) => (
            <Issue
              issue={issue}
              key={issue.id}
              dpapp={dpapp}
              domain={getDomainUrl()}
              unlinkCallback={this.handleUnlinkIssue}
            />
          ))}
        </List>

      </Panel>
    );
  }
}

export default connect(state => ({
  issues: getIssues(state)
}))(PageHome);
