module.exports = (req, res, next) => {
  // if (!req.user || !req.user.token) {
  if (!req.user) {
    return res.status(401).send({
      error: { type: "login_required" , message: "You must log in to perform that action!" },
      session_expired: true
    });
  }

  next();
};