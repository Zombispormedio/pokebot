//var Bot = require('node-telegram-bot');


var express = require('express');
var request = require('request');
var fs=require("fs");


function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function _pokeapi(method, cb, image, poke_number){
    var url="http://pokeapi.co"+method;
    if(image){

        download(url, poke_number+".png",cb );

    }else{
        request.get({

            url: url

        }, function(error, response, body){
            if(error){console.log(error); return;}

            cb(JSON.parse(body));


        });
    }
}







var app = express();
require("./config/express.js")(app);
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var router=express.Router();
app.use(router);

var pika=express.Router();

function _send(obj, cb){

    request.post({
        json:true,
        url:     "https://api.telegram.org/bot123477263:AAFYEdXRp8nrrPvqXXWKyoaOqk7nOfvcEx4/"+obj.method,
        formData:   obj.data
    }, function(error, response, body){
        console.log(error);
        if(cb)cb();
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

function _photo(m, cb){

    var obj={chat_id: m.id, photo:fs.createReadStream(m.photo)};
    if(m.caption){
        obj.caption=m.caption;
    }


    _send({
        method:"sendPhoto",

        data:obj

    }, cb);
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

        var poke_number=getRand(1,718);



        _pokeapi("/api/v1/pokemon/"+poke_number+"/", function(body){

            var sprite=body.sprites;

            var name=body.name;


            _pokeapi(sprite[getRand(0,sprite.length-1)].resource_uri, function(body){

                _pokeapi(body.image, function(){
                    _photo({id:message.chat.id, photo: poke_number+".png", caption: name }, function(){
                        fs.unlink(poke_number+".png");
                    });

                }, true, poke_number);

            });


        });






    }else{
        sendWelcome(message);
    }








    res.status(200).jsonp({});
});

app.use(pika);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});





































