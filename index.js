var Bot = require('node-telegram-bot');

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
