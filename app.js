var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Rates = require('./models/vatrates') 

mongoose.connect('mongodb+srv://alfre:asasas@cluster0-rkayj.mongodb.net/vatrates');

app.use(bodyParser.json());

var db = mongoose.connection;

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


app.listen(3000);
console.log('Starting');

