// App Modules
const express = require('express');
const bodyParser = require("body-parser");
// const requireLogin = require("./middlewares/requireLogin");

// Utilities
// require("dotenv").config();

// DB MODULES
// const mongoose = require('mongoose');

// SESSION MODULES
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

// MIDDLEWARES AND SERVICES
const passport = require("passport");

// REQUIRE LOCAL SERVICES
// Passport let's us login users with Google, Facebook, Email, Token, JWT etc...
// We need to set it up for authentication
require("./services/passport");

// Config file imports
const keys = require("./config/keys");

// CREATING THE EXPRESS APP.
const app = express();

// SETTING-UP MIDDLEWARES
// SETTING UP SESSION WITH EXPRESS-SESSION AND REDIS-CONNECT
function redisClient() {
  const redisConfig = require("./config/redis");
  // console.log("REDIS CONFIG ====>", redisConfig);

  if (!process.env.REDISTOGO_URL) {
    return redis.createClient(redisConfig);
  }

  const client = redis.createClient(redisConfig.port, redisConfig.hostname);
  client.auth(redisConfig.password);

  return client;
}

const sessionConfigObj = {
  store: new RedisStore({ client: redisClient() }),
  secret: keys.cookieKey,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 3600 * 1000 * 24 * 7 }
};

// For production we enable trust proxy for 1 hop
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionConfigObj.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionConfigObj));
// - Setting up body-parser so that express parses JSON params from the body of the request
app.use(bodyParser.json());

// PASSPORT SESSION SETUP: serialize and deserialize session data
app.use(passport.initialize());
app.use(passport.session());

// SETTING UP ROUTES
require("./routes/authRoutes")(app);
// require("./routes/apiRoutes")(app);

// app.get('/', requireLogin, (req, res) => {
//   console.log("User in session ====>", req.user);
//   res.send('Hello World from Heroku!');
// })


// This routes are needed for Apple Pay
// app.use(express.static("public"));
// app.get("/.well-known/apple-developer-merchantid-domain-association", (req, res) => {
//   let merchant = req.subdomains[req.subdomains.length - 1];

//   if (/staging/.test(req.hostname)) {
//     merchant = `staging-${merchant}`;
//   } else if (/speedetab.local/.test(req.hostname)) {
//     merchant = `local-${merchant}`;
//   } else {
//     // merchant = `production-${merchant}`;
//     merchant = "production";
//   }

//   res.sendFile(path.resolve(
//     __dirname, "public", ".well-known",
//     `${merchant}-apple-developer-merchantid-domain-association`
//   ));
// });

const path = require("path");

// SET UP APP SERVING IN PROD MODE
if ((process.env.NODE_ENV === "production") || (process.env.NODE_ENV === "test")) {
  // - Express will serve up production assets for the react client app (AKA the client Build)
  // - like main.js and main.css files from the client/build directory
  app.use(express.static("client/build"));

  // - Express will serve up the index.html file
  // - if it doesn't recognize the route being passed,
  // - react-router should take charge after initial page load
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`React 17 Scaffold App listening on PORT: ${PORT}`);
})