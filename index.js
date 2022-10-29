const express=require('express')
// avuwpktrouxkalqw
const mysql=require('mysql');

const path=require('path')

const bodyparser=require('body-parser');
const nodemailer=require("nodemailer");

const app=express();

app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/views')));
// app.use(express.static(path.join(__dirname, '/views/style.css')));


const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bus'
});

db.connect((err)=>{
    if (err) {
        throw err;
    }
    console.log('MySql Connected...')
});



app.get('/',(req,res)=>{
    res.render("index");
});


app.get('/login',(req,res)=>{
    res.render("login");
});


app.post('/action1',(req,res)=>{
   let nam=req.body.userid;
   let passwd=req.body.pass;
    // let post={userid:`${nam}`,pass:`${passwd}`}
    let sql=`select * from passenger where username='${nam}' and password='${passwd}' `;
    console.log(nam,passwd);
    db.query(sql,(err,result)=>{
        if (err) {
            throw err;
        }else{
        res.redirect("/createaccount");
        console.log('Checked...');
        }
    })
});




app.get('/createaccount',(req,res)=>{
    res.render("Createaccount");
});

app.post('/action2',(req,res)=>{
    let nam=req.body.userid;
    let passwd=req.body.pass;
     let roll=req.body.roll;
     let from="impostercrewfreedom@gmail.com";
     let sql=`INSERT INTO passenger (username, Roll_No, Payment_details, password) VALUES ('${nam}', '${roll}', '', '${passwd}') `;
     db.query(sql,(err,result)=>{
         if (err) {
             throw err;
         }else{
         res.redirect("/login");
         console.log('Created...');
         }
         var transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: 'impostercrewfreedom@gmail.com',
                pass: 'avuwpktrouxkalqw'
            }
         });
         var mailoptions={
            from: from,
            to: nam,
            subject: 'Sucessfully created account in IIITDMJ Bus Service',
            text: `Thank you ${roll} for creating your account in our bus service.`
         };
         transporter.sendMail(mailoptions,(err,result)=>{
            if (err) {
                console.log(err);
            } else{
                console.log("Email send: "+result.response);
            }
         })
     })
 })


app.listen("2000",()=>{
    console.log("Listining...");
})