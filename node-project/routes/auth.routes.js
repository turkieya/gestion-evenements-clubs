const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/user.model");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');
var mongoose=require('mongoose')
var ObjectId=require('mongoose').Types.ObjectId;

global.user_france=0;
global.user_italie=0;
global.user_Tunisie=0;
global.user_Algérie=0;
global.user_Maroc=0;
global.user_Bahreine=0;
// register-user
router.post("/register-user",
    [ 
        check('username')
            .not()
            .isEmpty()
            .withMessage('username must be atleast 3 characters long'),
        check('numtel')
            .not()
            .isEmpty()
            .withMessage('Name must be atleast 3 characters long'),
    
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 6, max:100})
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new userSchema({
                    _id:mongoose.Types.ObjectId(),
                    username: req.body.username,
                    numtel:req.body.numtel,
                    email:req.body.email,
                    role:req.body.role,
                    password: hash
                });
                user.save().then((response) => {
                    res.status(201).json({
                        message: "User successfully created!",
                        result: response
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            });
        }
        
    });


// Sign-in
router.post("/signin", (req, res, next) => {
    let getUser;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            res.setHeader('Access-Control-Allow-Origin','*');
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            res.setHeader('Access-Control-Allow-Origin','*');
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.setHeader('Access-Control-Allow-Origin','*');
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser
        });
    }).catch(err => {
        res.setHeader('Access-Control-Allow-Origin','*');
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});

// Get Users
router.route('/').get((req, res,next) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single User
//router.route('/user-profile/:id').get((req, res, next) => {
    //userSchema.findById(req.params.id, (error, data) => {
       // if (error) {
          //  return next(error);
       // } else {
           // res.status(200).json({
               // msg: data
           // })
        //}
   // })
//})
router.route('/user-profile/:id').get((req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}');
    userSchema.findById(req.params.id,(error,doc)=>{
    if (error){console.log('Error in retriving member:'+JSON.stringify(error,undefined,2));}
    else {res.setHeader('Access-Control-Allow-Origin','*');
        res.send(doc);}
});
});
// Update User
//router.route('/update/:id').put((req, res, next) => {
  //  userSchema.findByIdAndUpdate(req.params.id, {
      //  $set: req.body
   // }, (error, data) => {
       // if (error) {
         //   return next(error);
           // console.log(error)
      //  } else {
         //   res.json(data)
           // console.log('User successfully updated!')
       // }
    //})
//})

router.route('/update/:id').put((req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('no record with given id: ${req.params.id}');
    var frm= new userSchema({
        username: req.body.username,
        numtel:req.body.numtel,
        email:req.body.email,
        role:req.body.role,
    password: req.body.password,
    })

    userSchema.findByIdAndUpdate(req.params.id,{$set: frm},{new: true},(error,doc)=>{
    if (error){
    console.log('Error in Formation Update:'+JSON.stringify(err,undefined,2))
}else {res.setHeader('Access-Control-Allow-Origin','*');
    res.send(doc)
console.log('Data updated suuccessfully');}})})
// Delete Use
router.route('/delete-user/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {

            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;