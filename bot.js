var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      hypeMode = /^!hypemode/im;
      hypeCalls = /^!hype([1-3])/im;

  if (request.text && hypeCalls.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else if (request.text && hypeMode.test(request.text)) {
    this.res.writeHead(200);
    this.res.write('You want hype? YOU GOT IT!');
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse + '☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃',
    "attachments": [{
      "type": "emoji",
      "placeholder": "☃",
      "charmap": [
        [1, 64], // 100
        [18, 21], // thumbs up
        [4, 36], //rip
        [9, 20], // shaka brah
        [9, 21], // make it rain
        [9, 33],
        [9, 10]
      ]
    }]
  };


  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if (res.statusCode == 202) {
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
