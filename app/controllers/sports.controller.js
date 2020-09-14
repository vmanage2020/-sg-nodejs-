
const Sports = require('../models/sports.model.js');

const logger = require('../../config/logger')
var cname = 'Sports';

var ObjectID = require('mongodb').ObjectID;

function checkAlreadyExists(id,country,name)
    {
            if( id != null)
            {
                _id = new ObjectID(id);
                var inputjson = {_id: {$ne: _id }, "country_code":country, "name": name}
            }else{
                var inputjson = {"country_code":country, "name": name}
            }
           return Sports.find(inputjson).then(function(result){
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
    // audit log1 sports - create API service Request enter with time
    if(logger.exitOnError == true){
    logger.log('info',`${cname} - create API service Request enter`)
    }
    //validationvar checkRes = 
    if(!req.body.country) {
        return res.status(400).send({
            status: 400,
            message: "Country can not be empty"
        });
    }
    if(!req.body.name) {
        return res.status(400).send({
            status: 400,
            message: "Sportsname can not be empty"
        });
    }


     // Create a Data
     const sports = new Sports({
        country                      : req.body.country, 
        country_code                 : req.body.country_code,
        name                         : req.body.name,
        sport                        : req.body.sport,
        created_datetime             : req.body.created_datetime,
        updated_datetime             : req.body.updated_datetime,
        created_uid                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });

    // set unique validation for sports by country
    checkAlreadyExists(null,req.body.country_code, req.body.name).then( valid =>  {
        
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
            // audit log2 sports - create DB request with time
            if(logger.exitOnError == true){
            logger.log('info',`${cname} - create DB request`)
            }
            // Save Data in the database
                    sports.save()
                    .then(data => {
                        // audit log3 sports - create DB response with time
                        if(logger.exitOnError == true){
                        logger.log('info',`${cname} - create DB response`)
                        }
                        if( data._id ){
                        
                                    var json = {
                                            country                      : req.body.country, 
                                            country_code                 : req.body.country_code,
                                            sport_id                     : data._id,
                                            name                         : req.body.name,
                                            sport                        : req.body.sport,
                                            created_datetime             : req.body.created_datetime,
                                            updated_datetime             : req.body.updated_datetime,
                                            created_uid                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                                    }
                                    
                                    Sports.findByIdAndUpdate(data._id, json, {new: true}, function (err, place) {
                                        // audit log3 sports - create API Service response with time
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
    });
    
};

exports.findbyOrgAll = ( req, res) => {

    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All by Organization Id API Service Request`)   
    }

	var orgId = req.params.id
	Sports.find({organization_id: orgId})
              .then(sports => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Organization Id API Service Response`)   
                }
                  res.send(sports);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

exports.findsportsbycountry = (req, res) => {         
    
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All Sports by country API Service Request`)   
    }
          var countrycode = req.params.id
          
          Sports.find({country_code: countrycode})
              .then(sports => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All Sports by country API Service Response`)   
                }
                  res.send(sports);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

// Retrieve and return all Data from the database.
exports.findAll = (req, res) => {
          
        if(logger.exitOnError == true)
        {
            logger.log('info',`${cname} - List All API Service Request`)   
        }
          Sports.find()
              .then(sports => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All API Service Response`)   
                }
                  res.send(sports);
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

          Sports.findById(req.params.id)
    .then(sports => {
        if(!sports) {
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

        res.send(sports);
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
    if(!req.body.country_code) {
        return res.status(400).send({
            message: "Country code can not be empty"
        });
    }
    if(!req.body.country) {
        return res.status(400).send({
            message: "Country can not be empty"
        });
    }
    if(!req.body.name) {
        return res.status(400).send({
            message: "Sportsname can not be empty"
        });
    }

    checkAlreadyExists(req.params.id,req.body.country_code, req.body.name).then( valid =>  {
        
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
            Sports.findByIdAndUpdate(req.params.id, {
                country                      : req.body.country, 
                country_code                 : req.body.country_code,
                name                         : req.body.name,
                sport                        : req.body.sport,
                updated_datetime             : req.body.updated_datetime,
                updated_uid                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
            }, {new: true})
            .then(sports => {
                if(!sports) {

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

                res.send(sports);
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
    // Find Data and update it with the request body
   /*   */
    
};

// Delete a Data with the specified dataId in the request
exports.delete = (req, res) => {

        if(logger.exitOnError == true){
        logger.log('info',`${cname} - Delete API service Request`)
        }

          Sports.findByIdAndRemove(req.params.id)
    .then(sports => {
        if(!sports) {
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


