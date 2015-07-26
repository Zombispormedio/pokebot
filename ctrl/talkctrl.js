var telegram=require("../lib/telegram.js");
var fs=require("fs");
var _pokeapi=require("../lib/pokeapi.js");
var utils=require("../utils.js");

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

        var that=this;
        if(message.text==="/random"){

            that.random(message);


        }else{
            that.sendWelcome(message);
        }




    }








};
