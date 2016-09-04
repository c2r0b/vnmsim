var express = require('express'),
    app = express();
    path = require('path');

app.use(express.static(__dirname + '/build'));

app.listen(3000);
console.log('Listening on port 3000');
