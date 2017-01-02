var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  var face = /^\/face$/;
  var time = /^\/time$/;

  if(request.text && face.test(request.text)) {
    this.res.writeHead(200);
    PostMessage(cool());
    this.res.end();
  } 
  else if(request.text && time.test(request.text)){
    this.res.writeHead(200);
    PostMessage("New Time");
    this.res.end();
  }
  else {
   	PostMessage("Unknown Command");
    this.res.writeHead(200);
    this.res.end();
  }
}

function PostMessage(botResponse) {
  var botResponse, options, body, botReq;
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