// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

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


// define model =================
var messages = mongoose.model('messages', {
  text: String
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all messages
app.get('/api/messages', function(req, res) {
  console.log('get received');
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
    text: req.body.text,
    done: false
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
