var levelup = require('level');
var utils=require("./utils.js");
var fs=require("fs");



module.exports=function(cb){



    var digimondb=levelup(process.cwd()+"/db/digimondb");
    digimondb.get('index', function (err, value) {
        if (err) return console.log('Ooops!', err); // likely the key was not found

       var i= utils.getRand(1, Number(value)).toString();

        digimondb.close(function(){
            var digimondb=levelup(process.cwd()+"/db/digimondb");
            digimondb.get(i, function(err, value){
               if (err) return console.log('Ooops!', err);
                digimondb.close();
                var digimon=JSON.parse(value);
               if(digimon.name[0]==="@"){

                   digimon.name=digimon.name.slice(1, value.length);

               }
                cb(digimon);

           });




       });


    });



};
