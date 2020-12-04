const Teammembers = require('../models/teammembers.model.js');

const logger = require('../../config/logger')
var cname = 'Team members';

var ObjectID = require('mongodb').ObjectID;


exports.create = (req, res) => {
    const teammembers = new Teammembers({
        team_id             : req.body.team_id,
        player              : req.body.player, 
        coach               : req.body.coach,
        manager             : req.body.manager,        
        created_datetime    : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });

    teammembers.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Data."
        });
    });
        
};

// Find a single Data with a DataId
exports.findByTeam = (req, res) => {
          
    if(logger.exitOnError == true){
        logger.log('info',`${cname} - Get by Id API service Request`)
        }

        var teamId = req.params.teamid
        Teammembers.find({ team_id: teamId})
    .then(teammembers => {
        if(!teammembers) {
            if(logger.exitOnError == true){
                logger.log('error',`${cname} - Get by Id API service Invalid Id entered`)
                }

            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });            
        }

        if(logger.exitOnError == true){
            logger.log('info',`${cname} - Get by Id API service Response`)
            }

        res.send(teammembers);
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

exports.delete = (req, res) => {

    if(logger.exitOnError == true){
        logger.log('info',`${cname} - Delete API service Request`)
        }

        Teammembers.findByIdAndRemove(req.params.id)
    .then(teammembers => {
        if(!teammembers) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }

        if(logger.exitOnError == true){
            logger.log('info',`${cname} - Delete API service Response`)
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
