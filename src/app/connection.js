import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "royallove_2019",
    database: "",
});

connection.connect((err)=>{
    if (err){
        console.error("Connection error:", err)
        return;
    }
    console.log("Connected successfully");
    connection.end();
})
