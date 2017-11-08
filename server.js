var express=require('express');
var path = require('path');
var app=express();

app.use('/frontend', express.static('frontend'))

app.get('/',function(req,res){
  res.sendFile(__dirname + '/frontend/dist/index.html');
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express Started!");
});