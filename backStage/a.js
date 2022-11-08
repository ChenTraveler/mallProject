const express = require('express')
const app = express()
const port = 3001


app.get('/a', (req, res) => res.send({ status: 200 }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))