var request = require('request');
var cheerio = require('cheerio');
var fs=require("fs");
var levelup = require('level');

var db_names=levelup("./digimon_names");
var db_images=levelup("./digimon_images");
request.get({

       url: "http://digimon.wikia.com/wiki/List_of_Digimon"

   }, function(error, response, body){
     var $ = cheerio.load(body);

var digimon_link=$(".sortable td a");
var digimon_names=[];
var digimon_images=[];
var index=1;
Object.keys(digimon_link).forEach(function(digi){
  var d=digimon_link[digi];
   if(d!==undefined)
   if(d.attribs!==undefined){
     var title=d.attribs.title;
     if(title!==undefined){

       if(Number.isInteger(Number(digi))){
         var image=digimon_link[digi-1].attribs.href;
         if(title.indexOf("(")<0&&title.indexOf(")")<0){
           digimon_images.push({type:"put", key:index.toString(), value:image});
         }else{
           title="@"+title.slice(0, title.indexOf("(")-1);
         }

          digimon_names.push({type:"put", key:index.toString(),value:title});

          index++;

       }

   }
   }
 });


digimon_names.push({type:"put", key:"index", value:index.toString()});

db_names.batch(digimon_names, function (err) {
  if (err) return console.log('Ooops!', err);
  console.log('Success Digimon names!');
});

db_images.batch(digimon_images, function (err) {
  if (err) return console.log('Ooops!', err);
  console.log('Success Digimon images!');
});

   });
