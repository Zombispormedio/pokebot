var sqlite=require("./sqlite.js");

sqlite.createTable("Arduino", [

    "ID CHAR(50) PRIMARY KEY     NOT NULL",
    "ACTION        CHAR(100)",
    "DATE DATE"

]);
