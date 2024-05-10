const createproject = (server,db)=> {

    server.post('/project', async (req, res) => {
        const { name, description, startdate,enddate,link } = req.body;
    
        // Insert a new project
        try {
            const query = 'INSERT INTO project (name,description , startdate,enddate,link) VALUES ($1, $2, $3,$4,$5) RETURNING *';
            const result = await db.query(query, [name ,description,startdate,enddate,link]);
    
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error creating project:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}






const projectbyid = (server,db)=>{

    server.get('/project/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            const query = 'SELECT * FROM project WHERE id = $1';
            const result = await db.query(query, [id]);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'project not found' });
            } else {
                res.json(result.rows[0]);
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    
}

const getproject = (server,db)=>{

    server.get('/project/', async (req, res) => {
        
        try {
            const query = 'SELECT * FROM project';
            const result = await db.query(query);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'project not found' });
            } else {
                res.json(result.rows);
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }); 
}

module.exports={
    getproject,
    projectbyid,
    createproject
}