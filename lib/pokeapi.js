var request = require('request');
var utils=require("./utils.js");

module.exports=function(method, cb, image, poke_number){
    var url="http://pokeapi.co"+method;

    if(image){

        utils.download(url, poke_number+".png",cb );

    }else{
        request.get({

            url: url

        }, function(error, response, body){
            if(error){console.log(error); return;}

            cb(JSON.parse(body));


        });
    }
};




