const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Access Denied');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = verifyToken;
