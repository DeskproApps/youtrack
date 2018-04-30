
import React from 'react';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Container, Button } from '@deskpro/react-components';
import { fetchAccessToken,  storeAccessToken } from '../utils'

/**
 * Renders the app settings page.
 */
class PageAuthenticate extends React.PureComponent {

  handleClick = () => {
    const { route} = this.props;

    fetchAccessToken()
      .then(storeAccessToken)
      .then(route.to('home'))
    ;
  };

  /**
   * @returns {XML}
   */
  render() {
    return (
      <Container className="dp-youtrack-container">
        <h3>Authentication required</h3>
        <p>
          It seems your access token expired. You must authenticate with Youtrack before you continue.
        </p>
        <Button onClick={this.handleClick}>
          Authenticate
        </Button>
      </Container>
    );
  }
}

export default sdkConnect(PageAuthenticate);
