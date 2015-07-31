
var express = require('express');
var fs=require("fs");
var talkctrl=require("./ctrl/talkctrl.js");


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


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
