const express = require('express');
const http = require('http');

const app = express();

//
const multer = require('multer');
const upload = multer();
const bodyParser = require('body-parser');

app.use(bodyParser.json());


// reading enviroment variables
const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, '.env')
})


// conection 
const {Pool} = require('pg');
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

async function db_connect() {
    const client = await pool.connect();
}

db_connect();

// CRUD - operations

// CREATE 
app.post('/users/', upload.array(), async (req, res) => {
    let query = `   INSERT INTO users(name, surname, email, password, birth_date)
                    VALUES($1, $2, $3, $4, $5) 
                    RETURNING id;`
    try {
        const result = await pool.query(query, [req.body.name, req.body.surname, req.body.email, req.body.password, req.body.birth_date]);
        
        res.status(201).send({
            "id": result.rows[0].id
        })
    } catch(error){
        res.status(400).send({});
        console.log(error);
    }

})


// READ
app.get('/users/:user_id', async (req, res) => {
    let query = 'SELECT * FROM users WHERE users.id = $1 ;';
    try {
        const result = await pool.query(query, [req.params.user_id]);

        res.status(200).send({
            'user': {
                "id": result.rows[0].id,
                "name": result.rows[0].name,
                "surname": result.rows[0].surname,
                "email": result.rows[0].email,
                "birth_date": result.rows[0].birth_date
            }
        })
    } catch(error){
        res.status(400).send({});
        console.log(error);
    }
})

// UPDATE
app.put('/users/:user_id', upload.array() , async (req, res) => {
   
    let query = 'UPDATE users SET name = $1, surname = $2, email = $3, password = $4, birth_date = $5  WHERE id = $6 ;';

    try{
        const result = await pool.query(query, [req.body.name, req.body.surname, req.body.email, req.body.password, req.body.birth_date, req.params.user_id]);

        res.status(200).send({});
    } catch(error){
        res.status(400).send({});
        console.log(error);
    }
})

// DELETE
app.delete('/users/:user_id', async (req, res) => {
    let query = 'DELETE FROM users WHERE id = $1 ;'

    try{
        const result = await pool.query(query, [req.params.user_id]);

        res.status(200).send({});
    } catch(error){
        res.status(400).send({});
        console.log(error);
    }
})

app.listen(3000, 'localhost', () => {
    console.log(`Application listen at port: 3000`)
})



