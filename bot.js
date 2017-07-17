var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;

//inputs
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
	botRegexRoll = /\!roll/i;
	botRegexYesno = /\!yesno/i;
	botRegexQYes = /is kyle gay\?|is erica rich\?|is jayjay cool\?/i;
	botRegexDoggopls = /\!doggopls/i;

  if(request.text && (botRegexRoll.test(request.text) || botRegexYesno.test(request.text)|| botRegexQYes.test(request.text) || botRegexDoggopls.test(request.text))) {
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
	
	if (/\!roll/i.test(request)){
		var x = Math.floor((Math.random() * 10) + 1);
		botResponse = x.toString();
	}else if (/\!yesno/i.test(request)){
		var x = Math.floor((Math.random() * 3) + 1);
		if (x == 1) {
			botResponse = "yes";
		} else if (x == 2) {
			botResponse = "no";
		} else if (x == 3) {
			botResponse = "maybe";
		}
	}else if (/is kyle gay\?|is erica rich\?|is jayjay cool\?/i.test(request)){
		botResponse = "yes";
   
	}else if (/\!doggopls/i.test(request)){
		var x = Math.floor((Math.random() * 50) + 1);
		if (x == 1) {
			botResponse = "http://i.imgur.com/xyPtn4m.jpg";
		} else if (x == 1) {
			botResponse = "http://i.imgur.com/JR6noxf.jpg";
		} else if (x == 2) {
			botResponse = "http://i.imgur.com/RZrxsVG.jpg";
		} else if (x == 3) {
			botResponse = "http://i.imgur.com/93ChdNu.jpg";
		} else if (x == 4) {
			botResponse = "http://i.imgur.com/kXcZdiS.jpg";
		} else if (x == 5) {
			botResponse = "http://i.imgur.com/ZWSZGKj.jpg";
		} else if (x == 6) {
			botResponse = "http://i.imgur.com/YYmI8Uz.jpg";
		} else if (x == 7) {
			botResponse = "http://i.imgur.com/9KqyVJR.jpg";
		} else if (x == 8) {
			botResponse = "http://i.imgur.com/b33ARVa.jpg";
		} else if (x == 9) {
			botResponse = "http://i.imgur.com/rpQdRoY.jpg";
		} else if (x == 10) {
			botResponse = "http://i.imgur.com/xrVXDQ2.jpg";
		} else if (x == 10) {
			botResponse = "http://i.imgur.com/Bt6zrhq.jpg";
		} else if (x == 11) {
			botResponse = "http://i.imgur.com/sNm8hRR.jpg";
		} else if (x == 12) {
			botResponse = "http://i.imgur.com/TeTwhxN.jpg";
		} else if (x == 13) {
			botResponse = "http://i.imgur.com/bWioilW.jpg";
		} else if (x == 14) {
			botResponse = "http://i.imgur.com/e9aTxh7.jpg";
		} else if (x == 15) {
			botResponse = "http://i.imgur.com/oMm6Zba.jpg";
		} else if (x == 16) {
			botResponse = "http://i.imgur.com/aA4kvJE.jpg";
		} else if (x == 17) {
			botResponse = "http://i.imgur.com/FJRTLZR.jpg";
		} else if (x == 18) {
			botResponse = "http://i.imgur.com/QiudnCT.jpg";
		} else if (x == 19) {
			botResponse = "http://i.imgur.com/2nYIwTd.jpg";
		} else if (x == 20) {
			botResponse = "http://i.imgur.com/NnFZVPC.jpg";
		} else if (x == 21) {
			botResponse = "http://i.imgur.com/uEHtSpB.jpg";
		} else if (x == 22) {
			botResponse = "http://i.imgur.com/5DPqIi0.jpg";
		} else if (x == 23) {
			botResponse = "http://i.imgur.com/ZkxnaRE.jpg";
		} else if (x == 24) {
			botResponse = "http://i.imgur.com/kCWMUgk.jpg";
		} else if (x == 25) {
			botResponse = "http://i.imgur.com/yKAXiyl.jpg";
		} else if (x == 26) {
			botResponse = "http://i.imgur.com/A4eVQQF.jpg";
		} else if (x == 27) {
			botResponse = "http://i.imgur.com/uIX5RVf.jpg";
		} else if (x == 28) {
			botResponse = "http://i.imgur.com/iebobk1.jpg";
		} else if (x == 29) {
			botResponse = "http://i.imgur.com/wFrFhdi.jpg";
		} else if (x == 30) {
			botResponse = "http://i.imgur.com/BFVOBBB.jpg";
		} else if (x == 31) {
			botResponse = "http://i.imgur.com/49Da81l.jpg";
		} else if (x == 32) {
			botResponse = "http://i.imgur.com/1CbG6MT.jpg";
		} else if (x == 33) {
			botResponse = "http://i.imgur.com/nmYZwwO.jpg";
		} else if (x == 34) {
			botResponse = "http://i.imgur.com/FTWr0ac.jpg";
		} else if (x == 35) {
			botResponse = "http://i.imgur.com/KPLiS7r.jpg";
		} else if (x == 36) {
			botResponse = "http://i.imgur.com/e5lG5tB.jpg";
		} else if (x == 37) {
			botResponse = "http://i.imgur.com/OYBBx0H.png";
		} else if (x == 38) {
			botResponse = "http://i.imgur.com/t76aUWa.jpg";
		} else if (x == 39) {
			botResponse = "http://i.imgur.com/eYgjIrT.jpg";
		} else if (x == 40) {
			botResponse = "http://i.imgur.com/VTEgzXg.jpg";
		} else if (x == 41) {
			botResponse = "http://i.imgur.com/rFmyIDA.jpg";
		} else if (x == 42) {
			botResponse = "http://i.imgur.com/h3KVnB8.jpg";
		} else if (x == 43) {
			botResponse = "http://i.imgur.com/aUbe8ic.jpg";
		} else if (x == 44) {
			botResponse = "http://i.imgur.com/0JINKgM.jpg";
		} else if (x == 45) {
			botResponse = "http://i.imgur.com/jmu6xqa.jpg";
		} else if (x == 46) {
			botResponse = "http://i.imgur.com/Wm4Ilnd.jpg";
		} else if (x == 47) {
			botResponse = "http://i.imgur.com/EnkGzjd.jpg";
		} else if (x == 48) {
			botResponse = "http://i.imgur.com/DiEct0t.png";
		} else if (x == 49) {
			botResponse = "http://i.imgur.com/AeQuyyc.png";
		} else if (x == 50) {
			botResponse = "http://i.imgur.com/I9gNxh5.jpg";
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

exports.respond = respond;