import React from 'react';
import PropTypes from 'prop-types';
import { Action, List, Panel } from '@deskpro/apps-components';

/**
 * Renders a page which displays the issues which have been linked to the
 * open ticket.
 */
class AppPlaceholder extends React.Component {
  static propTypes = {
    /**
     * instance of app client.
     */
    dpapp: PropTypes.object,
  };

  /**
   * @returns {XML}
   */
  render() {
    const { dpapp } = this.props;
    return (
      <Panel title={dpapp.t('home.linked_issues')} border={"none"} className="dp-github-container">
        <Action icon={"search"} label={dpapp.t('find')} />
        <Action icon={"add"} label={dpapp.t('create')} />
        <List className="dp-github-issues" />
      </Panel>
    );
  }
}

export default AppPlaceholder;
