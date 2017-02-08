var HTTPS = require('https');
var botID = process.env.BOT_ID;

PostMessage("Dinner at " + Math.floor((Math.random() * 12) + 1) + Math.floor((Math.random() * 60) + 1));

function respond() {
	var request = JSON.parse(this.req.chunks[0]);
	this.res.writeHead(200);
	PostMessage("Dinner at " + Math.floor((Math.random() * 12) + 1) + Math.floor((Math.random() * 60) + 1));
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
	console.log('Line 19');
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
	  console.log('Line 25');
  });
  console.log('Line 27');
  botReq.end(JSON.stringify(body));
}
exports.respond = respond;
