var request = require('request');
var cheerio = require('cheerio');

var utils=require("./utils.js");

var maker=require("./maker.js");
module.exports=function(obj, cb){


    request.get({

        url: "http://es.pokemon.wikia.com/wiki/"+obj.name

    }, function(error, response, body){
        if(error){console.log(error); return;}


        var $ = cheerio.load(body);

        if($('.vnav_datos').find("img")[0]!==undefined&&$('.ogg_player').find("button")[0]!==undefined){

            var img= $('.vnav_datos').find("img")[0].attribs["data-src"];


            var sound=$('.ogg_player').find("button")[0].attribs.onclick;

            sound=JSON.parse(sound.slice(sound.indexOf("{"), sound.indexOf("}")+1));
            var sound_url=sound.videoUrl;



            utils.download(img, obj.name+".png", function(){

                utils.download(sound_url, obj.name+".ogg", cb);

            });
        }else{

            maker({name:"Error", text:obj.id+" "+obj.name });
        }







    });
};
