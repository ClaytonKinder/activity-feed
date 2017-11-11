var express=require('express');
var path = require('path');
var app=express();
var serveStatic = require('serve-static');

// Allow access to static data
app.use(serveStatic(__dirname + "/frontend/dist"));

// Redirect any other routes back to the index page
app.get('*', function(req, res){
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express Started!");
});
