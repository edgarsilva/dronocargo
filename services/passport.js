const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // User.findById(id)
  //   .then(user => {
  //     done(null, user);
  //   });
  done(null, user);
});

passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
  if (username !== "edgar@test.com") {
    return done("user not found");
  }
  // if (err) { return done(err); }
  // if (!user.verifyPassword(password)) { return done(null, false); }
  return done(null, { user: { id: 12, username: "edgarsilva@test.com" } });
}));

passport.use(new BearerStrategy((token, done) => {
  // User.findOne({ token: token }, function (err, user) {
  //   if (err) { return done(err); }
  //   if (!user) { return done(null, false); }
  //   return done(null, user, { scope: 'all' });
  // });
}));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwtSecret
};

passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
  console.log("JWT PAYLOAD:", jwtPayload);
  // if (err) { return done(err); }
  if (!jwtPayload.user) { return done(null, false); }

  return done(null, jwtPayload.user);
}));