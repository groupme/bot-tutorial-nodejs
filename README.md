# GroupMe NodeJS Callback Bot for DaddyLeagues Integration

## Introduction

This guide was partially written by me in order to more easily get your code up and running without needing a lot of the technical knowledge necessary to create a bot.  Most of the code and half of the readme was forked from https://github.com/groupme/bot-tutorial-nodejs and modified for my own needs. I've gotten a lot of requests from people to implement the bot in their GroupMe, but I don't have the time to do them all so I'm writing this guide as the guide in the previous Git is unfollowable without further explanation. This is meant to be used to setup a bot to integrate Daddyleagues more easily with GroupMe.

Any questions can be directed to /u/SharpObject on Reddit.


## Requirements:

  * GroupMe account
  * Heroku account

# Getting Started

## First, create a Heroku App:

Go to:
https://dashboard.heroku.com/apps

Use your login credentials to log in.

![Plus Sign to Create new Heroku](https://imgur.com/LWC2ks1.png?raw=true)

Click on the 'Plus Sign' as shown above.

Then click 'Create New App'.

Choose a name, or don't I prefer not to, and then click 'Create App'

The name of your app should appear in the URL, for example:
In https://dashboard.heroku.com/apps/safe-scrubland-8523/deploy/heroku-git, the name is 'safe-scrubland-8523'

Find the name of your app and remember it.

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
    * For example, mine would be `http://safe-scrubland-8523.herokuapp.com`
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

## Now you must connect Github to your Heroku Account.

First you must fork the initial code from my account.



Sign into Github, go to this link https://github.com/batorobe/bot-tutorial-nodejs-rMCF, and click the 'Fork' button in the upper right corner

![Fork button](http://imgur.com/Cm9gXmJ.png?raw=true)

Now sign into Heroku to see all of your Heroku apps and select the one you just created before:

https://dashboard-next.heroku.com/apps

Click on your app.

On your app page, click deploy in the top navigation bar.

There should be three buttons at the top, Heroku Git/Connect to GitHub/DropBox

![Deploy, Github, Search](https://imgur.com/8bhkPw9.png?raw=true)

Click Connect to Github

Sign in to Github and click Search

There should only be one 'repo' that comes up, and if you have more than one I assume you know how to do this.

Click on the repo to connect to it.

![Deploy Branch](https://imgur.com/I1JKjQm.png?raw=true)

Scroll all the way down to 'Manual Deploy' and click 'Deploy Branch'

## All done, test out the bot in your GroupMe

# How To Make The Code Your Own 

This may require some coding knowledge to get working, but basically how it works is you have a 'regex' variable at the top which stores what you want the bot to respond to, and then code below which actually responds to the code.

Sign in to Github

Find where you forked the code

![Click on bot.js](https://imgur.com/Qq957oF.png?raw=true)

Click on bot.js

![Edit Bot.js](https://imgur.com/fCuH0jw.png?raw=true)

Click on the pencil to edit the code

In order to add more commands follow these steps:
  * Create the regex command in the following way, i.e, `botRegexSb = /^\/sub/;`  
    `botRegex[x]` where `[x]` is some two to three letter combination to help you remember what the code does.  
    `/^\/[y]/;` where `[y]` is what you want the command to be.  
    Your command should look like `[x] = [y]`
    Paste the command after the last command you see, usually `botRegexWk = /^\/users/;` if this is your first command added, the semi-colon is important.  
  * Create the part of the bot that actually responds to the command
    *The template looks as follows:
    ```
    else if(request.text && botDuck.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://media3.giphy.com/media/YCseTHF2I6CCA/giphy.gif");
    this.res.end();
    }
   ```
    *Replace `botDuck` with the command you created in the first step, i.e., botRegexSb, call it [x]  
    *Replace what's inside `postMessage("")` with what you want, say [y]  
    *What you should have is:
   ```
    else if(request.text && [x].test(request.text)) {
    this.res.writeHead(200);
    postMessage("[y]");
    this.res.end();
    }
   ```
   [x] should be where what you called your regex variable, and [y] will be what you want the bot to say in chat.  
   
   Paste this code after the curly brackets of the last command, but before the code that looks like:
   ```
   else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
    }
    ```
    
 Redeploy your code on Heroku and you should be all set!
 










