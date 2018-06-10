var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);

  var hypemode = /^!hypemode/im.test(request.text),
      hype1 = /^!hype1/im.test(request.text),
      hype2 = /^!hype2/im.test(request.text),
      hype3 = /^!hype3/im.test(request.text);

  if (request.text && hype1) {
    this.res.writeHead(200);
    postEmojis(1);
    this.res.end();
  } else if (request.text && hype2) {
    this.res.writeHead(200);
    postEmojis(2);
    this.res.end();
  } else if (request.text && hype3) {
    this.res.writeHead(200);
    postEmojis(3);
    this.res.end();
  } else if (request.text && hypemodeMatch !== null) {
    this.res.writeHead(200);
    postMessage('You want hype? YOU GOT IT!');
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
function postMessage(message) {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : message
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

function postEmojis(emojiSet) {
  var botResponse, options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  emojis = {
    1: [
        [1, 64], // 100
        [18, 21], // thumbs up
        [4, 36], //rip
        [9, 20], // shaka brah
        [9, 21], // make it rain
        [9, 33], // rainbow flag
        [9, 10] // mind blown
    ],
    2: [
        [4, 36], // lots of rips
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36]
    ],
    3: [
        [1, 64], // 100
        [9, 10], // mind blown
        [1, 64], // 100
        [9, 10], // mind blown
        [1, 64], // 100
        [9, 10], // mind blown
        [1, 64], // 100
        [9, 10], // mind blown
        [1, 64], // 100
        [9, 10] // mind blown
    ]
  };

  body = {
    "bot_id" : botID,
    "text" : '☃☃☃☃☃☃☃',
    "attachments": [{
      "type": "emoji",
      "placeholder": "☃",
      "charmap": emojis[emojiSet]
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
