
const Positions = require('../models/positions.model.js');

const logger = require('../../config/logger')
var cname = 'Position';
var ObjectID = require('mongodb').ObjectID;

function checkAlreadyExists(id,sportId,name)
    {
            if( id != null)
            {
                _id = new ObjectID(id);
                var inputjson = {_id: {$ne: _id }, "sport_id":sportId, "position_name": name}
            }else{
                var inputjson = {"sport_id":sportId, "position_name": name}
            }

           return Positions.find(inputjson).then(function(result){
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
            message: "Sportsname can not be empty"
        });
    }
    if(!req.body.name) {
        return res.status(400).send({
            message: "Positionname can not be empty"
        });
    }
    if(!req.body.position_name) {
        return res.status(400).send({
            message: "Positionname can not be empty"
        });
    }
    if(!req.body.abbreviation) {
        return res.status(400).send({
            message: "Appreviation can not be empty"
        });
    }

    // Create a Data
    const positions = new Positions({
        name                            : req.body.name, 
        position_name                   : req.body.position_name,
        sport_id                        : req.body.sport_id,
        sport_name                      : req.body.sport_name,
        created_uid                     : req.body.created_uid,
        updated_uid                     : req.body.updated_uid,
        sort_order                      : req.body.sort_order,
        parent_position_name            : req.body.parent_position_name,
        parent_position_id              : req.body.parent_position_id,
        abbreviation                    : req.body.abbreviation,
        created_datetime                : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });


    checkAlreadyExists(null,req.body.sport_id, req.body.position_name).then( valid =>  {

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
                positions.save()
                .then(data => {
                        if(logger.exitOnError == true){
                        logger.log('info',`${cname} - create DB response`)
                        }
                    if( data._id ){
                                var json = {
                                        name                            : req.body.name, 
                                        position_name                   : req.body.position_name,
                                        sport_id                        : req.body.sport_id,
                                        sport_name                      : req.body.sport_name,
                                        created_uid                     : req.body.created_uid,
                                        updated_uid                     : req.body.updated_uid,
                                        sort_order                      : req.body.sort_order,
                                        position_id                     : data._id,
                                        parent_position_name            : req.body.parent_position_name,
                                        parent_position_id              : req.body.parent_position_id,
                                        abbreviation                    : req.body.abbreviation,
                                        created_datetime                : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                                }
                                
                                Positions.findByIdAndUpdate(data._id, json, {new: true}, function (err, place) {
                                        if(logger.exitOnError == true){
                                        logger.log('info',`${cname} - create API Service response`)
                                        }
                                res.send(place);
                                });
                    }
                    //res.send(data);
                }).catch(err => {updated_datetime
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
        
          Positions.find()
              .then(positions => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All API Service Response`)   
                }
                  res.send(positions);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};


exports.findbySportsAll = (req, res) => {
    
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All by Sport Id API Service Request`)   
    }

	var sportId = req.params.id
	Positions.find({sport_id: sportId})
              .then(positions => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Sport Id API Service Response`)   
                }
                  res.send(positions);
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

          Positions.findById(req.params.id)
    .then(positions => {
        if(!positions) {

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

        res.send(positions);
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
            message: "Sportsname can not be empty"
        });
    }
    if(!req.body.position_name) {
        return res.status(400).send({
            message: "Positionname can not be empty"
        });
    }
    if(!req.body.abbreviation) {
        return res.status(400).send({
            message: "Appreviation can not be empty"
        });
    }

    checkAlreadyExists(req.params.id,req.body.sport_id, req.body.position_name).then( valid =>  {
        
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
                Positions.findByIdAndUpdate(req.params.id, {
                    name                            : req.body.name, 
                    position_name                   : req.body.position_name,
                    sport_id                        : req.body.sport_id,
                    sport_name                      : req.body.sport_name,
                    updated_uid                     : req.body.updated_uid,
                    sort_order                      : req.body.sort_order,
                    parent_position_name            : req.body.parent_position_name,
                    parent_position_id              : req.body.parent_position_id,
                    abbreviation                    : req.body.abbreviation,
                    updated_datetime                : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                }, {new: true})
                .then(positions => {
                    if(!positions) {

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
                    res.send(positions);
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

          Positions.findByIdAndRemove(req.params.id)
    .then(positions => {
        if(!positions) {
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
