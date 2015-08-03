var levelup = require('level');

var db_names=levelup("./digimon_names");
var db_images=levelup("./digimon_images");

var digimondb=levelup("./digimondb");

//digimondb.batch([{type:"del", key:"test", value:JSON.stringify({olga:"fdf", sdij:"dfi"})}], function (err) {
//    if (err) return console.log('Ooops!', err);
//    console.log('Success Digimon names!');
//});


db_names.get('index', function (err, value) {
    if (err) return console.log('Ooops!', err);
    var index=Number(value);




    function parseDigimon(i, digimon){

        if(i<index){

            var key=i.toString();
            db_names.get(key, function (err, value) {
                if (err) return console.log('Ooops names!', err);
                var digi={};
                digi.name=value;

                if(value[0]!=="@"){
                db_images.get(key, function (err, value) {
                    if (err) return console.log('Ooops images!', err);
                    digi.url=value;


                    var elems=value.split("/");
                    digimon.filename=elems[elems.length-3];

                    digimon.push({type:"put", key:key, value:JSON.stringify(digi)});
                    parseDigimon(i+1, digimon);

                });
                }else{

                    digimon.push({type:"put", key:key, value:JSON.stringify(digi)});
                    parseDigimon(i+1, digimon);
                }

            });

        }else{

            digimondb.batch(digimon, function (err) {
                if (err) return console.log('Ooops fusion!', err);
                console.log('Digimon Fusion!');
            });

        }

    }
    parseDigimon(1, [{type:"put", key:"index", value:value}]);





});
