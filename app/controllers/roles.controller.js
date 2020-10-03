
const Roles = require('../models/roles.model.js');

// Create and Save a new Data
exports.create = (req, res) => {

    // Create a Data
    const role = new Roles({
        name              : req.body.name, 
        role_id           : req.body.role_id,
    });

    // Save Data in the database
    role.save()
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
          
        
          Roles.find()
              .then(roles => {
                  res.send(roles);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

// Find a single Data with a DataId
exports.findbyrole = (req, res) => {
          
    Roles.find({role_id: req.params.id})
.then(roles => {
  if(!roles) {
      return res.status(404).send({
          message: "Data not found with id " + req.params.id
      });            
  }
  res.send(roles);
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

// Find a single Data with a DataId
exports.findOne = (req, res) => {
          
          Roles.findById(req.params.id)
    .then(roles => {
        if(!roles) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });            
        }
        res.send(roles);
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
    Roles.findByIdAndUpdate(req.params.id, {
        name              : req.body.name, 
        role_id           : req.body.role_id,
    }, {new: true})
    .then(roles => {
        if(!roles) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send(roles);
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
          Roles.findByIdAndRemove(req.params.id)
    .then(roles => {
        if(!roles) {
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
