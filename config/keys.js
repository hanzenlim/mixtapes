// Figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // We are in production - Return the prod set of keys
  module.exports = require('./prod');
} else {
  // We are in development - Return the dev keys
  module.exports = require('./dev');
}
