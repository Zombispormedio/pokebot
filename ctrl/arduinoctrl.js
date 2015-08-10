var sqlite=require("../db/sqlite.js")(process.cwd()+"/db/arduino_db");
var utils=require("../lib/utils.js");
module.exports={
    tablename:"Arduino",

    input:function(text, cb){
        var that=this;
        sqlite.insert(that.tablename, [utils.generateID(), text, new Date()], function(){
            cb();
        });


    },

    output:function(cb){
        var that=this;
        sqlite.selectAll(that.tablename, function(row){
            var obj={};
            if(rows.length>0){
                obj.state=true;
				
                obj.data=row.DATA
                sqlite.deleteAll(that.tablename);


            }else{
                obj.state=false;
            }

            cb(obj);

        }, {limit:1});

    }

};
