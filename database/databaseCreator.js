import mysql from 'mysql';
import fs from 'fs';

// Create connection to mysql database
const con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "12345",
  // MUST HAVE to run multiple sql commands (otherwise '\n' charcter is interpreted)
  multipleStatements: true,
}); 

// Conencting for mysql database
con.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected!");  

  // Read the content of the .sql file
  fs.readFile('./database/initialize_database.sql', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    // '\r' character is replaced with nothing to work properly
    data = data.replace(/\r/g, '');
    
    // Execute sql code
    con.query(data, function (err, result) {  
      if (err) throw err;  
      console.log("Database created"); 
      con.end();
    });
  });  
});  
