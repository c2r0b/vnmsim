var express = require('express'),
    app = express();
    path = require('path');

app.use(express.static(__dirname + '/build'));

var listener = app.listen(0);
console.log('Express server listening on port ' + listener.address().port);
