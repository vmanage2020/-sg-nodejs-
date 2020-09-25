
const Importuserslog = require('../models/importuserslog.model.js');

const Users = require('../models/users.model.js');

const csvparser = require('csv-parser');

const parse = require( 'csv-parse/lib/sync' );
const axios = require( 'axios' );


const logger = require('../../config/logger')
var cname = 'Import User logs';
var ObjectID = require('mongodb').ObjectID;


const readCSV = ( module.exports.readCSV = async ( path ) => {
    try {
       const res = await axios( { url: path, method: 'GET', responseType: 'blob' } );
       let records = parse( res.data, {
          columns: true,
          skip_empty_lines: true
        } );
        
        return records;
     } catch ( e ) {
       console.log( 'err' );
     }
    
    } );

function getValidEmail(email)
{
    var inputjson = {email_address: email}
    return Users.find(inputjson).then(function(result){
        console.log('----result----', result)
        //return result !== null;
        if( result.length==0)
        {
           return true
        }else{
            return result;
        }
   });
}

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

                                var csvFilePaths = req.body.imported_file_url;//'https://firebasestorage.googleapis.com/v0/b/sportsgravy-testing.appspot.com/o/Z1wiLsm7q22taU6KNCOo_1600251030051_standard_user_import_template.csv?alt=media&token=ac5ec6cd-7034-4ba7-9931-69fe8da129e2';
    
    
                                            readCSV(csvFilePaths).then( data => {
                    
                                                data.forEach( da => {
                                                    console.log('----da----', da)
                                        
                                                    var quardUserId = [];            
                                                    var atheleteUserId = '';
                                        
                                                    if( da.guardian_2_first_name != undefined && da.guardian_2_first_name != ''
                                                        && da.guardian_2_last_name != undefined && da.guardian_2_last_name != '' 
                                                        && da.guardian_2_email_1 != undefined && da.guardian_2_email_1 !=  '')
                                                    {
                                                        getValidEmail(da.guardian_2_email_1).then( quard2data =>  {
                                                            if( quard2data != true)
                                                            {
                                                                //console.log('----quard2data---', quard2data)
                                                                quardUserId.push( new ObjectID(quard2data[0]._id) );
                                                            }else{
                                                                var quard2insertJson = new Users({
                                                                    first_name                        : da.guardian_2_first_name, 
                                                                    last_name                         : da.guardian_2_last_name,
                                                                    mobile_phone                      : da.guardian_2_phone_1,
                                                                    email_address                     : da.guardian_2_email_1
                                                                })
                                                                //console.log('---quard2insertJson----', quard2insertJson)
                                                                quard2insertJson.save()
                                                                .then(quard2 => {
                                                                    quardUserId.push( new ObjectID(quard2._id) );
                                                                }).catch(err => {
                                                                    res.status(500).send({
                                                                        message: err.message || "Some error occurred while creating the Data."
                                                                    });
                                                                });
                                                            }
                                        
                                                        })
                                                    }
                                                    if( da.guardian_1_first_name != undefined && da.guardian_1_first_name != ''
                                                    && da.guardian_1_last_name != undefined && da.guardian_1_last_name != '' 
                                                    && da.guardian_1_email_1 != undefined && da.guardian_1_email_1 !=  '')
                                                    {
                                                        getValidEmail(da.guardian_1_email_1).then( quard1data =>  {
                                                            if( quard1data != true)
                                                            {
                                                                //console.log('----quard1data---', quard1data)
                                                                quardUserId.push( new ObjectID(quard1data[0]._id) );
                                                            }else{
                                                                var quard1insertJson = new Users({
                                                                    first_name                        : da.guardian_1_first_name, 
                                                                    last_name                         : da.guardian_1_last_name,
                                                                    mobile_phone                      : da.guardian_1_phone_1,
                                                                    email_address                     : da.guardian_1_email_1
                                                                })
                                                                //console.log('---quard1insertJson----', quard1insertJson)
                                                                quard1insertJson.save()
                                                                .then(quard1 => {
                                                                    quardUserId.push( new ObjectID(quard1._id) );
                                                                }).catch(err => {
                                                                    res.status(500).send({
                                                                        message: err.message || "Some error occurred while creating the Data."
                                                                    });
                                                                });
                                                            }
                                                        })
                                                    }
                                                    setTimeout(() => {
                                                    
                                                        if( da.athlete_1_first_name != undefined && da.athlete_1_first_name != ''
                                                        && da.athlete_1_last_name != undefined && da.athlete_1_last_name != '' 
                                                        &&  da.athlete_1_email != undefined && da.athlete_1_email !=  '' && quardUserId.length>0)
                                                        {
                                                            
                                                            getValidEmail(da.athlete_1_email).then( atheletdata =>  {
                                                                if( atheletdata == true)
                                                                {
                                                                    console.log('---quardUserId----', quardUserId)
                                                                        var atheleteinsertJson = new Users({
                                                                            parent_user_id                    : quardUserId,
                                                                            first_name                        : da.athlete_1_first_name, 
                                                                            last_name                         : da.athlete_1_last_name,
                                                                            middle_initial                    : da.athlete_1_middle_name,
                                                                            email_address                     : da.athlete_1_email,
                                                                            date_of_birth                     : new Date(da.athlete_1_dob),
                                                                            gender                            : da.athlete_1_gender,
                                                                            street1                           : da.athlete_1_address_1,
                                                                            street2                           : da.athlete_1_address_1_cont,
                                                                            city                              : da.athlete_1_city_1,
                                                                            state                             : da.athlete_1_state_1,
                                                                            postal_code                       : da.athlete_1_zip_1,
                                                                            country_code                      : da.athlete_1_country_1
                                                                        })
                                                                        console.log('---atheleteinsertJson----', atheleteinsertJson)
                                                                        atheleteinsertJson.save()
                                                                                .then(athelete => {
                                                                                    //console.log('-----athelete----', athelete)
                                                                                    atheleteUserId = athelete._id
                                                                                }).catch(err => {
                                                                                    res.status(500).send({
                                                                                        message: err.message || "Some error occurred while creating the Data."
                                                                                    });
                                                                                });
                                                                }
                                                            })
                                                            
                                                        } 
                                                    }, 2000);
                                                    
                                                })


                                                /*
                                                 
                                                */
                                            })

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
