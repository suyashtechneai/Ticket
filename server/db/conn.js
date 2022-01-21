const mysql = require('mysql');

//console.log(process.env.MYSQL_URL);

// Live 
const connection = mysql.createConnection({
  host: '13.126.136.155',
  database: 'new_ticket_system',
  user: 'techneai',
  password: 'Techne@!'
});

//Local
// const connection = mysql.createConnection({
//   host: 'localhost',
//   database: 'ticket',
//   user: 'root',
//   password: '' 
// });

//MAC
// const connection = mysql.createConnection({
//   host: 'localhost',
//   database: 'ticket',
//   user: 'parth',
//   password: 'parth' 
// });


connection.connect(function(err) {
    if (err) throw err;
    console.log("Mysql Connected!");
});

module.exports = connection;
