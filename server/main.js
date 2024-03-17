const express= require('express')
const http = require('http')

const app = express()

app.get('/test', (req, res) => {
    res.json( { ans: 'test of API functions' } );
})

app.listen(3000, 'localhost', () => {
    console.log(`Application listen at port: 3000`)
})
