const  express =require ('express');
const router = express.Router();
const Event = require("../models/event");
const eventSchema = require("../models/event");
var ObjectId=require('mongoose').Types.ObjectId;
var mongoose=require('mongoose');
/* Fetch all events */
const getEvents = async (req, res , next) => {
    eventSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
}


/* Create new event */
 const createEvent = async (req, res) => {
    const Event = new eventSchema({
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

/* Delete singile event */
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);

    await Event.findByIdAndRemove(id);

    res.json({ message: "Event deleted successfully." });
}
router.get('/get_events', getEvents);
router.post('/add_events', createEvent);
router.delete('/delete_event/:id', deleteEvent);
module.exports = router;
