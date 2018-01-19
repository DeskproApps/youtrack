
import React from 'react';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Container } from '@deskpro/react-components';

/**
 * Renders the app settings page.
 */
class PageSettings extends React.PureComponent {

  /**
   * @returns {XML}
   */
  render() {
    const url = 'https://www.jetbrains.com/help/youtrack/standalone/2017.2/OAuth-Authorization.html';

    return (
      <Container className="dp-youtrack-container">
        <h3>Setup required</h3>
        <p>
          To use the Youtrack app you must first provide the following information during installation:
        </p>
        <ul>
          <li>
            <strong>Youtrack Client ID</strong>: ID of YouTrack service registered in the built-in Hub service.
          </li>
          <li>
            <strong>Youtrack HUB url</strong>: URL configured for the Hub service, e.g.
            <em>https://deskpro.myjetbrains.com</em>
          </li>
        </ul>
        <p>
          To learn more, consult the <a href={url} target="_blank" rel="noopener noreferrer">Youtrack documentation.</a>
        </p>
      </Container>
    );
  }
}

export default sdkConnect(PageSettings);
