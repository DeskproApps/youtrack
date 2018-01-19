
import React from 'react';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Container } from '@deskpro/react-components';

/**
 * Renders the app settings page.
 */
class PageError extends React.PureComponent {

  render() {
    const error = { type: 'Authorization', reason: 'Opps' };

    return (
      <Container className="dp-youtrack-container dp-youtrack-container--error">
        <h3 className="dp-heading">{error.type} error</h3>
        <p>
          The following error occurred: <code>{error.reason}</code>
        </p>
      </Container>
    );
  }
}

export default sdkConnect(PageError);
