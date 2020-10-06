
const Seasons = require('../models/seasons.model.js');

const logger = require('../../config/logger')
var cname = 'Seasons';

var ObjectID = require('mongodb').ObjectID;

function checkAlreadyExists(id,sportId,name, orgId)
    {
            if( id != null)
            {
                _id = new ObjectID(id);
                var regex = new RegExp(["^", name, "$"].join(""), "i");
                var inputjson = {_id: {$ne: _id }, 
                "sports_id":sportId,
                 "season_name": regex, 
                 "organization_id": orgId}
            }else{
                var regex = new RegExp(["^", name, "$"].join(""), "i");
                var inputjson = {"sports_id":sportId, 
                "season_name": regex,
                 "organization_id": orgId}
            }

           return Seasons.find(inputjson).then(function(result){
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
    if(!req.body.sports_id) {
        return res.status(400).send({
            message: "Sport Id can not be empty"
        });
    }
    if(!req.body.sports_name) {
        return res.status(400).send({
            message: "Sports name can not be empty"
        });
    }
    if(!req.body.season_start_date) {
        return res.status(400).send({
            message: "Start date can not be empty"
        });
    }
    if(!req.body.season_end_date) {
        return res.status(400).send({
            message: "End date can not be empty"
        });
    }
    if(!req.body.season) {
        return res.status(400).send({
            message: "Season can not be empty"
        });
    }
    if(!req.body.organization_id) {
        return res.status(400).send({
            message: "Organization can not be empty"
        });
    }
    if(!req.body.organization_abbreviation) {
        return res.status(400).send({
            message: "Abbreviation can not be empty"
        });
    }
    if(!req.body.season_name) {
        return res.status(400).send({
            message: "Season name can not be empty"
        });
    }
    if(!req.body.organization_name) {
        return res.status(400).send({
            message: "Organization name can not be empty"
        });
    }

    if( req.body.season_start_date != '' && req.body.season_end_date != '') {
        var currentDate = new Date();
        var startDate = new Date( req.body.season_start_date );
        var endDate = new Date( req.body.season_end_date );

        if (currentDate > startDate){
            return res.status(400).send({
                message: "start date less than current date"
            });
        }

        if (startDate > endDate){
            return res.status(400).send({
                message: "start date greater than end date"
            });
        }
    }
    

    // Create a Data
    const seasons = new Seasons({
        season_start_date                 : req.body.season_start_date, 
        sports_id                         : req.body.sports_id,
        season_end_date                   : req.body.season_end_date,
        sports_name                       : req.body.sports_name,
        season                            : req.body.season,
        organization_id                   : req.body.organization_id,
        season_id                         : req.body.season_id,
        isUsed                            : req.body.isUsed,        
        organization_abbreviation         : req.body.organization_abbreviation,
        season_name                       : req.body.season_name,
        organization_name                 : req.body.organization_name,
        created_uid                       : req.body.created_uid,
        updated_uid                       : req.body.updated_uid,
        created_datetime                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });

    checkAlreadyExists(null,req.body.sports_id, req.body.season_name, req.body.organization_id).then( valid =>  {

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
            //console.log('---correct---')
                // Save Data in the database
                 seasons.save()
                .then(data => {
                    if(logger.exitOnError == true){
                        logger.log('info',`${cname} - create DB response`)
                        }
                    if( data._id ){
                            
                            var json = {
                    season_start_date                 : req.body.season_start_date, 
                    sports_id                         : req.body.sports_id,
                    season_end_date                   : req.body.season_end_date,
                    sports_name                       : req.body.sports_name,
                    season                            : req.body.season,
                    organization_id                   : req.body.organization_id,
                    season_id                         : data._id,
                    isUsed                            : req.body.isUsed,        
                    organization_abbreviation         : req.body.organization_abbreviation,
                    season_name                       : req.body.season_name,
                    organization_name                 : req.body.organization_name,       
                    created_uid                       : req.body.created_uid,
                    updated_uid                       : req.body.updated_uid,
                    created_datetime                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                };
                
                            Seasons.findByIdAndUpdate(data._id, json, {new: true}, function (err, place) {
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
        
          Seasons.find()
              .then(seasons => { 
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All API Service Response`)   
                }
                  res.send(seasons);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

exports.findseasonbyorg = (req, res) => {
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All by Organization Id API Service Request`)   
    }
    var orgId = req.params.id
	Seasons.find({organization_id: orgId})
              .then(seasons => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Organization Id API Service Response`)   
                }
                  res.send(seasons);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

exports.findseasonbysports = (req, res) => {
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All by Sports Id API Service Request`)   
    }

    var sportId = req.params.id 

    Seasons.find({sports_id: sportId})
              .then(seasons => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Sports Id API Service Response`)   
                }
                  res.send(seasons);
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
          Seasons.findById(req.params.id)
    .then(seasons => {
        if(!seasons) {
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
        res.send(seasons);
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
    if(!req.body.sports_id) {
        return res.status(400).send({
            message: "Sport Id can not be empty"
        });
    }
    if(!req.body.sports_name) {
        return res.status(400).send({
            message: "Sports name can not be empty"
        });
    }
    if(!req.body.season_start_date) {
        return res.status(400).send({
            message: "Start date can not be empty"
        });
    }
    if(!req.body.season_end_date) {
        return res.status(400).send({
            message: "End date can not be empty"
        });
    }
    if(!req.body.season) {
        return res.status(400).send({
            message: "Season can not be empty"
        });
    }
    if(!req.body.organization_id) {
        return res.status(400).send({
            message: "Organization can not be empty"
        });
    }
    if(!req.body.organization_abbreviation) {
        return res.status(400).send({
            message: "Abbreviation can not be empty"
        });
    }
    if(!req.body.season_name) {
        return res.status(400).send({
            message: "Season name can not be empty"
        });
    }
    if(!req.body.organization_name) {
        return res.status(400).send({
            message: "Organization name can not be empty"
        });
    }

    if( req.body.season_start_date != '' && req.body.season_end_date != '') {
        var currentDate = new Date();
        var startDate = new Date( req.body.season_start_date );
        var endDate = new Date( req.body.season_end_date );

        if (currentDate > startDate){
            return res.status(400).send({
                message: "start date less than current date"
            });
        }

        if (startDate > endDate){
            return res.status(400).send({
                message: "start date greater than end date"
            });
        }
    }

    checkAlreadyExists(req.params.id,req.body.sports_id, req.body.season_name, req.body.organization_id).then( valid =>  {
        
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
                Seasons.findByIdAndUpdate(req.params.id, {
                    season_start_date                 : req.body.season_start_date, 
                    sports_id                         : req.body.sports_id,
                    season_end_date                   : req.body.season_end_date,
                    sports_name                       : req.body.sports_name,
                    season                            : req.body.season,
                    organization_id                   : req.body.organization_id,
                    isUsed                            : req.body.isUsed,        
                    organization_abbreviation         : req.body.organization_abbreviation,
                    season_name                       : req.body.season_name,
                    organization_name                 : req.body.organization_name,
                    updated_uid                       : req.body.updated_uid,
                    updated_datetime                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                }, {new: true})
                .then(seasons => {
                    if(!seasons) {
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
                    res.send(seasons);
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
          Seasons.findByIdAndRemove(req.params.id)
    .then(seasons => {
        if(!seasons) {
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
