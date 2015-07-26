var request = require('request');
var fs=require("fs");

module.exports={


    _send: function (obj, cb){

        request.post({
            json:true,
            url:     "https://api.telegram.org/bot123477263:AAFYEdXRp8nrrPvqXXWKyoaOqk7nOfvcEx4/"+obj.method,
            formData:   obj.data
        }, function(error){
            if(error){console.log(error); return;}
            if(cb)cb();
        });
    },


    _message: function(m){
        var that=this;
        var obj={chat_id: m.id, text:m.text};

        that._send({
            method:"sendMessage",

            data:obj

        });
    },

    _audio: function (m){
        var that=this;
        var obj={chat_id: m.id, audio:fs.createReadStream(m.audio)};


        that._send({
            method:"sendAudio",

            data:obj

        });
    },

    _photo: function(m, cb){
        var that=this;
        var obj={chat_id: m.id, photo:fs.createReadStream(m.photo)};
        if(m.caption){
            obj.caption=m.caption;
        }


        that._send({
            method:"sendPhoto",

            data:obj

        }, cb);
    }




};
