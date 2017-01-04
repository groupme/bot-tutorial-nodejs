var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy/;  botRegexDL = /^\/DDL/i;botRegexSalt = /^\/salt/;botRegexRules = /^\/rules/
      botRegexAd=/^\/advance/;botRegexTrades = /^\/trades/; botRegexSC = /^\/SDL/i; botODB = /(.*\s+)(.*odb)(\s+.*)/i; botDuck = /^\/duck/;
      botRegexP = /^\/PDL/i;  botRegexTw = /^\/twitch/i; botRegexSb = /^\/sub/; botRegexSh = /^\/shrug/; botRegexWk = /^\/users/; botRegexCC = /^\/cc/;
      botRegexSiege = /^\/siege/; botRegexOW = /^\/ratings/; 
      botRegexBurn = /^\/burn/; botRegexDrink = /^\/drink/;
      botRegexReid = /^\/reid/;botRegexKys = /^\/kys/; botRegexSlam = /^\/slam/; botRegexLyd = /^\/lyd/;
      botRegexGian = /^\/gian/; botRegexScrotes = /^\/scrotes/; botRegexShaki = /^\/shaki/;
      botRegexDaf = /^\/dafuq/; botRegexAyy = /^\/ayy/;
      siege1 = 'https://i.groupme.com/350x419.png.adc8c73a6c1547e0a9e04320296329f8'; siege2 = 'https://i.groupme.com/1279x752.jpeg.aa5d0401e0df495bba4b4e09dc5a6bd7'
      siege3 = 'https://i.groupme.com/960x960.png.006e180e05d841c6a2962e844bf1e6fd';
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  }
  else if(request.text && botRegexBurn.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://media.giphy.com/media/pQmWjYrz39YAg/giphy.gif");
    this.res.end();
  } 
  else if(request.text && botRegexDrink.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://media.giphy.com/media/3o7TKBcK5ywsaeBm4U/giphy.gif");
    this.res.end();
  } 
  else if(request.text && botRegexReid.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://media.giphy.com/media/g9RplpKZNkT5u/giphy.gif");
    this.res.end();
  }
  else if(request.text && botRegexKys.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.wikihow.com/Tie-a-Noose");
    this.res.end();
  } 
  else if(request.text && botRegexSlam.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://pbs.twimg.com/profile_images/587294731471757313/ZpI5PfKq.jpg");
    this.res.end();
  } 
  else if(request.text && botRegexDaf.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://i3.kym-cdn.com/photos/images/facebook/000/787/356/d6f.jpg");
    this.res.end();
  } 
  else if(request.text && botRegexLyd.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://media2.giphy.com/media/pUeXcg80cO8I8/200.gif#4");
    this.res.end();
  } 
  else if(request.text && botRegexGian.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://i.imgur.com/9V6ZnvD.png");
    this.res.end();
  } 
  else if(request.text && botRegexScrotes.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.groupme.com/1006x1340.jpeg.730381e4280e4028b8375432af14f39f.large");
    this.res.end();
  } 
  else if(request.text && botRegexShaki.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.groupme.com/305x375.jpeg.a8dd3aa18c7a4963a553e6dc16bcb100.large");
    this.res.end();
  } 
  else if(request.text && botRegexDL.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.daddyleagues.com/maddenrating?name=&position=all&team="+request.text.substring(5,8));
    //postMessage("http://daddyleagues.com/NLB/team/"+request.text.substring(5,8)+"/depthchart");
    this.res.end();
  } 
  
  else if(request.text && botRegexOW.test(request.text)) {
    this.res.writeHead(200);
    postMessage("www.daddyleagues.com/maddenrating/");
    this.res.end();
  } 
  else if(request.text && botRegexSalt.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.imgur.com/B5BSVqH.png");
    this.res.end();
  } 
  else if(request.text && botRegexAd.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.hackcollege.com/wp-content/uploads/2013/02/kno_advance.jpg");
    this.res.end();
  }
  else if(request.text && botRegexRules.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://www.daddyleagues.com/NLB/rules");
    this.res.end();
  } 
  else if(request.text && botRegexTrades.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://www.daddyleagues.com/NLB/forum");
    this.res.end();
  } 
  else if(request.text && botRegexSC.test(request.text)) {
    this.res.writeHead(200);
    
    postMessage("http://daddyleagues.com/NLB/team/"+request.text.substring(5,8)+"/schedule");
    this.res.end();
  }
  else if(request.text && botRegexP.test(request.text)) {
    this.res.writeHead(200);
    var req = request.text.substring(5,request.text.length);
    var rep = req.replace(/ /,"+");
    postMessage("http://www.daddyleagues.com/maddenrating?name="+rep+"&position=all&team=all");
    
    this.res.end();
  }  

  else if(request.text && botRegexTw.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.twitch.tv/"+request.text.substring(8,request.text.length));
    this.res.end();
  } 
  else if(request.text && botRegexSb.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.reddit.com/r/maddenall32");
    this.res.end();
  } 
  else if(request.text && botRegexSh.test(request.text)) {
    this.res.writeHead(200);
    postMessage("¯\\_(ツ)_/¯");
    this.res.end();
  } 
  else if(request.text && botRegexWk.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://docs.google.com/spreadsheets/d/1kJqQWCq3RKiTrd4f71FFNKr-Y0ppJzjk0fSF0rP6Bto/edit?usp=sharing");
    this.res.end();
  } 
  else if(request.text && botODB.test(request.text)) {
    this.res.writeHead(200);
    postMessage("OBJ*");
    this.res.end();
  } 
  else if(request.text && botDuck.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://media3.giphy.com/media/YCseTHF2I6CCA/giphy.gif");
    this.res.end();
  }
  else if(request.text && botRegexCC.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.groupme.com/851x1184.jpeg.330228901f684b0cb46cd1cef6953923");
    this.res.end();
  }
  else if(request.text && botRegexCC.test(request.text)) {
    this.res.writeHead(200);
    postMessage("(☞ﾟヮﾟ)☞");
    this.res.end();
  }
  
  else if(request.text && botRegexSiege.test(request.text)) {
    this.res.writeHead(200);
    if(0.6 >= Math.random() > 0.3)
      postMessage(siege1);
    else if(Math.random() >0.6)
      postMessage(siege3)
    else
      postMessage(siege2);
    this.res.end();
  }
  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
