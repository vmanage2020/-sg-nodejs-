
const States = require('../models/states.model.js');

// Create and Save a new Data
exports.create = (req, res) => {

    // Create a Data
    const state = new States({
        geopoint              : req.body.geopoint, 
        state_code            : req.body.state_code,
        name                  : req.body.name
    });

    // Save Data in the database
    state.save()
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
          
        
          States.find()
              .then(states => {
                  res.send(states);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

// Find a single Data with a DataId
exports.findOne = (req, res) => {
          
          States.findById(req.params.id)
    .then(states => {
        if(!states) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });            
        }
        res.send(states);
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
    States.findByIdAndUpdate(req.params.id, {
        geopoint              : req.body.geopoint, 
        state_code            : req.body.state_code,
        name                  : req.body.name
    }, {new: true})
    .then(states => {
        if(!states) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send(states);
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
          States.findByIdAndRemove(req.params.id)
    .then(states => {
        if(!states) {
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
