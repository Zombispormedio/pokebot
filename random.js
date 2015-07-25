var fs = require('fs'),request = require('request');

function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var poke_number=getRand(1,718);
var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function _pokeapi(method, cb, image){
    var url="http://pokeapi.co"+method;
    if(image){

        download(url, poke_number+".png",cb );

    }else{
        request.get({

            url:     url

        }, function(error, response, body){
            if(error){console.log(error); return;}

            cb(JSON.parse(body));


        });
    }
}









_pokeapi("/api/v1/pokemon/493/", function(body){

    var sprite=body.sprites;

    var name=body.name;
    console.log(name);
    console.log(sprite);
    _pokeapi(sprite[getRand(0,sprite.length-1)].resource_uri, function(body){

        _pokeapi(body.image, function(){

        console.log("Sprite: "+name);
        }, true);

    });


});


console.log(getRand(0,2));
