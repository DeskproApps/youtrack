
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
    return (
      <Container className="dp-github-container">
        <h3>Setup required</h3>
        <p>
          To use the Youtrack app you must first provide the following information during installation:
          <ul>
            <li>
              Youtrack Client ID: an ID of the YouTrack service that is registered in the built-in Hub service.
            </li>
            <li>
               Youtrack HUB url: a url configured for the Hub service, e.g. <em>https://deskpro.myjetbrains.com</em>
            </li>
          </ul>
        </p>
        <p>
          <a href="https://www.jetbrains.com/help/youtrack/standalone/2017.2/OAuth-Authorization.html">
            Further information.
          </a>
        </p>
      </Container>
    );
  }
}

export default sdkConnect(PageSettings);
