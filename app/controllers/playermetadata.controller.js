
const Playermetadata = require('../models/playermetadata.model.js');

const logger = require('../../config/logger')
var cname = 'Player metadata';

var ObjectID = require('mongodb').ObjectID;

function checkAlreadyExists(id,sportId,name, orgId)
    {
            if( id != null)
            {
                _id = new ObjectID(id);
                var regex = new RegExp(["^", name, "$"].join(""), "i");
                var inputjson = {_id: {$ne: _id }, "sport_id":sportId, "field_name": regex, "organization_id": orgId}
            }else{
                var regex = new RegExp(["^", name, "$"].join(""), "i");
                var inputjson = {"sport_id":sportId, "field_name": regex, "organization_id": orgId}
            }

           return Playermetadata.find(inputjson).then(function(result){
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
    if(!req.body.sport) {
        return res.status(400).send({
            message: "Sports can not be empty"
        });
    }
    if(!req.body.field_name) {
        return res.status(400).send({
            message: "Fieldname can not be empty"
        });
    }
    if(!req.body.field_type) {
        return res.status(400).send({
            message: "Fieldtype can not be empty"
        });
    }
    if(!req.body.is_required) {
        return res.status(400).send({
            message: "Required option can not be empty"
        });
    }
    if(!req.body.is_editable) {
        return res.status(400).send({
            message: "Editable option can not be empty"
        });
    }
    if(!req.body.is_deletable) {
        return res.status(400).send({
            message: "Deletable option can not be empty"
        });
    }

    // Create a Data
    const playermetadata = new Playermetadata({
        sport_id                    : req.body.sport_id, 
        sport                       : req.body.sport,
        field_name                  : req.body.field_name,
        field_type                  : req.body.field_type,
        value                       : req.body.value,
        is_required                 : req.body.is_required,
        is_editable                 : req.body.is_editable,        
        is_deletable                : req.body.is_deletable,
        is_deleted                  : req.body.is_deleted,
        is_active                   : req.body.is_active,
        organization_id             : req.body.organization_id,
        created_uid                 : req.body.created_uid,
        updated_uid                 : req.body.updated_uid,
        created_datetime            : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });

    checkAlreadyExists(null,req.body.sport_id, req.body.field_name, req.body.organization_id).then( valid =>  {

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
                playermetadata.save()
                .then(data => {
                    if(logger.exitOnError == true){
                        logger.log('info',`${cname} - create DB response`)
                        }
                    if( data._id ){
                        var json = {
                            sport_id                    : req.body.sport_id, 
                            sport                       : req.body.sport,
                            field_name                  : req.body.field_name,
                            field_type                  : req.body.field_type,
                            value                       : req.body.value,
                            is_required                 : req.body.is_required,
                            is_editable                 : req.body.is_editable,        
                            is_deletable                : req.body.is_deletable,
                            is_deleted                  : req.body.is_deleted,
                            is_active                   : req.body.is_active,
                            field_id                    : data._id,
                            organization_id             : req.body.organization_id,
                            created_uid                 : req.body.created_uid,
                            updated_uid                 : req.body.updated_uid,
                            created_datetime            : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                        }
                        Playermetadata.findByIdAndUpdate(data._id, json, {new: true}, function (err, place) {
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
          Playermetadata.find()
              .then(playermeta => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All API Service Response`)   
                }
                  res.send(playermeta);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};
exports.findbySportsOrgAll = (req, res) => {
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All by Organization Id API Service Request`)   
    }

    var orgId = req.params.orgid
    var sportid = req.params.sport
	Playermetadata.find({organization_id: orgId, sport_id: sportid })
              .then(playermeta => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Organization Id API Service Response`)   
                }
                  res.send(playermeta);
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
	Playermetadata.find({organization_id: orgId})
              .then(playermeta => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Organization Id API Service Response`)   
                }
                  res.send(playermeta);
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
          Playermetadata.findById(req.params.id)
    .then(playermeta => {
        if(!playermeta) {
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
        res.send(playermeta);
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
    if(!req.body.sport) {
        return res.status(400).send({
            message: "Sports can not be empty"
        });
    }
    if(!req.body.field_name) {
        return res.status(400).send({
            message: "Fieldname can not be empty"
        });
    }
    if(!req.body.field_type) {
        return res.status(400).send({
            message: "Fieldtype can not be empty"
        });
    }
    if(!req.body.is_required) {
        return res.status(400).send({
            message: "Required option can not be empty"
        });
    }
    if(!req.body.is_editable) {
        return res.status(400).send({
            message: "Editable option can not be empty"
        });
    }
    if(!req.body.is_deletable) {
        return res.status(400).send({
            message: "Deletable option can not be empty"
        });
    }

    checkAlreadyExists(req.params.id,req.body.sport_id, req.body.field_name, req.body.organization_id).then( valid =>  {
        
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
            Playermetadata.findByIdAndUpdate(req.params.id, {
                sport_id                    : req.body.sport_id, 
                sport                       : req.body.sport,
                field_name                  : req.body.field_name,
                field_type                  : req.body.field_type,
                value                       : req.body.value,
                is_required                 : req.body.is_required,
                is_editable                 : req.body.is_editable,        
                is_deletable                : req.body.is_deletable,
                is_deleted                  : req.body.is_deleted,
                is_active                   : req.body.is_active,
                organization_id             : req.body.organization_id,        
                updated_uid                 : req.body.updated_uid,
                updated_datetime            : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
            }, {new: true})
            .then(playermeta => {
                if(!playermeta) {

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
                res.send(playermeta);
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

          Playermetadata.findByIdAndRemove(req.params.id)
    .then(playermeta => {
        if(!playermeta) {
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
