require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

app.get('/rovers/:nameOfRover', async (req, res) => {
    var param = req.params.nameOfRover
    var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${param}/photos?sol=1000&page=1&api_key=${process.env.API_KEY}`
    
    try {
        let data = await fetch(url)
            .then(res => res.json())
        res.send(data)
    } catch (err) {
        console.log('error:', err, param);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))