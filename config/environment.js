module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/startup-data',
  sessionSecret: process.env.SESSION_SECRET || 'shh it is a secret'
};
