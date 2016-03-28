// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var bot = require('fancy-groupme-bot');

// configuration =================

// local configuration read from env.
const TOKEN = process.env['TOKEN']; // your groupme api token
const GROUP = process.env['GROUP']; // the room you want to join
const NAME = process.env['NAME']; // the name of your bot
const URL = process.env['URL']; // the domain you're serving from, should be accessible by Groupme.
const CONFIG = {
  token: TOKEN,
  group: GROUP,
  name: NAME,
  url: URL
};

var mybot = bot(CONFIG);

//mongoose.connect('mongodb://sho854:kai1483@ds025389.mlab.com:25389/messagebase');

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', function(err) {
  // Do something
  console.log('databse connection error');
});

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
  'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());


// define models =================
var messages = mongoose.model('messages', {
  text: String
});

var schedule = mongoose.model('schedule', {
  message: String,
  when: Date,
});

// routes ======================================================================

// api ---------------------------------------------------------------------

//get conversation
app.get('/api/groupme', function(req, res) {
  //make call to groupme api to get conversation, and send it to front end
});

//send a message
app.post('/api/groupme', function(req, res) {
  mybot.message(req.body);
  //send updated conversation as response
});

//have bot listening for messages
// mybot.on('botMessage', function(b, message) {
//   var botRegex = /[Hh]ans/;
//   if (message.text && botRegex.test(message.txt) && message.text != NAME) {
//     b.message('Praise me');
//   }
// });

//get scheduled events
app.get('/api/schedule', function(req, res) {
  //get all scheduled events from database and send them
  // use mongoose to get all scheduled items in the database
  schedule.find(function(err, schedule) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    res.json(schedule); // return all messages in JSON format
  });
});

//create new event
app.post('/api/schedule', function(req, res) {
  //create a new document for the new event
  // create a item, information comes from AJAX request from Angular
  schedule.create({
    text: req.body.message,
    when: req.body.date
  }, function(err, message) {
    if (err)
      res.send(err);

    // get and return all the messages after you create another
    schedule.find(function(err, schedule) {
      if (err) {
        res.send(err);
      }
      res.json(schedule);
    });
  });
});

//delete event
app.delete('/api/schedule/:schedule_id', function(req, res) {
  //remove scheduled message with given id
  schedule.remove({
    _id: req.params.schedule_id
  }, function(err, schedule) {
    if (err)
      res.send(err);

    // get and return all the messages after you create another
    schedule.find(function(err, schedule) {
      if (err) {

        res.send(err);
      }
      res.json(schedule);
    });
  });
});

// get all messages
app.get('/api/messages', function(req, res) {
  // use mongoose to get all messages in the database
  messages.find(function(err, messages) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    res.json(messages); // return all messages in JSON format
  });
});

// create message and send back all messages after creation
app.post('/api/messages', function(req, res) {

  // create a message, information comes from AJAX request from Angular
  messages.create({
    text: req.body.text
  }, function(err, message) {
    if (err)
      res.send(err);

    // get and return all the messages after you create another
    messages.find(function(err, messages) {
      if (err) {
        res.send(err);
      }
      res.json(messages);
    });
  });

});

// delete a message
app.delete('/api/messages/:message_id', function(req, res) {
  messages.remove({
    _id: req.params.message_id
  }, function(err, message) {
    if (err)
      res.send(err);

    // get and return all the messages after you create another
    messages.find(function(err, messages) {
      if (err) {

        res.send(err);
      }
      res.json(messages);
    });
  });
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");


/*

var http, director, cool, bot, router, server, port;

http        = require('http');
director    = require('director');
cool        = require('cool-ascii-faces');
bot         = require('./bot.js');

 router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
}
*/
