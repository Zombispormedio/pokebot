var request = require('request');

module.exports=function(obj){

    request.post({
        json:true,
        url:     "  https://maker.ifttt.com/trigger/pikabot/with/key/hVFVQTeDT9jMuSJYkR8GOgPT0xBX9dwpa00vD4TRELG",
        body:   {value1: obj.name, value2: obj.text}
    }, function(error){
        if(error){console.log(error); return;}
    });
};
