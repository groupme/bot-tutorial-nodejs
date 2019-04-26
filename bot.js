var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var img1 = "https://cdn140.picsart.com/255723723020202.jpg";
var img2 = "https://img.fireden.net/v/image/1540/77/1540777065833.png";
var img3 = "https://i.redd.it/s3p6op2feg311.jpg";
var img0 = "https://i.kym-cdn.com/photos/images/original/001/290/315/b55.jpeg";
function respond() {
    var request = JSON.parse(this.req.chunks[0]), botRegex1 = /^\/cool guy$/, botRegex2 = /.*[Nn].[Gg][Gg].[Rr].*/, botRegex3 = /^\/8ball.*/, botRegex4 = /^\/patchnotes$/;

    var reg1 = botRegex1.test(request.text);
    var reg2 = botRegex2.test(request.text);
    var reg3 = botRegex3.test(request.text);
    var reg4 = botRegex4.test(request.text);

    if (request.text && reg1) {
        this.res.writeHead(200);
        postMessage(cool());
        this.res.end();
    }
    else if (request.text && reg2) {
        this.res.writeHead(200);
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                postMessage(img0);
                break;
            case 1:
                postMessage(img1);
                break;
            case 2:
                postMessage(img2);
                break;
            default:
                postMessage(img3);
                break;
        }
        postMessage('YOU CAN\'T SAY THAT THAT\'S RACIST');
        this.res.end();
    }
    else if (request.text && reg3) {
        this.res.writeHead(200);
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                postMessage('Yes, friend');
                break;
            case 1:
                postMessage('I\'m sorry, no');
                break;
            case 2:
                postMessage('Ask again later');
                break;
            default:
                postMessage('oh god oh fuck');
                break;
        }
        this.res.end();
    }
    else if (request.text && reg4) {
        this.res.writeHead(200);
        postMessage('Beemisbot v1.3 Patch Notes\n-Penguin memes added to bad word detection\n-New command: /8ball . Ask a question, then get an answer. Now works with args!\n-Added /patchnotes for Cameron. Fuck you');
        this.res.end();
    }
    else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(message) {
  var botResponse, options, body, botReq;

    botResponse = message;

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