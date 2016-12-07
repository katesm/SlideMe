var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Send back file
app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));
});



