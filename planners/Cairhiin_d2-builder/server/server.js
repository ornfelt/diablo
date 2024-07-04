var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./routes/auth.js');
var cors = require('cors');

var app = express();
var port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', auth);

app.listen(port, () => console.log(`Listening now on port ${port}`));
