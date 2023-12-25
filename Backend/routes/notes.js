const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//Route 1 :  Get all the notes 
// /appi/notes/fetchallnotes  (LOGIN REQUIRED)
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        res.status(500).send("Some Error occured")
    }
})


//Route 2 : Add a new notes using post 
// /appi/notes/addnote  (LOGIN REQUIRED)
router.post('/addnote', fetchuser, [
    // Express validator to valid fields here only
    body('title', 'Enter a valid Name for title').isLength({ min: 3 }),
    body('description', 'Desc cannot be blank').isLength({ min: 5 }),
    body('tag', 'Enter a valid tag'),

], async (req, res) => {

    try {

        const { title, description, tag } = req.body
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ errors: result.array() });

        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.send(savedNote)
    } catch (error) {
        res.status(500).send(error)
        console.log(error);

    }
})


//Route 3 : To update a Note using  PUT

//  /appi/notes/updatenote  (LOGIN REQUIRED)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    // fetchuser is used to check wheter the user is logged  in or not 
    try {

        const { title, description, tag } = req.body
        // create newnote object
        const newnote = {}
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };


        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id) // (ye note ki id hai jisse note find krke note k anadar ka user find karenge)id jo params mese fetch karenge 
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() !== req.user.id) {  // note ka user dekha and fetchuser ka user dekha
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })// note ki idd se note find kiya and update kiya 
        // new true naya object ban jaega updated note ka 
        res.json(note)
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error occured")

    }
})


//Route 4: Delete a existiong using Delete

//  /appi/notes/deletenotes  (LOGIN REQUIRED)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

//req.params.id  is the id of notes not user

        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id) // (ye note ki id hai jisse note find krke note k anadar ka user find karenge)id jo params mese fetch karenge 
        if (!note) { return res.status(404).send("Not found") }
      
      //  note.user  wo user hai jisne note banaya hai
        //checking if user own the note
        if (note.user.toString() !== req.user.id) {  // note ka user dekha and fetchuser ka user dekha
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)// note ki idd se note find kiya and delete kiya 
        // new true naya object ban jaega updated note ka 
        res.json({"Succes" : "Note deleted succesfully" , note: note})
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error occured")

    }
})

module.exports = router