
const Levels = require('../models/levels.model.js');

const logger = require('../../config/logger')
var cname = 'Levels';

var ObjectID = require('mongodb').ObjectID;

function checkAlreadyExists(id,sportId,name, orgId)
    {
            if( id != null)
            {
                _id = new ObjectID(id);
                var inputjson = {_id: {$ne: _id }, "sport_id":sportId, "level_name": name, "organization_id": orgId}
            }else{
                var inputjson = {"sport_id":sportId, "level_name": name, "organization_id": orgId}
            }

           return Levels.find(inputjson).then(function(result){
                //console.log('----result----', result)
                //return result !== null;
                if( result.length==0)
                {
                   return true
                }else{
                    return false;
                }
           });
    }

// Create and Save a new Data
exports.create = (req, res) => {
    if(logger.exitOnError == true){
        logger.log('info',`${cname} - create API service Request enter`)
        }
    //validation
    if(!req.body.sport_id) {
        return res.status(400).send({
            message: "Sport Id can not be empty"
        });
    }
    if(!req.body.sport_name) {
        return res.status(400).send({
            message: "Sportname can not be empty"
        });
    }
    if(!req.body.level_name) {
        return res.status(400).send({
            message: "Level can not be empty"
        });
    }
    if(!req.body.abbreviation) {
        return res.status(400).send({
            message: "Appreviation can not be empty"
        });
    }
    // Create a Data
    const levels = new Levels({
        level_name              : req.body.level_name, 
        abbreviation            : req.body.abbreviation,
        description             : req.body.description,
        organization_id         : req.body.organization_id,
        sport_id                : req.body.sport_id,
        sport_name              : req.body.sport_name,
        is_active               : req.body.is_active,
        is_deleted              : req.body.is_deleted,
        created_uid             : req.body.created_uid,
        updated_uid             : req.body.updated_uid,
        created_datetime        : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });

    checkAlreadyExists(null,req.body.sport_id, req.body.level_name, req.body.organization_id).then( valid =>  {

        if( valid == false)
        {
            if(logger.exitOnError == true){
                logger.log('error',`${cname} - create API service Request Duplicate data entered`)
                }
            res.status(400).send({
                status: 400,
                message: "Already Inserted same data. please check it"
            });
        }else{
            if(logger.exitOnError == true){
                logger.log('info',`${cname} - create DB request`)
                }
                 // Save Data in the database
                levels.save()
                .then(data => {
                    if(logger.exitOnError == true){
                        logger.log('info',`${cname} - create DB response`)
                        }
                        if( data._id ){
                                var json = {
                                        level_name              : req.body.level_name, 
                                        abbreviation            : req.body.abbreviation,
                                        description             : req.body.description,
                                        organization_id         : req.body.organization_id,
                                        sport_id                : req.body.sport_id,
                                        sport_name              : req.body.sport_name,
                                        level_id                : data._id,
                                        is_active               : req.body.is_active,
                                        is_deleted              : req.body.is_deleted,
                                        created_uid             : req.body.created_uid,
                                        updated_uid             : req.body.updated_uid,
                                        created_datetime        : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                                }
                                
                                Levels.findByIdAndUpdate(data._id, json, {new: true}, function (err, place) {
                                    if(logger.exitOnError == true){
                                        logger.log('info',`${cname} - create API Service response`)
                                        }
                                res.send(place);
                                });
                                
                        }
                    //res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Data."
                    });
                });
        }
    })
    
    
};

// Retrieve and return all Data from the database.
exports.findAll = (req, res) => {
          
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All API Service Request`)   
    }
          Levels.find()
              .then(levels => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All API Service Response`)   
                }
                  res.send(levels);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};


exports.findbyOrgAll = (req, res) => {
    
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All by Organization Id API Service Request`)   
    }

	var orgId = req.params.id
	Levels.find({organization_id: orgId})
              .then(levels => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Organization Id API Service Response`)   
                }
                  res.send(levels);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
	
};

// Find a single Data with a DataId
exports.findOne = (req, res) => {
          
    if(logger.exitOnError == true){
        logger.log('info',`${cname} - Get by Id API service Request`)
        }

          Levels.findById(req.params.id)
    .then(levels => {
        if(!levels) {
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

        res.send(levels);
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
    if(logger.exitOnError == true){
        logger.log('info',`${cname} - update API service Request enter`)
        }
    //validation
    if(!req.body.sport_id) {
        return res.status(400).send({
            message: "Sport Id can not be empty"
        });
    }
    if(!req.body.sport_name) {
        return res.status(400).send({
            message: "Sportname can not be empty"
        });
    }
    if(!req.body.level_name) {
        return res.status(400).send({
            message: "Level can not be empty"
        });
    }
    if(!req.body.abbreviation) {
        return res.status(400).send({
            message: "Appreviation can not be empty"
        });
    }

    checkAlreadyExists(req.params.id,req.body.sport_id, req.body.level_name, req.body.organization_id).then( valid =>  {
        
        if( valid == false)
        {
            if(logger.exitOnError == true){
                logger.log('error',`${cname} - update API service Request Duplicate data entered`)
                }
            res.status(400).send({
                status: 400,
                message: "Already Inserted same data. please check it"
            });
        }else{

            // Find Data and update it with the request body
            Levels.findByIdAndUpdate(req.params.id, {
                level_name              : req.body.level_name, 
                abbreviation            : req.body.abbreviation,
                description             : req.body.description,
                organization_id         : req.body.organization_id,
                sport_id                : req.body.sport_id,
                sport_name              : req.body.sport_name,
                is_active               : req.body.is_active,
                is_deleted              : req.body.is_deleted,        
                updated_uid             : req.body.updated_uid,
                updated_datetime        : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
            }, {new: true})
            .then(levels => {
                if(!levels) {

                    if(logger.exitOnError == true){
                        logger.log('error',`${cname} - update API service Invalid Request Id entered`)
                        }

                    return res.status(404).send({
                        message: "Data not found with id " + req.params.id
                    });
                }

                if(logger.exitOnError == true){
                    logger.log('info',`${cname} - update API service Response`)
                    }

                res.send(levels);
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
        }
    })
    
};

// Delete a Data with the specified dataId in the request
exports.delete = (req, res) => {

    if(logger.exitOnError == true){
        logger.log('info',`${cname} - Delete API service Request`)
        }

          Levels.findByIdAndRemove(req.params.id)
    .then(levels => {
        if(!levels) {
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
