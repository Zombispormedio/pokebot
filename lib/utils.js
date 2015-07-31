var fs = require('fs'),request = require('request');

module.exports={


    getRand: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    download : function(uri, filename, callback){
        request.head(uri, function(err, res, body){
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    }


};
