// require and represent express

var express = require('express');
var app = express();

var port = process.env.PORT;


//Get config file for connection to mongod
var config = require('./config')


//Allows concatenation of paths
var path = require('path');


//Connect mongoose to mongodb 
var mongoose = require('mongoose');

//mongoose.connect('mongodb://'+config.db.host+'/'+config.db.name);


//Allows for uploading of files in express
var multer = require('multer');

var upload = multer({dest: './upload'});



// Deal with favicon request

app.get('/favicon.ico', function(request, response){
    
    response.writeHead(200,{'Content-Type': 'image/x-icon'});
    response.end;
    return;
    
});



//route to serve index.html

app.get('/', function (request, response){
    
    response.sendFile(path.join(__dirname + '/index.html'));
    console.log('File sent:', path.join(__dirname + '/index.html'));
    
});



// use of multer dependancy
app.post('/', upload.single('a_file'), function(request, response){
    
    console.log(request.file.size);
    response.json({
      'filename': request.file.originalname,
      'size': request.file.size,
    });
	  response.status(204).end();
    
});




var server = app.listen(port, function(){console.log('Listening on port:', port)});