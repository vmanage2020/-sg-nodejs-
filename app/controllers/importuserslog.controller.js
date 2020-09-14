
const Importuserslog = require('../models/importuserslog.model.js');

const logger = require('../../config/logger')
var cname = 'Import User logs';
var ObjectID = require('mongodb').ObjectID;

function checkAlreadyExists(id,sportId,seasonname, orgId)
    {
            if( id != null)
            {
                _id = new ObjectID(id);
                var inputjson = {_id: {$ne: _id }, "sports_id":sportId, "season_name": seasonname, "organization_id": orgId}
            }else{
                var inputjson = {"sports_id":sportId, "season_name": seasonname, "organization_id": orgId}
            }

           return Importuserslog.find(inputjson).then(function(result){
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
        message: "Sportsname can not be empty"
    });
}
if(!req.body.season_id) {
    return res.status(400).send({
        message: "Season Id can not be empty"
    });
}
if(!req.body.season_name) {
    return res.status(400).send({
        message: "Season name can not be empty"
    });
}
if(!req.body.imported_file_template) {
    return res.status(400).send({
        message: "Import file Template can not be empty"
    });
}
if(!req.body.imported_file_name) {
    return res.status(400).send({
        message: "Import file name can not be empty"
    });
}

// Create a Data
const importuserslog = new Importuserslog({
    season_id                               : req.body.season_id, 
    error_records                           : req.body.error_records,
    file_id                                 : req.body.file_id,
    imported_file_url                       : req.body.imported_file_url,
    season_end_date                         : req.body.season_end_date,
    season_name                             : req.body.season_name,
    imported_file_template                  : req.body.imported_file_template,
    isActive                                : req.body.isActive,
    season_start_date                       : req.body.season_start_date,
    processed_Flag                          : req.body.processed_Flag,
    total_players_found                     : req.body.total_players_found,
    status                                  : req.body.status,
    player_duplicate_records_found          : req.body.player_duplicate_records_found,
    erroDes                                 : req.body.erroDes,
    player_records_created                  : req.body.player_records_created,
    sports_name                             : req.body.sports_name,
    imported_by                             : req.body.imported_by,
    total_guardains_found                   : req.body.total_guardains_found,
    processed_records                       : req.body.processed_records,
    imported_user_id                        : req.body.imported_user_id,
    organization_id                         : req.body.organization_id,
    total_records_found                     : req.body.total_records_found,
    total_records                           : req.body.total_records,
    guardian_records_created                : req.body.guardian_records_created,
    guardian_duplicate_records_found        : req.body.guardian_duplicate_records_found,
    imported_file_name                      : req.body.imported_file_name,
    sports_id                               : req.body.sports_id,
    imported_datetime                       : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
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
         // Save Data in the database
         importuserslog.save()
            .then(data => {
                    if(logger.exitOnError == true){
                    logger.log('info',`${cname} - create DB response`)
                    }
                if( data._id ){
                            var json = {
                                imported_file_id                        : data._id,
                                season_id                               : req.body.season_id, 
                                error_records                           : req.body.error_records,
                                file_id                                 : req.body.file_id,
                                imported_file_url                       : req.body.imported_file_url,
                                season_end_date                         : req.body.season_end_date,
                                season_name                             : req.body.season_name,
                                imported_file_template                  : req.body.imported_file_template,
                                isActive                                : req.body.isActive,
                                season_start_date                       : req.body.season_start_date,
                                processed_Flag                          : req.body.processed_Flag,
                                total_players_found                     : req.body.total_players_found,
                                status                                  : req.body.status,
                                player_duplicate_records_found          : req.body.player_duplicate_records_found,
                                erroDes                                 : req.body.erroDes,
                                player_records_created                  : req.body.player_records_created,
                                sports_name                             : req.body.sports_name,
                                imported_by                             : req.body.imported_by,
                                total_guardains_found                   : req.body.total_guardains_found,
                                processed_records                       : req.body.processed_records,
                                imported_user_id                        : req.body.imported_user_id,
                                organization_id                         : req.body.organization_id,
                                total_records_found                     : req.body.total_records_found,
                                total_records                           : req.body.total_records,
                                guardian_records_created                : req.body.guardian_records_created,
                                guardian_duplicate_records_found        : req.body.guardian_duplicate_records_found,
                                imported_file_name                      : req.body.imported_file_name,
                                sports_id                               : req.body.sports_id,
                                imported_datetime                       : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
                            }
                            
                            Importuserslog.findByIdAndUpdate(data._id, json, {new: true}, function (err, place) {
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

exports.findbyOrgAll = (req, res) => {
    
    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All by Organization Id API Service Request`)   
    }

	var orgId = req.params.id
	Importuserslog.find({organization_id: orgId})
              .then(userlogs => {
                if(logger.exitOnError == true)
                {
                    logger.log('info',`${cname} - List All by Organization Id API Service Response`)   
                }
                  res.send(userlogs);
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

    Importuserslog.findById(req.params.id)
.then(userlogs => {
    if(!userlogs) {

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

    res.send(userlogs);
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
