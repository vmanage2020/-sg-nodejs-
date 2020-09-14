
const Users = require('../models/users.model.js');

const logger = require('../../config/logger')
var cname = 'Users';


var ObjectID = require('mongodb').ObjectID;

function checkAlreadyExists(id,email, orgId)
    {
            if( id != null)
            {
                _id = new ObjectID(id);
                var inputjson = {_id: {$ne: _id }, "email_address": email, "organization_id": orgId}
            }else{
                var inputjson = {"email_address": email, "organization_id": orgId}
            }

           return Users.find(inputjson).then(function(result){
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
    if(!req.body.first_name) {
        return res.status(400).send({
            message: "Firstname can not be empty"
        });
    }
    if(!req.body.last_name) {
        return res.status(400).send({
            message: "Lastname can not be empty"
        });
    }
    if(!req.body.email_address) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }
    

    // Create a Data
    const users = new Users({
        first_name                        : req.body.first_name, 
        profile_image                     : req.body.profile_image,
        is_signup_completed               : req.body.is_signup_completed,
        parent_user_id                    : req.body.parent_user_id,
        country_code                      : req.body.country_code,
        date_of_birth                     : req.body.date_of_birth,
        postal_code                       : req.body.postal_code,
        suffix                            : req.body.suffix,        
        city                              : req.body.city,
        street1                           : req.body.street1,
        organization_name                 : req.body.organization_name,
        organization_id                   : req.body.organization_id,
        email_address                     : req.body.email_address,
        password                          : req.body.password,
        gender                            : req.body.gender,
        country                           : req.body.country,
        last_name                         : req.body.last_name,
        is_invited                        : req.body.is_invited,
        state                             : req.body.state,
        mobile_phone                      : req.body.mobile_phone,
        state_code                        : req.body.state_code,
        street2                           : req.body.street2,
        middle_initial                    : req.body.middle_initial,
        organizations                     : req.body.organizations,
        organization_abbrev               : req.body.organization_abbrev,
        role                              : req.body.role,
        hasRoleEnabled                    : req.body.hasRoleEnabled,
        isUserDuplicated                  : req.body.isUserDuplicated,   
        roles                             : req.body.roles,    
        created_uid                       : req.body.created_uid,
        updated_uid                       : req.body.updated_uid,
        created_datetime                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });

    checkAlreadyExists(null,req.body.email_address, req.body.organization_id).then( valid =>  {
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
                users.save()
                .then(data => {

                    if(logger.exitOnError == true){
                        logger.log('info',`${cname} - create DB response`)
                        }

                        if( data._id ){
                            var json = {
                                first_name                        : req.body.first_name, 
                                profile_image                     : req.body.profile_image,
                                is_signup_completed               : req.body.is_signup_completed,
                                parent_user_id                    : req.body.parent_user_id,
                                country_code                      : req.body.country_code,
                                date_of_birth                     : req.body.date_of_birth,
                                postal_code                       : req.body.postal_code,
                                suffix                            : req.body.suffix,        
                                city                              : req.body.city,
                                street1                           : req.body.street1,
                                organization_name                 : req.body.organization_name,
                                organization_id                   : req.body.organization_id,
                                user_id                           : data._id,
                                email_address                     : req.body.email_address,
                                password                          : req.body.password,
                                gender                            : req.body.gender,
                                country                           : req.body.country,
                                last_name                         : req.body.last_name,
                                is_invited                        : req.body.is_invited,
                                state                             : req.body.state,
                                mobile_phone                      : req.body.mobile_phone,
                                state_code                        : req.body.state_code,
                                street2                           : req.body.street2,
                                middle_initial                    : req.body.middle_initial,
                                organizations                     : req.body.organizations,
                                organization_abbrev               : req.body.organization_abbrev,        
                                created_uid                       : req.body.created_uid,
                                updated_uid                       : req.body.updated_uid,
                                created_datetime                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                            }

                            Users.findByIdAndUpdate(data._id, json, {new: true}, function (err, place) {
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
          Users.find()
              .then(users => { 
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All API Service Response`)   
                }
                  res.send(users);
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
	Users.find({organization_id: orgId})
              .then(users => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Organization Id API Service Response`)   
                }
                  res.send(users);
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
          Users.findById(req.params.id)
    .then(users => {
        if(!users) {

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
            
        res.send(users);
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
        if(!req.body.first_name) {
            return res.status(400).send({
                message: "Firstname can not be empty"
            });
        }
        if(!req.body.last_name) {
            return res.status(400).send({
                message: "Lastname can not be empty"
            });
        }
        if(!req.body.email_address) {
            return res.status(400).send({
                message: "Email can not be empty"
            });
        }
        

        checkAlreadyExists(req.params.id,req.body.email_address, req.body.organization_id).then( valid =>  {
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
                        Users.findByIdAndUpdate(req.params.id, {
                            first_name                        : req.body.first_name, 
                            profile_image                     : req.body.profile_image,
                            is_signup_completed               : req.body.is_signup_completed,
                            parent_user_id                    : req.body.parent_user_id,
                            country_code                      : req.body.country_code,
                            date_of_birth                     : req.body.date_of_birth,
                            postal_code                       : req.body.postal_code,
                            suffix                            : req.body.suffix,        
                            city                              : req.body.city,
                            street1                           : req.body.street1,
                            organization_name                 : req.body.organization_name,
                            organization_id                   : req.body.organization_id,
                            email_address                     : req.body.email_address,
                            password                          : req.body.password,
                            gender                            : req.body.gender,
                            country                           : req.body.country,
                            last_name                         : req.body.last_name,
                            is_invited                        : req.body.is_invited,
                            state                             : req.body.state,
                            mobile_phone                      : req.body.mobile_phone,
                            state_code                        : req.body.state_code,
                            street2                           : req.body.street2,
                            middle_initial                    : req.body.middle_initial,
                            organizations                     : req.body.organizations,
                            organization_abbrev               : req.body.organization_abbrev, 
                            role                              : req.body.role,
                            hasRoleEnabled                    : req.body.hasRoleEnabled,
                            isUserDuplicated                  : req.body.isUserDuplicated,   
                            roles                             : req.body.roles,   
                            updated_uid                       : req.body.updated_uid,
                            updated_datetime                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                        }, {new: true})
                        .then(users => {
                            if(!users) {

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
                            res.send(users);
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

          Users.findByIdAndRemove(req.params.id)
    .then(users => {
        if(!users) {
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
