const jwt = require('jsonwebtoken');

const secretKey ='6009885e0fafc1a72f6b686055313b00e9ce620d03f3ac56e7a672e32f0a47bf'
// console.log(secretKey)
// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('No token provided.');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    // console.log(token)
    // console.log(secretKey)
    if (err) {
      return res.status(401).send('Failed to authenticate token.');
    }
    req.userId = decoded.id;
    next();
  });
}

const token = jwt.sign({ id: 1 }, secretKey, { expiresIn: 3600 });

console.log(token)


module.exports={
    verifyToken
}