var request = require('request');

module.exports=function(obj){

    request.post({
        json:true,
        url:     "IFFT_URL",
        body:   {value1: obj.name, value2: obj.text}
    }, function(error){
        if(error){console.log(error); return;}
    });
};
