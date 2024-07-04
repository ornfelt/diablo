var db = require('./index.js');
var imports = require('./Build.js');
var BuildSchema = imports.BuildSchema;

var User = db.model('User',
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'User'
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    builds: [BuildSchema]
  }
);

module.exports = User;
