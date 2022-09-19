var mysql = require('mysql2');
var express = require('express');
var database = require('./sqlConnection');
  
var app = express();
var port = process.env.PORT || 8005;
var responseStr = "MySQL Data:";

app.get('/',function(req,res){
   
   var mysqlHost = process.env.MYSQL_HOST || 'localhost';
   var mysqlPort = process.env.MYSQL_PORT || '3306';
   var mysqlUser = process.env.MYSQL_USER || 'root';
   var mysqlPass = process.env.MYSQL_PASS || 'root';
   var mysqlDB   = process.env.MYSQL_DB   || 'node_db';

   var connectionOptions = {
     host: mysqlHost,
     port: mysqlPort,
     user: mysqlUser,
     password: mysqlPass,
     database: mysqlDB
   };

   console.log('MySQL Connection config:');
   console.log(connectionOptions);
   var connection = mysql.createConnection(connectionOptions);
   connection.connect();
   console.log("Mysql connected")
   connection.end();
});


app.listen(port, function(){
    console.log('Sample mySQL app listening on port ' + port);
});

app.get("/getMysqlStatus", (req, res) => {
      
    database.ping((err) => {
        
        if(err) return res.status(500).send("MySQL Server is Down",err);
        
          
        res.send("MySQL Server is Active");
    })
});

