var sqlite=require("./sqlite.js")("./arduino_db");

sqlite.createTable("Arduino", [

    "ID CHAR(50) PRIMARY KEY     NOT NULL",
    "ACTION        CHAR(100)",
    "DATE DATE"

]);
