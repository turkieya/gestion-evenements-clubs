const express = require("express");
 const cors = require('cors');
 var router=express.Router() ;
 const bodyParser = require('body-parser');
var mongoose=require('mongoose')

//const {mongoose}=require('./database/db');
const Pusher = require('pusher');

const emails=require('./routes/email.js');
const memberemail=require('./routes/sendinfo');
const demande = require ('./routes/demande.routes')
const user = require('./routes/auth.routes');
const materiel = require('./routes/materiel.routes');
const salle = require('./routes/salle.routes');
const eventRoutes = require('./routes/event.js');
var path =require('path');
const app = express();
var morgan = require('morgan'); 
app.use(morgan('dev'));  
app.use(bodyParser.json());
var fs = require('fs');
var path = require('path');
var path = require('ejs');
var content = fs.readFileSync("static/index.html", 'utf8');
app.use("/static", express.static('static'));
app.set('view engine', 'ejs');
//connect to mongodb

const dbURI ='mongodb+srv://enicarthage:enicarthage@enicarth.eubag.mongodb.net/GE?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true}).then((result)=> console.log('connected todb'))
.catch((err)=>console.log(err));

const nodeMailer = require("nodemailer");
var morgan = require('morgan'); 
var email = require('express-mailer');
const fileUpload= require('express-fileupload')
//app2.use(busboyBodyParser({ limit: '5mb'}));
//app2.use(logger('dev'));
//app2.use((req,res,next)=>{
 //res.header('Access-Control-Allow-Origin','*');
//res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
 //res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
  //next();


//});

app.use(morgan('dev'));  
app.use(bodyParser.json());
var multer = require('multer');
app.use(function(req, res, next) {
  app.use(express.static('public'))
  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});
const passportLocalMongoose = require('passport-local-mongoose');
/*app.use(bodyParser.utrlencoded({  extended: true}));*/
app.use(cors());
app.use(cors({credentials:true, origin:'http://localhost:4200'}));
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  next();
});
//pdf
const mongodb=require('mongodb')
const mongoClient = mongodb.MongoClient
const binary= mongodb.Binary

router.get("/acc", (req, res) => {
  res.sendFile('./index.html', { root: __dirname })
})

router.get("/download", (req, res) => {
  getFiles(res)
})

app.use(fileUpload())

var store = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null, './uploads/');
  },
  filename:function(req,file,cb){
      cb(null, file.originalname);
  }
});


 

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu',
});



const PORT =process.env.PORT||4000;
app.listen(PORT,()=>{
  console.log('connected to port'+PORT)
});
app.post("/sendmail",
 (req, res) => {
  console.log("request came");
let transporter = nodeMailer.createTransport({

service:'gmail',
auth: {
user: "pfetest2020@gmail.com",
pass: "enicarthage"}

});
let  mailOptions = {
  from: "pfetest2020@gmail.com",
  to: "marwa.bnsalah98@gmail.com",
  subject: "Testing",
  text: "Hello it's works!",
  html: "<b>Testing email function</b>"
  
  }});

app.use("/user", user);
app.use("/materiel",materiel);
app.use("/demande",demande);
app.use("/events", eventRoutes);
app.use("/salle",salle);
app.use("/send",memberemail);
app.use("/email",emails);
//app.use(app.router);
//materiel.initialize(app);

/*send email*/
app.post("/sendmails",
 (req, res) => {
  console.log("request came");
  let transporter = nodeMailer.createTransport({
  service:'gmail',
 
  auth: {
  user:"pfetest2020@gmail.com",
  pass:"enicarthage"}
  })
  let  mailOptions = {
  from:"pfetest2020@gmail.com",
  to:req.body.email,
  subject:"Acceptation  demande even",
  text:"La direction de l'enicarthage vous informe que votre demande pour l'evenement"+req.body.title+"sest accepté",

  }
  transporter.sendMail(mailOptions, function(error, response) {
  
  if(error) {
  return console.log(error);
  }else{
  console.log("Message sent");
  }
  transporter.close();
})});
