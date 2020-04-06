const mysql = require("mysql");
const { promisify } = require("util");
const { database }= require("./keys");

const pool = mysql.createPool(database);
pool.getConnection((err, connection)=>{
    if(err){
        if(err.code == "PROTOCOL_CONNECTION_LOST"){
            console.log("database connection lose");
        }
        if(err.code === "ER_CON_COUNT_ERROR"){
            console.log("DB HAS MANY CONNECTION");
        }
        if(err.code === "ECONNREFUSED"){
            console.log("CONNECTION WAS REFUSE")
        }
    }
    if(connection) connection.release();
    console.log("DB is CONECTED");
    return;
});

//Promisify pool query
pool.query = promisify(pool.query);     

module.exports = pool;
