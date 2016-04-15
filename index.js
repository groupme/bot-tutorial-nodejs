// set up ========================
var env = require('node-env-file');
var HTTPS = require('https');
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var Schema = mongoose.Schema;
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var API = require('groupme').Stateless;
var timeplan = require('timeplan');
// configuration =================
env('./.env');

// local configuration read from env.


var options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
};

var mongodbUri = 'mongodb://foo:bar@ds025389.mlab.com:25389/messagebase';
//var mongodbUri = 'mongodb://ds025389.mlab.com:25389/messagebase';
//var mongodbUri = 'mongodb://localhost/test';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.
  console.log('connection opened');
  getSchedules();
  app.listen(process.env.PORT || 8080);
  console.log("App listening on port 8080");
});






// mongoose.connect('mongodb://sho854:kai1483@ds025389.mlab.com:25389/messagebase');
// //mongoose.connect('mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + '@ds025459.mlab.com:25459/heroku_w850c5rk')
// //mongoose.connect('mongodb://localhost/test');
// mongoose.connection.on('error', function(err) {
//   // Do something
//   console.log('databse connection error');
// });

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

var schema1 = new mongoose.Schema({
  text: String
});
var schema2 = new mongoose.Schema({
  message: String,
  when: {
    type: Date,
    default: Date.now
  }
});

var messages = mongoose.model('messages', schema1);
var schedules = mongoose.model('schedules', schema2);

//set up timeplan ==================

var curSchedule = [];
getSchedules();


timeplan.repeat({
  period: "10s",
  task: function() {
    console.log('checking schedule, length is ' + curSchedule.length);
    for (var i = 0; i < curSchedule.length; i++) {
      cur = curSchedule[i];
      now = Date.now();
      time = cur.when;
      if (now >= time) {
        console.log(cur.message);
        API.Bots.post(process.env.TOKEN, process.env.BOT_ID, cur.message, {}, function(err, ret) {
          console.log(cur._id);
          deleteSchedule(cur._id);
        });
      }
    }
  }
});



// routes ======================================================================

// api ---------------------------------------------------------------------

//get conversation
app.get('/api/groupme', function(req, res) {
  //make call to groupme api to get conversation, and send it to front end
  API.Messages.index(process.env.TOKEN, process.env.GROUP, {}, function(err, ret) {
    res.json(ret);
  });
});

//send a message
app.post('/api/groupme', function(req, res) {
  //send updated conversation as response
  API.Bots.post(process.env.TOKEN, process.env.BOT_ID, req.body.text, {}, function(err, ret) {
    API.Messages.index(process.env.TOKEN, process.env.GROUP, {}, function(err, ret) {
      res.json(ret);
    });
  });
});

app.post('/api/bot', function(req, res) {

  //var request = JSON.parse(req.chunks[0]);
  var botRegex = /[Hh]ans/;
  var request = req.body.text;
  console.log(req.body.name != process.env.NAME);
  console.log(process.env.NAME);


  if (req.body.name.toLowerCase() != process.env.NAME.toLowerCase() && botRegex.test(request)) {
    API.Bots.post(process.env.TOKEN, process.env.BOT_ID, 'i am hans', {}, function(err, ret) {
      res.end('');
    });
  }
  res.end('');
});


function getSchedules() {
  schedules.find(function(err, schedules) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      throw err;
    }
    curSchedule = schedules;
    return schedules;
  });
}


function postSchedules(message, when) {
  schedules.create({
    message: message,
    when: when
  }, function(err, schedule) {
    if (err) {
      throw err;
    }
  });
}

function deleteSchedule(id) {
  schedules.remove({
    _id: id
  }, function(err, schedule) {
    if (err) {
      throw err;
    }
  });
}

app.get('/api/schedules', function(req, res) {
  getSchedules();
  res.json(curSchedule);
});

// create message and send back all messages after creation
app.post('/api/schedules', function(req, res) {
  postSchedules(req.body.message, req.body.when);
  getSchedules();
  res.json(curSchedule);
});

// delete a message
app.delete('/api/schedules/:schedule_id', function(req, res) {
  deleteSchedule(req.params.schedule_id);
  getSchedules();
  res.json(curSchedule);
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
    if (err) {
      res.send(err);
    }

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
    if (err) {
      res.send(err);
    }

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
