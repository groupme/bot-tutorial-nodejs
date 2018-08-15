var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var starwars = require("starwars")
var oneLinerJoke = require("one-liner-joke");
var chuckNorrisJokes = require("chuck-norris-jokes")

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      quoteRegex = /^\/quote/,
      jokeRegex = /^\/joke/,
      chuckRegex = /^\/chuck/,
      ligmaRegex = /Ligma/;

  console.log(request.user_id);
  
  if(request.text && quoteRegex.test(request.text)) {
    this.res.writeHead(200);
    postQuoteMessage();
    this.res.end();
  }else if(request.text && (request.text=="What's Ligma?"||request.text=="what's ligma?"||request.text=="What's ligma?"||request.text=="whats ligma?") && request.sender_type!="bot") {
    this.res.writeHead(200);
    postLigmaBallsMessage();
    this.res.end();
  }else if(request.text && ligmaRegex.test(request.text) && request.sender_type!="bot") {
    this.res.writeHead(200);
    postLigmaMessage();
    this.res.end();  
  }else if(request.text && jokeRegex.test(request.text)) {
    this.res.writeHead(200);
    postJokeMessage();
    this.res.end();
  }else if(request.text && chuckRegex.test(request.text)) {
    this.res.writeHead(200);
    postChuckMessage();
    this.res.end();
  }else if(request.text && request.text=="Who's that Pokemon?" && request.user_id=="26558043") {
    this.res.writeHead(200);
    postPokemonMessage();
    this.res.end();
  }else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postChuckMessage() {
  var botResponse, options, body, botReq, jokePromise;
  
  jokePromise = chuckNorrisJokes.hitme();

  jokePromise.then(function(value){
    botResponse = value;
    
    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
    
    console.log(botResponse)
  });

  //botResponse =  oneLinerJoke.getRandomJokeWithTag('dirty', 'stupid', 'insults', 'blonde').body;
  
  
}

function postJokeMessage() {
  var botResponse, options, body, botReq;

  botResponse =  oneLinerJoke.getRandomJokeWithTag('dirty', 'stupid', 'insults', 'blonde').body;
  //botResponse =  oneLinerJoke.getRandomJokeWithTag('blonde').body;
  
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postQuoteMessage() {
  var botResponse, options, body, botReq;

  botResponse = starwars();
  
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postLigmaMessage() {
  var botResponse, options, body, botReq;

  botResponse = "What's Ligma?";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postLigmaBallsMessage() {
  var botResponse, options, body, botReq;

  botResponse = "Ligma balls";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postPokemonMessage() {
  var botResponse, options, body, botReq;

  botResponse = "Gulpin";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postLostMessage() {
  var botResponse, options, body, botReq;

  botResponse = "(╯°□°）╯︵ ┻━┻";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postDoghouseMessage() {
  var botResponse, options, body, botReq;

  botResponse = "I can tell that Lucas really loves Brooke. What's even more important is that Lucas definitely didn't program me to say this in case there's a day he's in the doghouse. That is all.";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
