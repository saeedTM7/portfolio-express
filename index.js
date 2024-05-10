const express = require("express");
const db = require('./db');
const server = express()

server.use(express.json());

const profileapi = require('./routes/profile')
const socialapi = require('./routes/socialmedia')
const verify = require('./middleware')
const blogapi = require ('./routes/blog')
const projectapi = require ('./routes/project')


blogapi.getblog(server,db)
blogapi.blogbyid(server,db)
blogapi.createblog(server,db)

projectapi.createproject(server,db)
projectapi.getproject(server,db)
projectapi.projectbyid(server,db)



profileapi.getprofile(server,db)
profileapi.createprofile(server,db)
profileapi.profilebyid(server,db)

socialapi.getsocial(server,db,verify.verifyToken)
socialapi.createsocial(server,db,verify.verifyToken)
socialapi.socialbyid(server,db,verify.verifyToken)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


