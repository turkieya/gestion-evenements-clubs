const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
var email = require('express-mailer');
const demandeSchema = require("../models/user.model");
/*send email info membre*/
router.post("/sendmailmember",
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
  subject:"Mot de passe de votre compte",
  text:"La direction de l'EniCarthage vous informe que vous êtes bien inscrit sur la plateforme.Pour vous connecter à votre nouveau compte votre mot de passe est "+req.body.password+" Bonne réception.  ",
  }
  transporter.sendMail(mailOptions, function(error, response) {
  
  if(error) {
  return console.log(error);
  }else{
  console.log("Message sent");
  }
  transporter.close();
})});


module.exports = router;