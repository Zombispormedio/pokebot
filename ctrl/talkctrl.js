var telegram=require("../lib/telegram.js");
var fs=require("fs");
var _pokeapi=require("../lib/pokeapi.js");
var utils=require("../lib/utils.js");
var request = require('request');
module.exports={


    random: function(message){


        var poke_number=utils.getRand(1,718);



        _pokeapi("/api/v1/pokemon/"+poke_number+"/", function(body){

            var sprite=body.sprites;

            var name=body.name;

            var rand_index=utils.getRand(0,sprite.length-1);

            _pokeapi(sprite[rand_index].resource_uri, function(body){

                _pokeapi(body.image, function(){
                    telegram._photo({id:message.chat.id, photo: poke_number+".png", caption: name }, function(){
                        fs.unlink(poke_number+".png");
                    });

                }, true, poke_number);

            });


        });


    },
    sendWelcome:function(message){

        telegram._audio({id:message.chat.id, audio: "hello.ogg"});
        telegram._message({id:message.chat.id, text: "Pika Pika-Chu"});
    },

    controller: function(message){



        request.post({
            json:true,
            url:     "  https://maker.ifttt.com/trigger/pikabot/with/key/hVFVQTeDT9jMuSJYkR8GOgPT0xBX9dwpa00vD4TRELG",
            body:   {value1: message.chat.first_name+" "+message.chat.last_name, value2: message.text}
        }, function(error, response, body){
            if(error){console.log(error); return;}
            console.log(response);

        });


        var that=this;
        if(message.text==="/random"){

            that.random(message);


        }else{
            that.sendWelcome(message);
        }




    }








};
