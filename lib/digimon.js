var levelup = require('level');
var utils=require("./utils.js");
var db_names=levelup("../db/digimon_names");
var db_images=levelup("../db/digimon_images");


module.exports=function(cb){
    var digimon={};
    db_names.get('index', function (err, value) {
        if (err) return console.log('Ooops!', err); // likely the key was not found

       var i= utils.getRand(1, Number(value)).toString();


        db_names.get(i, function(err, value){
            if (err) return console.log('Ooops!', err);

            digimon.name=value;
            if(value[0]!=="@"){

                digimon.name=value.slice(1, value.length);
                cb(digimon);
            }else{

                db_images.get(i, function(err, value){
                    if (err) return console.log('Ooops!', err);

                    digimon.url=value;
                    cb(digimon);

                });

            }

        });

    });



};