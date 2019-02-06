
import React from 'react';
import { Button, Panel, Phrase } from '@deskpro/apps-components';


import { fetchAccessToken,  storeAccessToken } from '../utils'
import PropTypes from "prop-types";

/**
 * Renders the app settings page.
 */
class PageAuthenticate extends React.PureComponent {

  handleClick = () => {
    const { history } = this.props;

    fetchAccessToken()
      .then(storeAccessToken)
      .then(() => {
        history.push("home", null);
        history.go(1);
      })
    ;
  };

  /**
   * @returns {XML}
   */
  render() {
    return (
      <Panel title="Authentication required">
        <p>
          <Phrase id="authenticate.token_expired" />
        </p>
        <Button onClick={this.handleClick}>
          <Phrase id="authenticate.authenticate"/>
        </Button>
      </Panel>
    );
  }
}

PageAuthenticate.propTypes = {

  history: PropTypes.object.isRequired,

  dpapp: PropTypes.object.isRequired
};

export default PageAuthenticate;
