const jwt = require('jsonwebtoken');
const passport = require('passport');
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");

module.exports = (app) => {
  app.post('/auth/sign-in', passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user });
  });

  // app.post('/auth/jwt', (req, res) => {
  //   jwt.sign({ foo: 'bar', user: { id: 12, email: "testuser" } }, keys.jwtSecret, { algorithm: 'HS512' }, (err, token) => {
  //     res.json({ error: err, Authorization: `Bearer ${token}`});
  //   });
  // });

  app.delete("/auth/sign-out", requireLogin, (req, res) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        res.json({errors: [{ message: "session destroyed with errors!" }]});
      }

      res.json({message: "session terminated!"});
    });
  });

  app.get('/auth/fetch-user', requireLogin, (req, res) => {
    console.log("req.user =>", req.user);
    res.json({ status: "Authenticated!", user: req.user });
  });
};