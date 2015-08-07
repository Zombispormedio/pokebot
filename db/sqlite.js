var sqlite3 = require('sqlite3').verbose();



module.exports={


    connectDB:function(){
        return new sqlite3.Database('./db/switch_db');
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
            db.all(sentence, function(err, rows) {
                if(err){console.log(err); return;}
                cb(rows);
            });
        });
    },

    createTable:function(tablename, properties) {
        var that=this;
        that.runDB("CREATE TABLE IF NOT EXISTS "+tablename+" ("+properties.join(",")+")");
    },

    selectAll:function(tablename, cb){
        var that=this;
        that.eachRow("SELECT * FROM "+tablename, cb);

    },

    insert:function(tablename, values, cb){
        var that=this;
        that.runDB("INSERT INTO "+tablename+" VALUES (?, ?, ?)", values, cb);

    },

    deleteAll:function(tablename){
        var that=this;
        that.runDB("DELETE  FROM "+tablename);

    }










};
