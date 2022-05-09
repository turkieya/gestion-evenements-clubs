const express = require("express");

const router = express.Router();
const SalleSchema = require("../models/salle.model");
const { check, validationResult } = require('express-validator');
var mongoose=require('mongoose');
var ObjectId=require('mongoose').Types.ObjectId;

//ADD-SALLE
router.post("/add-salle",
    [
        check('num')
            .not()
            .isEmpty(),
        check('locale')
            .not()
            .isEmpty(),
        check('description')
            .not()
            .isEmpty()
            
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            
                const salle = new SalleSchema({
                    _id:mongoose.Types.ObjectId(),
                    num: req.body.num,
                    locale: req.body.locale,
                    description:req.body.description
                });
                salle.save().then((response) => {
                    res.status(201).json({
                        message: "salle successfully created!",
                        result: response
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            
        }
        
    });
    //LISTE SALLES
router.route('/liste-salles').get((req, res,next) => {
    SalleSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})
//GET UNE SALLE
router.route('/salle-detailles/:id').get((req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}');
    SalleSchema.findById(req.params.id,(error,doc)=>{
    if (error){console.log('Error in retriving member:'+JSON.stringify(error,undefined,2));}
    else {res.setHeader('Access-Control-Allow-Origin','*');
        res.send(doc);}
});
});
//EDIT SALLE
router.route('/edit-salle/:id').put((req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('no record with given id: ${req.params.id}');
    var frm= new SalleSchema({
        num: req.body.num,
        locale: req.body.locale,
        description:req.body.description
    })

    SalleSchema.findByIdAndUpdate(req.params.id,{$set: frm},{new: true},(error,doc)=>{
    if (error){
    console.log('Error in Salle Update:'+JSON.stringify(err,undefined,2))
}else {res.setHeader('Access-Control-Allow-Origin','*');
    res.send(doc)
console.log('Data updated suuccessfully');}})})

// DELETE SALLE
router.route('/delete-salle/:id').delete((req, res, next) => {
    SalleSchema.findByIdAndRemove(req.params.id, (error, data) => {
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