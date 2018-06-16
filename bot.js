var HTTPS = require('https');
var botID = process.env.BOT_ID;

var quotes = [
  'Asher! Guess what we did! - Ghost',
  'Ooh, look! Look! It\'s a Vex milk waterfall! - Ghost',
  'From the unbearable racket! My head! - Asher Mir',
  'We\'re great at this! Good thing we already have a day job, huh? - Ghost',
  'No Vex can vex us, no Taken can take us down.',
  'You know what I say about you Guardian? You do things big and you do them with style. - Devrim Kay',
  'It\'s that falcon again. Is it following us, or are we following it? - Ghost',
  'Do you feel it? Hold on to your helmet! Do you feel it? The light is back!'
]

function respond() {
  var request = JSON.parse(this.req.chunks[0]);

  var hypemode = /^!hypemode/im.test(request.text),
      hype1 = /^!hype1/im.test(request.text),
      hype2 = /^!hype2/im.test(request.text),
      hype3 = /^!hype3/im.test(request.text),
      rip = /^!rip/im.test(request.text),
      bird = /^!bird/im.test(request.text),
      nope = /^!nope/im.test(request.text),
      quote = /^!quote/im.test(request.text);

  // she goes for the badboy type
  this.res.writeHead(200);
  if (request.text) {
    if (hype1) {
      postEmojis(1);
    } else if (hype2) {
      postEmojis(2);
    } else if (hype3) {
      postEmojis(3);
    } else if (hypemode) {
      postMessage('You want hype? YOU GOT IT!');
    } else if (rip) {
      postEmojis(4);
    } else if (bird) {
      postMessage('http://www.reactiongifs.com/wp-content/uploads/2013/07/finger.gif');
    } else if (nope) {
      postMessage('http://gif-finder.com/wp-content/uploads/2017/04/Danny-DeVito-Nope.gif');
    } else if (quote) {
      postQuote();
    } else {
      console.log("don't care");
    }
  }
  this.res.end();
}
function postMessage(message) {
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : message
  };

  console.log('sending ' + message + ' to ' + botID);

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
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  placeholders = {
    1: ['☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃'],
    2: ['☃☃☃☃☃☃'],
    3: ['☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃'],
    4: ['☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃']
  };

  emojis = {
    1: [
      [18, 21], // 100
      [9, 20], // shaka brah
      [9, 21], // make it rain
      [9, 33], // rainbow flag
      [18, 21], // 100
      [9, 20], // shaka brah
      [9, 21], // make it rain
      [9, 33], // rainbow flag
      [18, 21], // 100
      [9, 20], // shaka brah
      [9, 21], // make it rain
      [9, 33], // rainbow flag
      [18, 21], // 100
      [9, 20], // shaka brah
      [9, 21], // make it rain
      [9, 33] // rainbow flag
    ],
    2: [
        [3, 11],
        [3, 83],
        [3, 96],
        [3, 93],
        [3, 81],
        [3, 11]
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
        [9, 10], // mind blown
        [1, 64], // 100
        [9, 10], // mind blown
        [1, 64], // 100
        [9, 10], // mind blown
        [1, 64], // 100
        [9, 10] // mind blown
    ],
    4: [
        [4, 36], // lots of rips
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36],
        [4, 36]
      ],
  };

  body = {
    "bot_id" : botID,
    "text" : placeholders[emojiSet],
    "attachments": [{
      "type": "emoji",
      "placeholder": '☃',
      "charmap": emojis[emojiSet]
    }]
  };

  console.log('sending emojis to ' + botID);

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

function postQuote() {
  var i = quotes.length;
  var x = Math.floor(Math.random() * i);

  postMessage(quotes[x]);
}

exports.respond = respond;
