const router = require('express').Router()
const path = require('path')

// route to index.html
router.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/index.html"))

})

// route to notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/notes.html"))
})


module.exports = router