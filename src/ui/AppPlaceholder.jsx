import React from 'react';
import { Action, List, Panel } from '@deskpro/apps-components';

/**
 * Renders a page which displays the issues which have been linked to the
 * open ticket.
 */
class AppPlaceholder extends React.Component {

  /**
   * @returns {XML}
   */
  render() {
    return (
      <Panel title={"Linked Issues"} border={"none"} className="dp-github-container">
        <Action icon={"search"} label={"Find"} />
        <Action icon={"add"} label={"Create"} />
        <List className="dp-github-issues" />
      </Panel>
    );
  }
}

export default AppPlaceholder;
