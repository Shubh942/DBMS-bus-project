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
var paymentRouter = require('./routes/payment');

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
app.use('/payment',paymentRouter);



let namq

let sample2
let sample1
app.post('/action1', (req, response) => {
  nam = req.body.userid;
  let passwd = req.body.pass;
  //  let post={userid:`${nam}`,pass:`${passwd}`}
  if (nam=='admin@gmail.com' && passwd=='12345') {
    console.log(nam, passwd);
    
    let sql = `SELECT * FROM passenger`;
    let sql2 = `SELECT * FROM bus_info`;
    db.query(sql2,(err,datafromtable2)=>{
      if (err) {
        throw err;
    }
    
    // console.log(datafromtable2);
    sample2=datafromtable2;
      
    })


    db.query(sql,(err,datafromtable)=>{
      if (err) {
          throw err;
      }
      sample1=datafromtable
      response.render("admin",{
          title:'Login_Table',
          id:'ID',
          user:'Username',
          pass:'pass',
          action:'show',
          mess:'Enter query',
          sampledata:datafromtable,
          sampledata2:sample2
      })
      // console.log(datafromtable);
  })

    
  }
  else{
  let sql = `SELECT * FROM passenger WHERE username = '${nam}' AND password = '${passwd}'`;
  console.log(nam, passwd);
  namq=nam;
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
}
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
    let sql = `INSERT INTO bus_info (departure_time,drop_point,pick_up,date_book,Email_Id) VALUES ('${departure_time}','${To}','${From}','${Date}','${namq}') `;
    if(From!=To){
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/payment");
      console.log('Booked...');
    }
    })
  }
  else{
    res.send("Please Enter the Valid Details");
  }
  });









  app.post('/action5', (req, res) => {
    let date_book=req.body.date_book;
    let departure_time=req.body.departure_time;
    let drop_point=req.body.drop_point;
    let sql =`SELECT count(*) as Available_Seats From bus_info WHERE drop_point='${drop_point}' and date_book='${date_book}' and departure_time='${departure_time}'`
    // console.log(drop_point,date_book,departure_time);
    db.query(sql, (err, result) => {
     if (err) {
       throw err;
     } else {
      a=result[0].Available_Seats;
      let b=40-a;
       res.render("index",{
        title:b,
        title1:drop_point,
        title2:departure_time,
        title3:date_book
      });
      console.log(date_book);
       console.log('Checked...');
     }
     })
    });








    app.post('/action6', (req, res) => {
      let TransactionId = req.body.TransactionId;
      let i  = req.body.filename;
      
      console.log(TransactionId,image);
      //   let sql = `INSERT INTO bus_info (departure_time,drop_point,pick_up,date_book,Email_Id) VALUES ('${departure_time}','${To}','${From}','${Date}','${nam}') `;
      //   if(From!=To){
      // db.query(sql, (err, result) => {
      //   if (err) {
      //     throw err;
      //   } else {
      //     res.redirect("/payment");
      //     console.log('Booked...');
      //   }
      //   })
      // }
      // else{
      //   res.send("Please Enter the Valid Details");
      // }
      });

      app.post('/action8', (req, res) => {
        
        // console.log(To, departure_time,From,Date);
          let sql = req.body.sqli;
         
        db.query(sql, (err, result) => {
          if (err) {
            console.log("error")
            res.render("admin",{
              mess:"Wrong sql query",
              
            sampledata:sample1,
            sampledata2:sample2

            })
          } else {
            console.log("done")
            res.render("admin",{
              mess:"executed",
              sampledata:sample1,
            sampledata2:sample2
            })
          }
          })
        
       
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
