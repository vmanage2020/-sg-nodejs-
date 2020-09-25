
const Feedcomments = require('../models/feedcomments.model.js');

const logger = require('../../config/logger')
var cname = 'Feedcomments';

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
    /* if(!req.body.sport_id) {
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
    } */
    // Create a Data
    const feedcomments = new Feedcomments({
        feed_id                 : req.body.feed_id, 
        first_name              : req.body.first_name,
        middle_initial          : req.body.middle_initial,
        last_name               : req.body.last_name,
        avatar                  : req.body.avatar,
        suffix                  : req.body.suffix,
        update_userid           : req.body.update_userid,
        user_id                 : req.body.user_id,
        comment_desc            : req.body.comment_desc,
        created_userid          : req.body.created_userid,
        subCollection           : req.body.subCollection,
        updated_dateTime        : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });

    /* checkAlreadyExists(null,req.body.sport_id, req.body.level_name, req.body.organization_id).then( valid =>  {

        if( valid == false)
        {
            if(logger.exitOnError == true){
                logger.log('error',`${cname} - create API service Request Duplicate data entered`)
                }
            res.status(400).send({
                status: 400,
                message: "Already Inserted same data. please check it"
            });
        }else{ */
            if(logger.exitOnError == true){
                logger.log('info',`${cname} - create DB request`)
                }
                 // Save Data in the database
                 feedcomments.save()
                .then(data => {
                    if(logger.exitOnError == true){
                        logger.log('info',`${cname} - create DB response`)
                        }
                        if( data._id ){
                                var json = {
                                    feed_id                 : req.body.feed_id, 
                                    feed_comment_id         : data._id,
                                    first_name              : req.body.first_name,
                                    middle_initial          : req.body.middle_initial,
                                    last_name               : req.body.last_name,
                                    avatar                  : req.body.avatar,
                                    suffix                  : req.body.suffix,
                                    update_userid           : req.body.update_userid,
                                    user_id                 : req.body.user_id,
                                    comment_desc            : req.body.comment_desc,
                                    created_userid          : req.body.created_userid,
                                    subCollection           : req.body.subCollection,
                                    updated_dateTime        : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                                }
                                
                                Feedcomments.findByIdAndUpdate(data._id, json, {new: true}, function (err, place) {
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
        //}
    //})
    
    
};

// Retrieve and return all Data from the database.
/* exports.findAll = (req, res) => {
          
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All API Service Request`)   
    }
            Feedcomments.find()
              .then(feedcomments => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All API Service Response`)   
                }
                  res.send(feedcomments);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
}; */


exports.findbyFeedAll = (req, res) => {
    
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All by Feed Id API Service Request`)   
    }

	var feedId = req.params.id
	Feedcomments.find({feed_id: feedId})
              .then(feedcomments => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Feed Id API Service Response`)   
                }
                  res.send(feedcomments);
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

        Feeds.findById(req.params.id)
    .then(feeds => {
        if(!feeds) {
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

        res.send(feeds);
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
    /* if(!req.body.sport_id) {
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
    } */

    /* checkAlreadyExists(req.params.id,req.body.sport_id, req.body.level_name, req.body.organization_id).then( valid =>  {
        
        if( valid == false)
        {
            if(logger.exitOnError == true){
                logger.log('error',`${cname} - update API service Request Duplicate data entered`)
                }
            res.status(400).send({
                status: 400,
                message: "Already Inserted same data. please check it"
            });
        }else{ */

            // Find Data and update it with the request body
            Feeds.findByIdAndUpdate(req.params.id, {
                feedPostedUser_suffix                 : req.body.feedPostedUser_suffix, 
                feedPostedOrg_id                      : req.body.feedPostedOrg_id,
                feedPostedUser_id                     : req.body.feedPostedUser_id,
                feededLevel                           : req.body.feededLevel,
                feedPostedOrg_abbre                   : req.body.feedPostedOrg_abbre,
                feedPostedUser_avatar                 : req.body.feedPostedUser_avatar,
                feedPostedUser_firstName              : req.body.feedPostedUser_firstName,
                feedToUserId                          : req.body.feedToUserId,
                feedPostedUser_middleInitial          : req.body.feedPostedUser_middleInitial,
                lastSelectedFeededLevel               : req.body.lastSelectedFeededLevel,
                feedPostedUser_role                   : req.body.feedPostedUser_role,
                feedPostedUser_lastName               : req.body.feedPostedUser_lastName,
                cannedResponseDesc                    : req.body.cannedResponseDesc,
                feedPostedOrg_name                    : req.body.feedPostedOrg_name,
                feededLevelObject                     : req.body.feededLevelObject,
                tag_id                                : req.body.tag_id,
                cannedResponseTitle                   : req.body.cannedResponseTitle,
                feedText                              : req.body.feedText,
                comments                              : req.body.comments,
                likes                                 : req.body.likes,
                updated_datetime                      : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
            }, {new: true})
            .then(feeds => {
                if(!feeds) {

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

                res.send(feeds);
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
       //}
    //})
    
};

// Delete a Data with the specified dataId in the request
exports.delete = (req, res) => {

    if(logger.exitOnError == true){
        logger.log('info',`${cname} - Delete API service Request`)
        }

        Feedcomments.findByIdAndRemove(req.params.id)
    .then(feedcomments => {
        if(!feedcomments) {
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
