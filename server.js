var express=require('express');
var path = require('path');
var app=express();
// Allow access to static data
app.use('/frontend', express.static('frontend'))
app.use('/data', express.static('frontend/data'))
app.use('/assets', express.static('frontend/assets'))

// Use index page as default route
app.get('/', function(req,res) {
  res.sendFile('/frontend/dist/index.html');
});

// Redirect any other routes back to the index page
app.get('*', function(req, res){
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express Started!");
});
