var db = require('./index.js');
var mongoose = require('mongoose');

var BuildSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    unique: true
  },
  build: {
    type: String,
    required: true
  }
});

var Build = db.model('Build', BuildSchema);

module.exports = { BuildSchema, Build };
