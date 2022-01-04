// keys.js figures out what set of keys to use
if (process.env.NODE_ENV === "production") {
  // We are in prod
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "test") {
  module.exports = require("./test");
} else {
  // We are in dev
  module.exports = require("./dev");
}