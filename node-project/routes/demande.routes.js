const express = require("express");
const router = express.Router();
const demandeSchema = require("../models/demande.model");
const { check, validationResult } = require('express-validator');
var mongoose=require('mongoose');
var ObjectId=require('mongoose').Types.ObjectId;

//ADD-DEMANDE
const createEvent = async (req, res) => {
    const Event = new demandeSchema({
        _id:mongoose.Types.ObjectId(),
        title: req.body.title,
        date: req.body.date,
        debut:req.body.debut,
        fin:req.body.fin,
        salle:req.body.salle,
        materiels:req.body.materiels,
        qtemat:req.body.qtemat,
        nom_club:req.body.nom_club,
        etat:req.body.etat,
        email:req.body.email,
    })

    try {
        await Event.save();
        res.status(201).json(
            {
                type: "success",
                message: "Event has been added successfully"
            }
        );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

    //LISTE DEMANDES
router.route('/liste-demandes').get((req, res,next) => {
    demandeSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})
//GET UNE DEMANDE 
router.route('/demande/:id').get((req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}');
    demandeSchema.findById(req.params.id,(error,doc)=>{
    if (error){console.log('Error in retriving member:'+JSON.stringify(error,undefined,2));}
    else {res.setHeader('Access-Control-Allow-Origin','*');
        res.send(doc);}
});
});
//EDIT DEMANDE
router.route('/edit-demande/:id').put((req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('no record with given id: ${req.params.id}');
    var frm= new demandeSchema({
                    title:req.body.title,
                    date: req.body.date,
                    nom_club: req.body.nom_club,
                    debut:req.body.debut,
                    fin:req.body.fin,
                    salle:req.body.salle,
                    materiels:req.body.materiels,
                    qtemat:req.body.qtemat,
                    etat : req.body.etat ,
                    email: req.body.email,
    })

    demandeSchema.findByIdAndUpdate(req.params.id,{$set: frm},{new: true},(error,doc)=>{
    if (error){
    console.log('Error in demand Update:'+JSON.stringify(err,undefined,2))
}else {res.setHeader('Access-Control-Allow-Origin','*');
    res.send(doc)
console.log('Data updated suuccessfully');}})})

// DELETE DEMANDE
router.route('/delete-demande/:id').delete((req, res, next) => {
    demandeSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {

            res.status(200).json({
                msg: data
            })
        }
    })
})
router.post('/add-demande', createEvent);


    module.exports = router;