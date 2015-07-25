//var Bot = require('node-telegram-bot');


var express = require('express');
var request = require('request');

var app = express();
require("./config/express.js")(app);
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var router=express.Router();
app.use(router);

var pika=express.Router();


function sendMessage(message){

    request.post({
        headers: {'content-type' : 'application/json'},
        url:     "https://api.telegram.org/bot123477263:AAFYEdXRp8nrrPvqXXWKyoaOqk7nOfvcEx4/sendMessage",
        body:    {chat_id:message.chat.id,text:"Pika Pika-Chu"}
    }, function(error, response, body){
        console.log(body);
    });
}


pika.route("/talk")
    .post(function(req, res){
     console.log(req.body);
    sendMessage(req.body.message);
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
