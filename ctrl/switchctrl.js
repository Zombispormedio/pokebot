var sqlite=require("../db/sqlite.js")(process.cwd()+"/db/switch_db");
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
        sqlite.selectAll(that.tablename, function(rows){
            var obj={};
            if(rows.length>0){
                obj.state=true;
                obj.data=rows.map(function(a){
                    return a.ACTION;
                });
                sqlite.deleteAll(that.tablename);


            }else{
                obj.state=false;
            }

            cb(obj);

        });

    }

};
