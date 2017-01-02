var HTTPS = require('https');
var botID = process.env.BOT_ID;

PostMessage("Dinner at 5:30?");

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
  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}