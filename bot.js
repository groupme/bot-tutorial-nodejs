var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;

PostMessage("PollBotPlus Restarted" + "\n" + "for list of possible commands /help");

function respond() {
	var request = JSON.parse(this.req.chunks[0]);
	var face = /^\/face$/;
	var time = /^\/time$/;
	var help = /^\/help$/;
	var command = /^\/$/;

  if(request.text && face.test(request.text)) {
    this.res.writeHead(200);
    PostMessage(cool());
    this.res.end();
  } 
  else if(request.text && time.test(request.text)){
    this.res.writeHead(200);
	date = new Date();
    PostMessage(date.toLocaleTimeString());
    this.res.end();
  }
  else if(request.text && help.test(request.text)){
	  this.res.writeHead(200);
  	PostMessage("PollBotPlus Commands" + "\n" 
	  + "face: shows face" + "\n" 
	  + "time: shows UTC Time" + "\n");
	  this.res.end();
  }
else if(request.text && command.test(request.text)){
	this.res.writeHead(200);
    PostMessage("Unknown Command: Type /help for a list of valid commands");
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
