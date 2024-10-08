const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '789067ploy',
  database: 'mobile',
});

const app = express();
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/account', (req, res, next) => {
    connection.getConnection(function (err, connection) {
    connection.query('SELECT * FROM account', function (error, results, fields) {
      if (error) {
        throw error;
      }
      res.json(results)
    });
  });
});

app.post('/login', (req, res, next) => {
  connection.query('SELECT * FROM account WHERE username = ? AND password = ?', [req.body.username, req.body.password], function(error, result, fields){
    // console.log(result);
    if(error){
      return res.json({status: 'error'});
    }
    if(result.length == 0){
      return res.json({status: 'not found'});
    }
    else{
      return res.json({accountData: result, status: "complete"});
    }
  });
})

app.post('/changePassword', async function(req, res, next){
  
  connection.query('UPDATE account SET password = ? WHERE account_id = ?', [req.body.password, req.body.account_id], function(error, result, fileds){
    if(error){
      return res.json({status: 'error'});
    }
    if(result.changedRows == 0){
      return res.json({status: "same"})
    }
    if(result.changedRows == 1){
      return res.json({status: "complete"});
    }
  });
});

app.post('/classTable', (req, res, next) => {
  console.log(req.body.account_id);
  connection.query('SELECT id, subjectname, day, startTime, endTime, room, building, classType FROM student_subsec CROSS JOIN subjectcatagory USING (subject_id) LEFT JOIN section ON (student_subsec.section_id = section.section_id) WHERE account_id = ? ORDER BY day, startTime', [req.body.account_id], function(error, result, fileds){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      return res.json({classData: result, status: "complete"});
    }
  });
});

app.post('/examTable', (req, res, next) => {
  connection.query('SELECT id, account_id, subjectname, date, startTime, endTime, type, date_format(date, "%d-%m-%Y") as formatDate, WEEKDAY(date) as day from student_subsec CROSS JOIN subjectcatagory USING (subject_id) CROSS JOIN exam USING (subject_id) WHERE account_id = ? AND type = ? GROUP BY subjectname ORDER BY date, startTime', [req.body.account_id, req.body.type], function(error, result, fileds){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      return res.json({examData: result, status: "complete"});
    }
  });
});

// app.post('/register', (req, res, next) => {
//   console.log(req.body.username);
//   console.log(req.body.password);
//   connection.query('INSERT INTO account (username, password, employee_id) VALUES (?, ?, ?)',
//   [req.body.username, req.body.password, 27], function (error, result, fields){
//     if(error){
//       return res.json({status: 'error'});
//     }
//     res.json({status: 'complete'});
//   });
// });

// Starting our server.
app.listen(3000, () => {
 console.log('http://localhost:3000/account');
});