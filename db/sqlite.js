var sqlite3 = require('sqlite3').verbose();



module.exports=function(name){


return {
    dbname:name,

    connectDB:function(){
        var that=this;
    return new sqlite3.Database(that.dbname);
    },

    dbConnection:function(cb){
        var that=this;
        var db= that.connectDB();
        db.serialize(function(){
            cb(db);
        });
        db.close();

    },


    runDB:function(sentence, values, cb){
        var that=this;
        that.dbConnection(function(db){
            if(values!==undefined)
                db.run(sentence, values, cb);
            else
                db.run(sentence, cb);
        });

    },

    eachRow:function(sentence, cb){
        var that=this;
        that.dbConnection(function(db){
            db.each(sentence, function(err, rows) {
                if(err){console.log(err); return;}
                cb(rows);
            });
        });
    },

    createTable:function(tablename, properties) {
        var that=this;
        that.runDB("CREATE TABLE IF NOT EXISTS "+tablename+" ("+properties.join(",")+")");
    },

    selectAll:function(tablename, cb, constrains){
        var that=this;
        var sentence="SELECT * FROM "+tablename;
		if(constrains!==undefined){
        if(constrains.order!==undefined){
            sentence+=" ORDER BY "+constrains.order;
        }
		
		if(constrains.limit!==undefined){
			sentence+=" LIMIT "+constrains.limit;
		}
		}
        that.eachRow(sentence, cb);

    },

    insert:function(tablename, values, cb){
        var that=this;

        var str_values="?";

        if(values.length>1){
            for(var i=0; i<values.length-1;i++){
                str_values+=", ?";
            }
        }

        that.runDB("INSERT INTO "+tablename+" VALUES ("+str_values+")", values, cb);

    },

    deleteAll:function(tablename){
        var that=this;
        that.runDB("DELETE  FROM "+tablename);

    }








};

};
