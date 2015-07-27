var request = require('request');
var cheerio = require('cheerio');

var utils=require("./utils.js");


module.exports=function(name, cbphoto, cbsound){


    request.get({

        url: "http://es.pokemon.wikia.com/wiki/"+name

    }, function(error, response, body){
        if(error){console.log(error); return;}


        var $ = cheerio.load(body);
        var img= $('.lzyPlcHld')[0].attribs["data-src"];
        utils.download(img, name+".png", cbphoto);


        var sound=$('.ogg_player').find("button")[0].attribs.onclick;

        sound=JSON.parse(sound.slice(sound.indexOf("{"), sound.indexOf("}")+1));
        var sound_url=sound.videoUrl;


        utils.download(sound_url, name+".ogg", cbsound);


    });
};
