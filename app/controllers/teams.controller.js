
const Teams = require('../models/teams.model.js');

// Create and Save a new Data
exports.create = (req, res) => {

    
    // Create a Data
    const teams = new Teams({
        is_completed                      : req.body.is_completed, 
        season_id                         : req.body.season_id,
        managers_count                    : req.body.managers_count,
        level_name                        : req.body.level_name,
        players_count                     : req.body.players_count,
        sport_name                        : req.body.sport_name,
        season_start_date                 : req.body.season_start_date,
        organization_id                   : req.body.organization_id,        
        season_end_date                   : req.body.season_end_date,
        isMaster                          : req.body.isMaster,
        season_lable                      : req.body.season_lable,
        coaches_count                     : req.body.coaches_count,
        sport_id                          : req.body.sport_id,
        level                             : req.body.level,
        team_name                         : req.body.team_name,
        team_id                           : req.body.team_id,
        level_id                          : req.body.level_id,
        isActive                          : req.body.isActive,
        organization_name                 : req.body.organization_name,
        created_uid                       : req.body.created_uid,
        updated_uid                       : req.body.updated_uid,
        created_datetime                  : req.body.created_datetime,
        updated_datetime                  : req.body.updated_datetime
    });


    
    // Save Data in the database
    teams.save()
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
        
          Teams.find()
              .then(teams => { 
                  res.send(teams);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

// Find a single Data with a DataId
exports.findOne = (req, res) => {
         
          Teams.findById(req.params.id)
    .then(teams => {
        if(!teams) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });            
        }
        res.send(teams);
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
    Teams.findByIdAndUpdate(req.params.id, {
        is_completed                      : req.body.is_completed, 
        season_id                         : req.body.season_id,
        managers_count                    : req.body.managers_count,
        level_name                        : req.body.level_name,
        players_count                     : req.body.players_count,
        sport_name                        : req.body.sport_name,
        season_start_date                 : req.body.season_start_date,
        organization_id                   : req.body.organization_id,        
        season_end_date                   : req.body.season_end_date,
        isMaster                          : req.body.isMaster,
        season_lable                      : req.body.season_lable,
        coaches_count                     : req.body.coaches_count,
        sport_id                          : req.body.sport_id,
        level                             : req.body.level,
        team_name                         : req.body.team_name,
        team_id                           : req.body.team_id,
        level_id                          : req.body.level_id,
        isActive                          : req.body.isActive,
        organization_name                 : req.body.organization_name,
        updated_uid                       : req.body.updated_uid,
        updated_datetime                  : req.body.updated_datetime
    }, {new: true})
    .then(teams => {
        if(!teams) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send(teams);
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
          Teams.findByIdAndRemove(req.params.id)
    .then(teams => {
        if(!teams) {
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
