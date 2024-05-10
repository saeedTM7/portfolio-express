// const db = require("../db");

const { verify } = require("jsonwebtoken");


const createsocial = (server,db,verify)=> {

    server.post('/socialmedia',verify, async (req, res) => {
        const { name, link, picture } = req.body;
    
        // Insert a new profile
        try {
            const query = 'INSERT INTO socialmedia1 (name, link, picture) VALUES ($1, $2, $3) RETURNING *';
            const result = await db.query(query, [name, link, picture]);
    
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error creating socialmedia1:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

const socialbyid = (server,db,verify)=>{
    server.get('/socialmedia/:id',verify, async (req, res) => {

        const { id } = req.params;
    
        try {
            const query = 'SELECT * FROM socialmedia1 WHERE id = $1';
            const result = await db.query(query, [id]);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'socialmedia1 not found' });
            } else {
                res.json(result.rows[0]);
            }
        } catch (error) {
            console.error('Error fetching socialmedia1:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    
}

const getsocial = (server,db,verify)=>{

    server.get('/socialmedia/',verify, async (req, res) => {

        try {
            const query = 'SELECT * FROM socialmedia1';
            const result = await db.query(query);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'socialmedia1 not found' });
            } else {
                res.json(result.rows);
            }
        } catch (error) {
            console.error('Error fetching socialmedia1:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
module.exports={
  getsocial,
  createsocial,
  socialbyid,
}