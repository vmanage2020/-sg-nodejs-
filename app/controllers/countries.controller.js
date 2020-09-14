
const Countries = require('../models/countries.model.js');

// Create and Save a new Data
exports.create = (req, res) => {

    // Create a Data
    const country = new Countries({
        country_code  : req.body.country_code, 
        name          : req.body.name,
        dial_code     : req.body.dial_code
    });

    // Save Data in the database
    country.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Data."
        });
    });
    
};

// Retrieve and return all Data from the database.
exports.findAll = (req, res) => {
          
        
          Countries.find()
              .then(country => {
                  res.send(country);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

// Find a single Data with a DataId
exports.findOne = (req, res) => {
          
          Countries.findById(req.params.id)
    .then(country => {
        if(!country) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });            
        }
        res.send(country);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving with id " + req.params.id
        });
    });
    
};

// Update a Data identified by the DataId in the request
exports.update = (req, res) => {

    // Find Data and update it with the request body
    Countries.findByIdAndUpdate(req.params.id, {
        country_code  : req.body.country_code, 
        name          : req.body.name,
        dial_code     : req.body.dial_code
    }, {new: true})
    .then(country => {
        if(!country) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send(country);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating with id " + req.params.id
        });
    });
    
};

// Delete a Data with the specified dataId in the request
exports.delete = (req, res) => {
          Countries.findByIdAndRemove(req.params.id)
    .then(country => {
        if(!country) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send({message: "Data deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete with id " + req.params.id
        });
    });
};
