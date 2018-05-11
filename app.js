var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Rates = require('./models/vatrates') 

mongoose.connect('mongodb+srv://alfre:asasas@cluster0-rkayj.mongodb.net/vatrates');

app.use(bodyParser.json());

var db = mongoose.connection;

var server = app.listen(process.env.PORT | 80, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
});

app.get('/', function(req,res){
    res.send('[Please use /api/vat or /api/]');
});

app.get('/api/vatrates', function(req, res){
    Rates.getRates(function(err, rates){
        if(err){
            throw err;
            res.status(500).end();
        }
        res.json(rates);
    });
});

app.get('/api/vatrates/:_id', function(req, res){
     Rates.getRatesById(req.params._id, function(err, rates){
        if(err){
            throw err;
            res.status(500).end();
        }
      res.json(rates);
  });
});

app.post('/api/vatrates', function (req, res){
	    var rates = req.body;
	    Rates.addRates(rates, function (err, rates){
		      if(err){
              throw err;
              res.status(500).end();
		    }
		    res.json(rates);
	});
});

app.put('/api/vatrates/:_id', function (req, res){
      var id = req.params._id;
      var rates = req.body;
        Rates.updateRates(id, rates, {}, function (err, rates){
          if(err){
            throw err;
            res.status(500).end();
    }
    res.json(rates);
  });
});

app.delete('/api/vatrates/:_id', function (req, res){
      var id = req.params._id;
      Rates.deleteRates(id, function (err, rates){
      if(err){
          throw err;
          res.status(500).end();
    }
    res.json(rates);
  });
});


//app.listen(3000);
console.log('Starting');

