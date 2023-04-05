const express = require("express")
const PORT = 3001
const apiRoutes = require('./routes/api-routes.js')
const viewRoutes = require('./routes/view-routes.js')
const app = express()


app.use(express.static("public"))
app.use(express.json())
app.use('/', apiRoutes)
app.use('/', viewRoutes)


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
})




