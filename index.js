var express = require('express');
var app = express();
var request = require('request')
var cors = require('cors')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});


app.use(cors())

app.get('/checklanguage', function(req, res){
  var query = req.param('q')
  console.log(query);
  request.get("http://ws.detectlanguage.com/0.2/detect?q="+encodeURIComponent(query)+"&key="+process.env.DETECTLANGUAGE_API_KEY, function(error, response, body){
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
  })
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


