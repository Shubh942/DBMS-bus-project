var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var router = express.Router();
// const app=express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var createaccountRouter = require('./routes/createaccount');
var forgetRouter = require('./routes/forget');
var ticketRouter = require('./routes/ticket');

var app = express();
app.use(express.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bus'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...')
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/createaccount', createaccountRouter);
app.use('/forget', forgetRouter);
app.use('/ticket', ticketRouter);
let nam="s1@gmail.com";
app.post('/action1', (req, response) => {
  nam = req.body.userid;
  let passwd = req.body.pass;
  //  let post={userid:`${nam}`,pass:`${passwd}`}
  let sql = `SELECT * FROM passenger WHERE username = '${nam}' AND password = '${passwd}'`;
  console.log(nam, passwd);
  db.query(sql, (error, results) => {
    if (error) throw error;
    // If the account exists
    if (results.length > 0) {
      
      // Redirect to home page
      response.redirect('/ticket');
    } else {
      response.send('Incorrect Username and/or Password!');
    }
    
  });
});

app.post('/action2', (req, res) => {
  let nam = req.body.userid;
  let passwd = req.body.pass;
  let roll = req.body.roll;
  let from = "impostercrewfreedom@gmail.com";
  let sql = `INSERT INTO passenger (username, Roll_No, Payment_details, password) VALUES ('${nam}', '${roll}', '', '${passwd}') `;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/login");
      console.log('Created...');
    }
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'impostercrewfreedom@gmail.com',
        pass: 'avuwpktrouxkalqw'
      }
    });
    var mailoptions = {
      from: from,
      to: nam,
      subject: 'Sucessfully created account in IIITDMJ Bus Service',
      text: `Thank you ${roll} for creating your account in our bus service.`
    };
    transporter.sendMail(mailoptions, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email send: " + result.response);
      }
    })
  })
});

app.post("/action3", (req, res) => {
  let nam = req.body.userid;
  // let from="impostercrewfreedom@gmail.com";
  let from = "impostercrewfreedom@gmail.com";
  let sql = `SELECT password from passenger where username='${nam}' `;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      //  res.send("Password sent sucessfully");
      var pas = result[0].password;
      console.log(pas);

    }
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'impostercrewfreedom@gmail.com',
        pass: 'avuwpktrouxkalqw'
      }
    });
    var mailoptions = {
      from: from,
      to: nam,
      subject: 'Forgotted Password',
      text: `Your Password is ${pas}.`
    };
    transporter.sendMail(mailoptions, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email send: " + result.response);
      }
    })
  })
})

app.post('/action4', (req, res) => {
  let To = req.body.To;
  let departure_time = req.body.departure_time;
  let From=req.body.From;
  let Date=req.body.Date;
  console.log(To, departure_time,From,Date);
    let sql = `INSERT INTO bus_info (departure_time,drop_point,pick_up,date_book,Email_Id) VALUES ('${departure_time}','${To}','${From}','${Date}','${nam}') `;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/login");
      console.log('Booked...');
    }
    })
  })


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
