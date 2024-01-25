YouTrack App Setup Instructions
===

To install the YouTrack app you must first create an API token. Head over to your YouTrack cloud account, the URL will look something
like `https://<my_company>.youtrack.cloud/` or your own instance.

Once you've logged in, navigate to the "Profile Settings" section (under your user profile menu, top right of the screen).

[![](/docs/assets/setup/youtrack-setup-01.png)](/docs/assets/setup/youtrack-setup-01.png)

Next, go to the "Account Security" tab. Here you'll find the "Tokens" section and click on the button "New token..."

[![](/docs/assets/setup/youtrack-setup-02.png)](/docs/assets/setup/youtrack-setup-02.png)

Enter a name for the new API token (this can be anything you like). In the following example we've named it "YouTrack Deskpro App" and select the `YouTrack` scope.

[![](/docs/assets/setup/youtrack-setup-03.png)](/docs/assets/setup/youtrack-setup-03.png)

After creating the token, copy it for a later step. It's **important that you keep your secret API token safe**.

[![](/docs/assets/setup/youtrack-setup-04.png)](/docs/assets/setup/youtrack-setup-04.png)

Close the modal window, and you can see your token in the list

[![](/docs/assets/setup/youtrack-setup-05.png)](/docs/assets/setup/youtrack-setup-05.png)

> __Note:__ If you have multiple URLs and one Deskpro instance, you must configure it.
> Click on the "Gear" icon -> "Server Settings" -> "Global Settings". And on the "Resource Sharing" section specify:
> 1. select "Allow all origins" to access all your sites to the YouTrack
> 2. or list all your URLs in "Allowed origins" for more security
>
> [![](/docs/assets/setup/youtrack-setup-05-1.png)](/docs/assets/setup/youtrack-setup-05-1.png)

Ok, now head back to Deskpro and navigate to the "Settings" tab of the YouTrack App.

[![](/docs/assets/setup/youtrack-setup-06.png)](/docs/assets/setup/youtrack-setup-06.png)

From this screen, enter the following details:

* **YouTrack Instance URL** - this is your YouTrack URL (e.g. this will be `my_company` if your YouTrack URL is `https://my_company.youtrack.cloud`) or the URL of your own YouTrack instance
* **Permanent Token** - this is the token you created in the previous steps

To configure who can see and use the YouTrack app, head to the "Permissions" tab and select those users and/or groups you'd like to have access.

When you're happy, click "Install".
