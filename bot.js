var HTTPS = require('https'),
	cool = require('cool-ascii-faces'),
	rdg = require('random-dogs-generator'),
	rcg = require('random-cats-generator'),
	botID = process.env.BOT_ID;

//PostMessage("Thumb Thumb Restarted" + "\n" + "for list of possible commands /help");

function respond() {
	var request = JSON.parse(this.req.chunks[0]);
	var face = /^\/face/gi;
	var time = /^\/time/gi;
	var help = /^\/help/gi;
	var bees = /bees/gi;
	var thumb = /thumb/gi;
	var dogme = /dog me/gi;
	var doubledogme = /double dog me/gi;
	var cat = /cat/gi;

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
  	PostMessage("Did someone say bees?");
	this.res.end();
  }
  else if(request.text && thumb.test(request.text)){
	this.res.writeHead(200);
  	PostMessage("Are you talking to me?");
	this.res.end();
  }
   else if(request.text && doubledogme.test(request.text)){
	this.res.writeHead(200);
  	PostImage(rdg(), "Dog for you");
	PostImage(rdg(), "More dogs for you");
	this.res.end();
  }
   else if(request.text && dogme.test(request.text)){
	this.res.writeHead(200);
  	PostImage(rdg(), "Dog for you");
	this.res.end();
  }
	else if(request.text && cat.test(request.text)){
	 this.res.writeHead(200);
		 PostImage(rcg(), "Kitty!!!");
	 this.res.end();
 }
}

function PostImage(botResponse, text) {
  var botResponse, options, body, botReq;
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };
  body = {
    "bot_id" : botID,
    "text" : text,
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
