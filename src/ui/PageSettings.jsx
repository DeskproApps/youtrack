
import React from 'react';
import { Panel } from '@deskpro/apps-components';


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
      <Panel title={"Setup required"} border={"none"}>
        <p>
          To use the Youtrack app you must first provide the following information during installation:
        </p>
        <ul>
          <li>
            <strong>Youtrack HUB url</strong>: URL configured for the Hub service, e.g.
            <em>https://deskpro.myjetbrains.com</em>
          </li>
          <li>
            <strong>Youtrack Service Id</strong>: The ID of the Youtrack service.
          </li>
        </ul>
        <p>
          To learn more, consult the <a href={url} target="_blank" rel="noopener noreferrer">Youtrack documentation.</a>
        </p>
      </Panel>
    );
  }
}

export default PageSettings;
