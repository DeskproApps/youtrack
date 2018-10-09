# README

To use the Youtrack app you must first provide the following information during installation:

 - **YouTrack Service ID in Hub**: ID of YouTrack service registered in the built-in Hub service
 - **Youtrack HUB url**: URL configured for the Hub service, e.g. *https://deskpro.myjetbrains.com*
  
You will also need to register the register this application's Youtrack redirect URL (shown on this page) with the Youtrack service

This setup is required in order to register this application with Youtrack's authentication manager, which is called Hub. More information on Hub is here: https://www.jetbrains.com/hub/  
 
## Obtaining the Hub information from Youtrack

Log-in as an administrator to your Youtrack instance and click the `Settings` icon from the top right corner of the page. A menu should appear and listed under `Server Settings`, towards the end you should find a link to `Hub Integration`. Click on it and your browser should open a page at an URL similar to this one: `https://<your instance name here>.myjetbrains.com/youtrack/admin/ring`

Listed on this page there are two pieces of information, labeled `Hub URL` and `Youtrack Service ID in Hub`. Copy that information into their respective fields in this installer.

## Registering the redirect URL

On this page, the last field contains a unique URL for your application. Copy its value and open the `Hub URL` in your browser. 
On that page, in the top right corner of the page, click on the `Administration` icon  (located to the left of the `Help` icon). From the menu that appears, click on the `Services` link under `Server Settings`.

On this page (with an url similar to this one: `https://<your instance name here>.myjetbrains.com/hub/services`) you should see a list of services. Click on `Youtrack` to bring up the configuration for Youtrack.
On the Youtrack settings page, under the `Settings` tab look for a form field named `Redirect URIs` which whitelists the redirect URLs for Youtrack. Add the application's redirect URL to this list.  
 
 
You can now proceed with the installation in Deskpro  
