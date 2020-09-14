
const Cannedresponse = require('../models/cannedresponse.model.js');

const logger = require('../../config/logger')
var cname = 'Canned Response';

var ObjectID = require('mongodb').ObjectID;

function checkAlreadyExists(id,sportId,name, orgId)
    {
            if( id != null)
            {
                _id = new ObjectID(id);
                var inputjson = {_id: {$ne: _id }, "sport_id":sportId, "canned_response_title": name, "organization_id": orgId}
            }else{
                var inputjson = {"sport_id":sportId, "canned_response_title": name, "organization_id": orgId}
            }

           return Cannedresponse.find(inputjson).then(function(result){
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
    if(!req.body.canned_response_title) {
        return res.status(400).send({
            message: "Canned response Title can not be empty"
        });
    }
    if(!req.body.cannedResponseTitle) {
        return res.status(400).send({
            message: "Canned response Title can not be empty"
        });
    }
    if(!req.body.canned_response_description) {
        return res.status(400).send({
            message: "Canned response Description can not be empty"
        });
    }
    if(!req.body.cannedResponseDesc) {
        return res.status(400).send({
            message: "Canned response Description can not be empty"
        });
    }
    // Create a Data
    const cannedresponse = new Cannedresponse({
        cannedResponseTitle                   : req.body.cannedResponseTitle, 
        canned_response_title                 : req.body.canned_response_title,
        cannedResponseDesc                    : req.body.cannedResponseDesc,
        canned_response_description           : req.body.canned_response_description,
        organization_id                       : req.body.organization_id,
        organization_name                     : req.body.organization_name,
        sport_id                              : req.body.sport_id,
        sport_name                            : req.body.sport_name,
        organization_abbreviation             : req.body.organization_abbreviation,
        is_active                             : req.body.is_active,
        is_deleted                            : req.body.is_deleted,
        created_uid                           : req.body.created_uid,
        updated_uid                           : req.body.updated_uid,
        created_datetime                      : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });

    checkAlreadyExists(null,req.body.sport_id, req.body.canned_response_title, req.body.organization_id).then( valid =>  {

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
                cannedresponse.save()
                .then(data => {
                    if(logger.exitOnError == true){
                        logger.log('info',`${cname} - create DB response`)
                        }
                    if( data._id ){
                                var json = {
                                        cannedResponseTitle                   : req.body.cannedResponseTitle, 
                                        canned_response_title                 : req.body.canned_response_title,
                                        cannedResponseDesc                    : req.body.cannedResponseDesc,
                                        canned_response_description           : req.body.canned_response_description,
                                        organization_id                       : req.body.organization_id,
                                        organization_name                     : req.body.organization_name,
                                        sport_id                              : req.body.sport_id,
                                        sport_name                            : req.body.sport_name,
                                        organization_abbreviation             : req.body.organization_abbreviation,
                                        cannedResponseTitle_id                : data._id,
                                        is_active                             : req.body.is_active,
                                        is_deleted                            : req.body.is_deleted,
                                        created_uid                           : req.body.created_uid,
                                        updated_uid                           : req.body.updated_uid,
                                        created_datetime                      : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                                }
                                
                                Cannedresponse.findByIdAndUpdate(data._id, json, {new: true}, function (err, place) {
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
          Cannedresponse.find()
              .then(cres => { 

                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All API Service Response`)   
                }
                  res.send(cres);
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
	Cannedresponse.find({organization_id: orgId})
              .then(cres => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Organization Id API Service Response`)   
                }
                  res.send(cres);
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
          Cannedresponse.findById(req.params.id)
    .then(cannedresponse => {
        if(!cannedresponse) {
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
        res.send(cannedresponse);
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
    if(!req.body.canned_response_title) {
        return res.status(400).send({
            message: "Canned response Title can not be empty"
        });
    }
    if(!req.body.cannedResponseTitle) {
        return res.status(400).send({
            message: "Canned response Title can not be empty"
        });
    }
    if(!req.body.canned_response_description) {
        return res.status(400).send({
            message: "Canned response Description can not be empty"
        });
    }
    if(!req.body.cannedResponseDesc) {
        return res.status(400).send({
            message: "Canned response Description can not be empty"
        });
    }

    checkAlreadyExists(req.params.id,req.body.sport_id, req.body.canned_response_title, req.body.organization_id).then( valid =>  {
        
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
                Cannedresponse.findByIdAndUpdate(req.params.id, {
                    cannedResponseTitle                   : req.body.cannedResponseTitle, 
                    canned_response_title                 : req.body.canned_response_title,
                    cannedResponseDesc                    : req.body.cannedResponseDesc,
                    canned_response_description           : req.body.canned_response_description,
                    organization_id                       : req.body.organization_id,
                    organization_name                     : req.body.organization_name,
                    sport_id                              : req.body.sport_id,
                    sport_name                            : req.body.sport_name,
                    organization_abbreviation             : req.body.organization_abbreviation,
                    is_active                             : req.body.is_active,
                    is_deleted                            : req.body.is_deleted,
                    updated_uid                           : req.body.updated_uid,
                    updated_datetime                      : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                }, {new: true})
                .then(cannedresponse => {
                    if(!cannedresponse) {

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
                    res.send(cannedresponse);
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

          Cannedresponse.findByIdAndRemove(req.params.id)
    .then(cannedresponse => {
        if(!cannedresponse) {
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
