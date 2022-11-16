var express = require('express');
var mysql=require('mysql');

var router = express.Router();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bus'
});
var app = express();
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...')
});
let a;

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: a,
    title1: '-Select-',
    title3: 'dd/mm/yyyy',
    title2: '-Time-'
  });
});
/* GET home page. */

// app.post('/action5', (req, res) => {
//   let date_book=req.body.date_book;
//   let departure_time=req.body.departure_time;
//   let To=req.body.To;
//   let sql =`SELECT count(*) as Available_Seats From bus_info WHERE To='${To}' and date_book='${date_book}' and departure_time='${departure_time}'`
  
//   db.query(sql, (err, result) => {
//    if (err) {
//      throw err;
//    } else {
//     a=result[0].Available_Seats;
//      res.redirect("/");
//      console.log('Checked...');
//    }
//    })
// });



module.exports = router;
