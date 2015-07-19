var Bot = require('node-telegram-bot');


var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));



var bot = new Bot({
  token: '123477263:AAFYEdXRp8nrrPvqXXWKyoaOqk7nOfvcEx4'
})
.on('message', function (message) {
  if(message){
  /*  bot.sendMessage({chat_id:message.chat.id,text:"Pika Pika-Chu" }, function(err, res){
      if(err){console.log(err); return;}
      console.log(res);
    });*/

    bot.sendPhoto({chat_id:message.chat.id,
      caption:"Pika Pika-Chu",
      files:{ photo:"hello.png" }},
      function(err, res){
      if(err){console.log(err); return;}
      console.log(res);
    });


  }
})
.start();



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
