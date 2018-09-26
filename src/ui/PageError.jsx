
import React from 'react';
import { Panel } from '@deskpro/apps-components';
import PropTypes from "prop-types";

/**
 * Renders the app settings page.
 */
class PageError extends React.PureComponent {

  render() {
    const { error } = this.props.location.state;

    return (
      <Panel title={error.type}>
        <code>{error.message}</code>
      </Panel>
    );
  }
}

PageError.propTypes = {

  location: PropTypes.object.isRequired

};

export default PageError;
