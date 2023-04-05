const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const dbPath = path.join(process.cwd(), "db/db.json")
const { v4: uuidv4 } = require('uuid')
const uniqueId = uuidv4()







// POST route to add a new note
router.post("/api/notes", (req, res) => {
    fs.readFile(path.join(process.cwd(), "db/db.json"), "utf8", (err, data) => {
        if (err) throw err
        const notes = JSON.parse(data)
        req.body.id = uniqueId
        notes.push(req.body)
        fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
            if (err) throw err
            res.json(notes)

        })
    })
})

// GET route to get all notes
router.get("/api/notes", (req, res) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) throw err
        const notes = JSON.parse(data)
        res.json(notes)
    })
})

// GET route to get a single note
router.get("/api/notes/:id", (req, res) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) throw err
        const notes = JSON.parse(data)
        const note = notes.find(note => note.id === req.params.id)
        res.json(note)
    })
})

// DELETE route to delete a note
router.delete("/api/notes/:id", (req, res) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) throw err
        const notes = JSON.parse(data)
        // store the id of the note to delete
        const noteId = req.params.id
        // find the index of the note to delete with the id
        const noteIndex = notes.findIndex(note => note.id === noteId)

        // if the note exists, delete it and write the new notes array to the db.json file
        if (noteIndex !== -1) {
            notes.splice(noteIndex, 1)
            fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
                if (err) throw err
                res.json(notes)
            })
        }
    })
})





module.exports = router