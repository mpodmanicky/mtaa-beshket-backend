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
    let query = `   INSERT INTO users(id, firstname, lastname, email, password, born_at, "isInterpret", created_at, updated_at)
                    VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5, $6, NOW(), NOW())
                    RETURNING id;`
    try {
        const result = await pool.query(query, [req.body.name, req.body.surname, req.body.email, req.body.password, req.body.birth_date, req.body.isInterpret]);
        
        res.status(201).send({
            "id": result.rows[0].id
        })
    } catch(error){ 
        res.status(400).send({'error': 'Not suitable data'});
        console.log(error);
    }
})


// READ
app.get('/users/:user_id', async (req, res) => {
    let query = "SELECT * FROM users WHERE id = $1 ;";
    try {
        const result = await pool.query(query, [req.params.user_id]);

        res.status(200).send({
            'user': {
                "id": result.rows[0].id,
                "name": result.rows[0].firstname,
                "surname": result.rows[0].lastname,
                "email": result.rows[0].email,
                "birth_date": result.rows[0].born_at
            }
        })
    } catch(error){
        res.status(400).send({"error": "No users with this id"});
        console.log(error);
    }
})

// UPDATE
app.patch('/users/:user_id', upload.array() , async (req, res) => {
   
    Object.keys(req.body).forEach(async(key) => {
        
        let query = `UPDATE users SET ${key} = $1 WHERE id = $2 ;`;

        try{
            const result = await pool.query(query, [req.body[key], req.params.user_id]);

            res.status(200).send({});
        } catch(error){
            res.status(400).send({"error": "No users with this id "});
            console.log(error);
        }
    });
})

// PUT 
app.put('/users/:user_id', upload.array(), async (req, res) => {
    let query = 'UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4, born_at = $5, "isInterpret" = $6, image_id = $7 WHERE id = $8 ;';

    try{
        const result = await pool.query(query, [req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.born_at, req.body.isInterpret, req.body.image_id, req.params.user_id]);

        res.status(200).send({});
    } catch(error){
        res.status(400).send({"error": "No users with this id "});
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
        res.status(400).send({error: "No users with such id"});
        console.log(error);
    }
})

// CRUD - events

// CREATE
app.post('/events/', upload.array(), async (req, res) => {
    let query = `   INSERT INTO events(id, name, interpret_id, place, date, price, detail, image_id, created_at, updated_at)
                    VALUES(uuid_generate_v4() ,$1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
                    RETURNING id;`
    try {
        const result = await pool.query(query, [req.body.name, req.body.interpret_id, req.body.place, req.body.date, req.body.price, req.body.detail, req.body.image_id]);
        
        res.status(201).send({
            "id": result.rows[0].id
        })
    } catch(error){
        res.status(400).send({error: "Bad request"});
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
                "place": result.rows[0].place,
                "date": result.rows[0].date,
                "price": result.rows[0].price,
                "interpret_id": result.rows[0].interpret_id,
                "detail": result.rows[0].detail,
                "image_id": result.rows[0].image_id
            }
        })
    } catch(error){
        res.status(400).send({"error": "No event with this id"});
        console.log(error);
    }
})

// UPDATE
app.patch('/events/:event_id', upload.array() , async (req, res) => {
   
    Object.keys(req.body).forEach(async(key) => {
        
        let query = `UPDATE events SET ${key} = $1 WHERE id = $2;`;

        try{
            const result = await pool.query(query, [req.body[key], req.params.event_id]);

            res.status(200).send({});
        } catch(error){
            res.status(400).send({"error": "Bad parameters"});
            console.log(error);
        }
    });

})


// PUT
app.put('/events/:event_id', upload.array(), async (req, res) => {
    let query = 'UPDATE events SET name = $1, interpret_id = $2, place = $3, date = $4, price = $5, detail = $6, image_id = $7 WHERE id = $8 ;';

    try{
        const result = await pool.query(query, [req.body.name, req.body.interpret_id, req.body.place, req.body.date, req.body.price, req.body.date, req.body.image_id, req.params.event_id]);

        res.status(200).send({});
    } catch(error){
        res.status(400).send({"error": "No users with this id "});
        console.log(error);
    }
})

// DELETE 
app.delete('/events/:event_id', async (req, res) => {
    let query = 'DELETE FROM events WHERE id = $1 ;'

    try{
        const result = await pool.query(query, [req.params.event_id]);

        res.status(200).send({});
    } catch(error){
        res.status(400).send({"error": "No user with such id"});
        console.log(error);
    }
})


//SEARCH 
app.get('/events', async (req, res) => {
    let query = 'SELECT * FROM events WHERE LOWER(name) LIKE LOWER($1) OR LOWER(detail) LIKE LOWER($1) ;';

    req.query.keyPhrase = `%${req.query.keyPhrase}%`;
    try{
        const result = await pool.query(query, [req.query.keyPhrase]);

        let events = [];

        result.rows.forEach( row => {
            let event = {};
            event["id"] = result.rows[0].id;
            event["name"] = result.rows[0].name;
            event["place"]= result.rows[0].place;
            event["date"] = result.rows[0].date;
            event["price"] = result.rows[0].price;
            event["interpret_id"] = result.rows[0].interpret_id;
            event["detail"]= result.rows[0].detail;
            event["image_id"] = result.rows[0].image_id;
            events.push(event);
        })
        res.status(200).send({events: events});
    } catch(error){
        res.status(400).send({"error": "Bad request"});
        console.log(error);
    }
})

// MESSAGES

// CREATE
app.post('/messages/', upload.array(), async (req, res) => {
    let query = `   INSERT INTO messages(id, owner_id, chat_id, "text", created_at, updated_at)
                    VALUES(uuid_generate_v4(), $1, $2, $3, NOW(), NOW() )
                    RETURNING id;`
    try {
        const result = await pool.query(query, [req.body.owner_id, req.body.chat_id, req.body.text]);
        
        res.status(201).send({
            "id": result.rows[0].id
        })
    } catch(error){
        res.status(400).send({error: "Bad request"});
        console.log(error);
    }
})

app.get('/messages/:message_id', async (req, res) => {
    let query = `SELECT * FROM messages WHERE id = $1`;

    try {
        const result = await pool.query(query, [req.params.message_id]);

        res.status(200).send({
            'message': {
                "id": result.rows[0].id,
                "owner_id": result.rows[0].owner_id,
                "chat_id": result.rows[0].chat_id,
                "text": result.rows[0].text
            }
        })
    } catch(error){
        res.status(400).send({"error": "No event with this id"});
        console.log(error);
    }
})

app.delete('/messages/:message_id', async (req, res) => {
    let query = 'DELETE FROM messages WHERE id = $1 ;'

    try{
        const result = await pool.query(query, [req.params.message_id]);

        res.status(200).send({});
    } catch(error){
        res.status(400).send({"error": "No user with such id"});
        console.log(error);
    }
})

app.listen(3000, 'localhost', () => {
    console.log(`Application listen at port: 3000`)
})
