//var Bot = require('node-telegram-bot');


var express = require('express');
var request = require('request');
var fs=require("fs");
var app = express();
require("./config/express.js")(app);
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var router=express.Router();
app.use(router);

var pika=express.Router();

function _send(obj){

    request.post({
        json:true,
        url:     "https://api.telegram.org/bot123477263:AAFYEdXRp8nrrPvqXXWKyoaOqk7nOfvcEx4/"+obj.method,
        formData:   obj.data
    }, function(error, response, body){
        console.log(error);

    });
}


function _message(m){
    var obj={chat_id: m.id, text:m.text};

    _send({
        method:"sendMessage",

        data:obj

    });
}

function _audio(m){

    var obj={chat_id: m.id, audio:fs.createReadStream(m.audio)};


    _send({
        method:"sendAudio",

        data:obj

    });
}

function sendWelcome(message){

    _audio({id:message.chat.id, audio: "hello.ogg"});
    _message({id:message.chat.id, text: "Pika Pika-Chu"});
}


pika.route("/talk")
    .post(function(req, res){

    console.log(req.body);


    var message=req.body.message;

    if(message.text==="/random"){

    }else{
        sendWelcome(req.body.message);
    }








    res.status(200).jsonp({});
});

app.use(pika);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});





































/*
var bot = new Bot({
  token: '123477263:AAFYEdXRp8nrrPvqXXWKyoaOqk7nOfvcEx4'
})
.on('message', function (message) {
  if(message){
    bot.sendMessage({chat_id:message.chat.id,text:"Pika Pika-Chu" }, function(err, res){
      if(err){console.log(err); return;}
      console.log(res);
    });

    bot.sendPhoto({chat_id:message.chat.id,
      caption:"Pika Pika-Chu",
      files:{ photo:"hello.png" }},
      function(err, res){
      if(err){console.log(err); return;}
      console.log(res);
    });


  }
})
.start();*/
