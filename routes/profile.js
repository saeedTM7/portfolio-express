
// const db = require("../db");

const createprofile = (server,db)=> {

    server.post('/profiles', async (req, res) => {
        const { name, link, picture } = req.body;
    
        // Insert a new profile
        try {
            const query = 'INSERT INTO profile (name, email, picture) VALUES ($1, $2, $3) RETURNING *';
            const result = await db.query(query, [name, email, picture]);
    
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error creating profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}



const profilebyid = (server,db)=>{

    server.get('/profiles/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            const query = 'SELECT * FROM profile WHERE id = $1';
            const result = await db.query(query, [id]);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'Profile not found' });
            } else {
                res.json(result.rows[0]);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    
}

const getprofile = (server,db)=>{

    server.get('/profiles/', async (req, res) => {
        
        try {
            const query = 'SELECT * FROM profile';
            const result = await db.query(query);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'Profile not found' });
            } else {
                res.json(result.rows);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }); 
}

module.exports={
    getprofile,
    profilebyid,
    createprofile
}