module.exports = function (req, res, next) {
  if (req.session && req.session.userId) {
    req.user = {
      id: req.session.userId,
      ...req.session.user
    };
    return next();
  }

  return res.status(401).json({ msg: "Authentication required." });
};