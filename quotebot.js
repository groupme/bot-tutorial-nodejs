var HTTPS = require('https');
var botID = process.env.BOT_ID;
var rqg = require('random-qoutes-generator');

PostMessage(rqg() + " " + rqg()  + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg());

function respond() {
	var request = JSON.parse(this.req.chunks[0]);
	this.res.writeHead(200);
	PostMessage(rgq() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg() + " " + rqg());
	this.res.end();
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
