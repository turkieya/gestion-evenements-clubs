const express = require("express");

const router = express.Router();
  
const materielSchema = require("../models/materiel.model");
const { check, validationResult } = require('express-validator');
var mongoose=require('mongoose');
var ObjectId=require('mongoose').Types.ObjectId;

//ADD-MATERIEL
router.post("/add-materiel",
    [
        check('libelle')
            .not()
            .isEmpty()
            .withMessage('libelle must be atleast 3 characters long'),
        check('quantite')
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
            
                const materiel = new materielSchema({
                    _id:mongoose.Types.ObjectId(),
                    libelle: req.body.libelle,
                    quantite:req.body.quantite,
                    description:req.body.description
                });
                materiel.save().then((response) => {
                    res.status(201).json({
                        message: "materiel successfully created!",
                        result: response
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            
        }
        
    });
    //LISTE MATERIELS
router.route('/liste-materiels').get((req, res,next) => {
    materielSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})
//GET UN MATERIEL
router.route('/materiel-fiche/:id').get((req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}');
    materielSchema.findById(req.params.id,(error,doc)=>{
    if (error){console.log('Error in retriving member:'+JSON.stringify(error,undefined,2));}
    else {res.setHeader('Access-Control-Allow-Origin','*');
        res.send(doc);}
});
});
//EDIT MATERIEL
router.route('/edit-materiel/:id').put((req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('no record with given id: ${req.params.id}');
    var frm= new materielSchema({
        libelle: req.body.libelle,
        quantite:req.body.quantite,
        description:req.body.description
    })

    materielSchema.findByIdAndUpdate(req.params.id,{$set: frm},{new: true},(error,doc)=>{
    if (error){
    console.log('Error in Materiel Update:'+JSON.stringify(err,undefined,2))
}else {res.setHeader('Access-Control-Allow-Origin','*');
    res.send(doc)
console.log('Data updated suuccessfully');}})})

// DELETE MATERIEL
router.route('/delete-materiel/:id').delete((req, res, next) => {
    materielSchema.findByIdAndRemove(req.params.id, (error, data) => {
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