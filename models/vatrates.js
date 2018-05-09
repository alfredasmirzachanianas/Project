var mongoose = require('mongoose');

var vatSchema = mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    standard_rate:{
        type: Number,
        required: true
    },
    reduced_rate:{
      type: Number,
      required: true
    },
    reduced_rate_alt:{
      type: Number,
      required: true
    },
    super_reduced_rate:{
      type: Boolean,
      required: true
    },
    parking_rate:{
      type: Number,
      required: true
    },
    createDate:{
      type: Date
    },
    modifyDate:{
      type: Date
    },
},
    { versionKey: false }
);

var Rates = module.exports = mongoose.model('vatrates', vatSchema);

module.exports.getRates = function(callback, limit){
    Rates.find(callback).limit(limit);
}

module.exports.getRatesById = function(id, callback){
    Rates.findById(id, callback);
}

module.exports.addRates = function(rates, callback){
    Rates.create(rates, callback)
}

module.exports.updateRates= function(id, rates, options, callback){
    var query = {_id: id};
	  var update = {
		    country: rates.country,
		    standard_rate: rates.standard_rate,
		    reduced_rate: rates.reduced_rate,
		    reduced_rate_alt: rates.reduced_rate_alt,
        super_reduced_rate: rates.super_reduced_rate,
        parking_rate: rates.parking_rate,
		    createDate: rates.createDate,
		    modifyDate: rates.modifyDate
  	}

    Rates.findOneAndUpdate(query, update, options, callback)
}

module.exports.deleteRates= function(id, callback){
    var query = {_id: id};
    Rates.remove(query, callback)
}


