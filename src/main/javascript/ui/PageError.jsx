
import React from 'react';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Container } from '@deskpro/react-components';

/**
 * Renders the app settings page.
 */
class PageError extends React.PureComponent {

  render() {
    const { route } = this.props;
    const { error } = route.params;

    return (
      <Container className="dp-youtrack-container dp-youtrack-container--error">
        <h3 className="dp-heading">{error.type}</h3>
        <code>{error.message}</code>
      </Container>
    );
  }
}

export default sdkConnect(PageError);
