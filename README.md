# Sample GroupMe NodeJS Callback Bot

## Introduction

This project shows the capability of a bot to react to messages sent within a group.

## Contents

  * [Quickly get our sample bot up and running in your groups](#deploy)
    * Deploy the code to heroku
    * Create a bot
    * Configure to your bot's credentials
  * [Make changes to the bot](#pull)
    * Pull the code down to your local machine
    * Configure the local environment variables to your bot's credentials

## Requirements:

  * GroupMe account
  * Heroku account
  * [Heroku Toolbelt](https://toolbelt.heroku.com/)

# Get your bot up and running<a name="deploy"></a>

## Deploy to Heroku:

Be sure to log into heroku, using your heroku credentials, then click the link below.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

You should be taken to a page that looks like this:

![Deploy to Heroku](http://i.groupme.com/837x662.png.36c63698644a4f61a9ff3d5af91caa5e)

Optionally, you can give your app a name, or instead leave
it blank and let Heroku name it for you (you can change it later).

![Success](https://i.groupme.com/959x932.png.85e7959a8a9a41c6b20f5f6b50aceecb)


## Next, create a GroupMe Bot:

Go to:
https://dev.groupme.com/session/new

Use your GroupMe credentials to log into the developer site.

![Log into dev.groupme.com](https://i.groupme.com/640x292.png.38c9e590383149c1a01424fc61cdce4e)

Once you have successfully logged in, go to https://dev.groupme.com/bots/new

![Create your new bot](http://i.groupme.com/567x373.png.242d18352d7742858cf9a263f597c5d9)

Fill out the form to create your new bot:

  * Select the group where you want the bot to live
  * Give your bot a name
  * Paste in the url to your newly deply heroku app
    * `http://your-app-name-here.herokuapp.com/`
  * (Optional) Give your bot an avatar by providing a url to an image
  * Click submit

## Find your Bot ID:<a name="get-bot-id"></a>

Go here to view all of your bots:
https://dev.groupme.com/bots

Click on the one you just created.

![Select your new bot](http://i.groupme.com/871x333.png.5a33ef2b6ab74ea59d5aaa5569aaaf23)

On your Bot's page, copy the Bot ID

![Copy your Bot ID](http://i.groupme.com/615x295.png.3256190e86ed4cd7ae6cf09899c1f9a8)

## Add your Bot ID to your Heroku app:

Go here to see all of your Heroku apps and select the one you just created before:

https://dashboard-next.heroku.com/apps

![Select your heroku app](http://i.groupme.com/920x722.png.46154d6b95f249539c594b129ddb7732)

On your app page, click settings in the top navigation:

![Go to your app's settings](http://i.groupme.com/722x127.png.27c0a2e83c524064bd41bb66df76d14c)

On your app's setting page, find the Config Vars section and click the Reveal Config Vars button:

![Reveal your environment variables](http://i.groupme.com/606x181.png.94d5157963bc419886e98e038e3195c3)

Then click edit:

![Edit your environment variables](http://i.groupme.com/796x212.png.b8979454fc4742c7bae688ac67262755)

Fill out the form to add an environment variable to your app:

  * In the "key" field type: BOT_ID
  * In the "value" field paste your Bot ID that you copied in the previous steps
  * Click the save button

![Add the Bot ID environment variable](http://i.groupme.com/784x148.png.5790498a7acd46b289aca2be43e9c84e)

## Now go test your bot!

Go to GroupMe and type "/cool guy" in the group where your bot lives to see it in action.

![Test your Bot](http://i.groupme.com/821x587.png.7bcf55bed1c64acab83fa2c2ad0b0862)

# Make it your own<a name="pull"></a>

## Pull the code to your local machine

Within terminal, change directory to the location where you would like the files to live, then run this command:

    $ heroku git:clone -a YOUR_APP_NAME_HERE

And then change directory into the new folder

    $ cd YOUR_APP_NAME_HERE

## Configure your local BOT_ID environment variable

Open the file `.env` from your local files in your text editor of choice.
Find where it says "YOUR_BOT_ID_HERE" and replace it with the ID of your new bot.

If you don't know what your Bot ID is, please refer back to [this](#get-bot-id) section,
where it is explained how to retrieve it.

If your Bot ID is 12345678910, then:

    BOT_ID="YOUR_BOT_ID_HERE"

becomes:

    BOT_ID="12345678910"

## Start the server

To test your bot locally, open terminal and run the following command to start a local server.

    $ foreman start

Then navigate to `http://127.0.0.1:5000/` in a browser.

![Local bot](http://i.groupme.com/502x133.png.f06c630467954f5dab4c742dc67b71bf)

## All done! Go play around and make the bot your own.

