

const createblog = (server,db)=> {

    server.post('/blog', async (req, res) => {
        const { title, description, image } = req.body;
    
        // Insert a new blog
        try {
            const query = 'INSERT INTO blog (title,description , image) VALUES ($1, $2, $3) RETURNING *';
            const result = await db.query(query, [title ,description,image]);
    
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error creating profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}






const blogbyid = (server,db)=>{

    server.get('/blog/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            const query = 'SELECT * FROM blog WHERE id = $1';
            const result = await db.query(query, [id]);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'blog not found' });
            } else {
                res.json(result.rows[0]);
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    
}

const getblog = (server,db)=>{

    server.get('/blog/', async (req, res) => {
        
        try {
            const query = 'SELECT * FROM blog';
            const result = await db.query(query);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'blog not found' });
            } else {
                res.json(result.rows);
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }); 
}

module.exports={
    getblog,
    blogbyid,
    createblog
}