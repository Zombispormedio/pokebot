
var express = require('express');

var talkctrl=require("./ctrl/talkctrl.js");

var arduinoctrl=require("./ctrl/arduinoctrl.js");
var app = express();
require("./config/express.js")(app);
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var router=express.Router();
app.use(router);

var pika=express.Router();



pika.route("/talk")
    .post(function(req, res){

    console.log(req.body);


    talkctrl. controller(req.body.message);


    res.status(200).jsonp({});
});

app.use(pika);

var sweet=express.Router();

sweet.route("/switch")
    .get(function(req, res){

arduinoctrl.output(function(obj){
        res.status(200).jsonp(obj);
    });


    });

app.use(sweet);


var ardu=express.Router();

sweet.route("/arduino")
    .post(function(req, res){
	console.log(req.body);
    /*arduinoctrl.input(req.body.text, function(){
        res.status(200).jsonp({});
    });*/


});

app.use(ardu);



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
