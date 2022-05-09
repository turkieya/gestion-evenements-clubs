const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
var email = require('express-mailer');
const demandeSchema = require("../models/demande.model");
/*send email*/
router.post("/sendmails",
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
  subject:"Acceptation demande événement",
  text:"La direction de l'EniCarthage vous informe que votre demande pour l'evenement "+req.body.title+" est accepté",

  }
  transporter.sendMail(mailOptions, function(error, response) {
  
  if(error) {
  return console.log(error);
  }else{
  console.log("Message sent");
  }
  transporter.close();
})});
router.post("/sendmail/annul_event",
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
  subject:"Annuler demande événement",
  text:"La direction de l'EniCarthage vous informe que votre demande pour l'evenement "+req.body.title+" est annulé",

  }
  transporter.sendMail(mailOptions, function(error, response) {
  
  if(error) {
  return console.log(error);
  }else{
  console.log("Message sent");
  }
  transporter.close();
})});

/* send email remove member*/
router.post("/sendmailmemberremove",
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
 subject:"Suppression de votre compte",
 text:"La direction de l'EniCarthage vous informe que votre compte a été supprimé. Bonne réception.  ",
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