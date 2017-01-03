var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;

//PostMessage("Thumb Thumb Restarted" + "\n" + "for list of possible commands /help");

function respond() {
	var request = JSON.parse(this.req.chunks[0]);
	var face = /^\/face$/;
	var time = /^\/time$/;
	var help = /^\/help$/;
	var bees = /bees$/;
	var thumb = /thumb$/;
	var dogme = /dog me$/;

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
  	PostMessage("Thumb Thumb Commands" + "\n" 
	  + "face: shows face" + "\n" 
	  + "time: shows UTC Time" + "\n");
	this.res.end();
  }
  else if(request.text && bees.test(request.text)){
	this.res.writeHead(200);
  	PostMessage("Did someone say bees");
	this.res.end();
  }
  else if(request.text && thumb.test(request.text)){
	this.res.writeHead(200);
  	PostMessage("Are you talking to me?");
	this.res.end();
  }
   else if(request.text && dogme.test(request.text)){
	this.res.writeHead(200);
  	PostImage(getDog());
	this.res.end();
  }
}

function PostImage(botResponse) {
  var botResponse, options, body, botReq;
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };
  body = {
    "bot_id" : botID,
    "text" : 'Dog for you',
	"attachments" : [
    {
      "type"  : "image",
      "url"   : botResponse
    }
  ]
  };
  console.log('sending ' + botResponse + ' to ' + botID);
  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });
  botReq.end(JSON.stringify(body));
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
  botReq.end(JSON.stringify(body));
}
exports.respond = respond;
