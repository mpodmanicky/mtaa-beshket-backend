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

// CRUD USERS

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
app.patch('/users/:user_id', upload.array() , async (req, res) => {
   
    Object.keys(req.body).forEach(async(key) => {
        
        let query = `UPDATE users SET ${key} = $1 ;`;

        try{
            const result = await pool.query(query, [req.body[key]]);

            res.status(200).send({});
        } catch(error){
            res.status(400).send({});
            console.log(error);
        }
    });
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

// CRUD - events

// CREATE
app.post('/events/', upload.array(), async (req, res) => {
    let query = `   INSERT INTO events(name, interpret, place, date, price,  interpret_id, detail, iamges)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
                    RETURNING id;`
    try {
        const result = await pool.query(query, [req.body.name, req.body.interpret, req.body.place, req.body.date, req.body.price, req.body.interpret_id, req.body.detail, req.body.iamges]);
        
        res.status(201).send({
            "id": result.rows[0].id
        })
    } catch(error){
        res.status(400).send({});
        console.log(error);
    }
})

// READ
app.get('/events/:event_id', async (req, res) => {
    let query = 'SELECT * FROM events WHERE id = $1 ;';
    try {
        const result = await pool.query(query, [req.params.event_id]);

        res.status(200).send({
            'event': {
                "id": result.rows[0].id,
                "name": result.rows[0].name,
                "interpret": result.rows[0].interpret,
                "place": result.rows[0].place,
                "date": result.rows[0].date,
                "price": result.rows[0].price,
                "interpret_id": result.rows[0].interpret_id,
                "detail": result.rows[0].detail,
                "image": result.rows[0].iamges
            }
        })
    } catch(error){
        res.status(400).send({});
        console.log(error);
    }
})

// UPDATE
app.patch('/events/:event_id', upload.array() , async (req, res) => {
   
    Object.keys(req.body).forEach(async(key) => {
        
        let query = `UPDATE events SET ${key} = $1 ;`;

        try{
            const result = await pool.query(query, [req.body[key]]);

            res.status(200).send({});
        } catch(error){
            res.status(400).send({});
            console.log(error);
        }
    });

})

// DELETE 
app.delete('/events/:event_id', async (req, res) => {
    let query = 'DELETE FROM events WHERE id = $1 ;'

    try{
        const result = await pool.query(query, [req.params.event_id]);

        res.status(200).send({});
    } catch(error){
        res.status(400).send({});
        console.log(error);
    }
})

app.listen(3000, 'localhost', () => {
    console.log(`Application listen at port: 3000`)
})



