const verifySession = (req, res, next) => {
  if (req.session && req.session.userId) {
    req.user = { id: req.session.userId };
    next();
  } else {
    res.status(401).send("Access Denied: No active session");
  }
};

module.exports = verifySession;

