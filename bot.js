var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;

//INPUTS
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
	botRegexRoll = /\![Rr][Oo][Ll][Ll]/;
	botRegexYesno = /\![Yy][Ee][Ss][Nn][Oo]/;

  if(request.text && (botRegexRoll.test(request.text) || botRegexYesno.test(request.text))) {
	this.res.writeHead(200);
    postMessage(request.text);
    this.res.end();
  }else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

//reponse
function postMessage(request) {
	var botResponse, options, body, botReq;
	
	if (/\![Rr][Oo][Ll][Ll]/.test(request)){
		
		var x = Math.floor((Math.random() * 10) + 1);
		botResponse = x.toString();
  }else if (/\![Yy][Ee][Ss][Nn][Oo]/.test(request)){
		var x = Math.floor((Math.random() * 3) + 1);
		if (x == 1) {
			botResponse = "yes";
		} else if (x == 2) {
			botResponse = "no";
		} else if (x == 3) {
			botResponse = "maybe";
    }
  }


  
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

//reponse when !yesno
function postMessageYesno() {
  var botResponse, options, body, botReq;
  var x = Math.floor((Math.random() * 3) + 1);
  if (x == 1) {
        botResponse = "yes";
    } else if (x == 2) {
        botResponse = "no";
    } else if (x == 3) {
        botResponse = "maybe";
    }

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