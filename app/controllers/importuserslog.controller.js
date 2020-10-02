
const Importuserslog = require('../models/importuserslog.model.js');

const Users = require('../models/users.model.js');

const Levels = require('../models/levels.model.js');

const Importusersdata = require('../models/importusersdata.model.js');

const csvparser = require('csv-parser');

const parse = require( 'csv-parse/lib/sync' );
const axios = require( 'axios' );


const logger = require('../../config/logger');
const importusersdataModel = require('../models/importusersdata.model.js');
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

    function importusersdatainsert( data, logId )
    {
        var importusersdata = new Importusersdata({
            import_user_log_id              : logId,            
            player_first_name               : data.athlete_1_first_name,
            player_middle_name              : data.athlete_1_middle_name,
            player_last_name                : data.athlete_1_last_name,
            player_dob                      : data.athlete_1_dob,
            player_gender                   : data.athlete_1_gender,
            player_level                    : data.athlete_1_level,
            player_email                    : data.athlete_1_email,
            player_address1                 : data.athlete_1_address_1,
            player_address2                 : data.athlete_1_address_1_cont,
            player_city                     : data.athlete_1_city_1,
            player_state                    : data.athlete_1_state_1,
            player_postalcode               : data.athlete_1_zip_1,
            player_country                  : data.athlete_1_country_1,
            guard_1_firstname               : data.guardian_1_first_name,
            guard_1_lastname                : data.guardian_1_last_name,
            guard_1_phone                   : data.guardian_1_phone_1,
            guard_1_email                   : data.guardian_1_email_1,
            guard_2_firstname               : data.guardian_2_first_name,
            guard_2_lastname                : data.guardian_2_last_name,
            guard_2_phone                   : data.guardian_2_phone_1,
            guard_2_email                   : data.guardian_2_email_1,
            created_datetime                : new Date(),
            isRowReadyToProcess             : '',
            guardians : '',
            players : '',
            users : '',
            error_description : '',
            error_for_status : '',
            processed_flag : '',
            level_id : ''
        })

        importusersdata.save()
            .then(insdata => {
                //console.log('----insdata----', insdata)
                if( insdata._id ){
                    //console.log('---aaaaa-----')
                    return insdata
                }else{
                    //console.log('---bbb-----')
                    return false;
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Data."
                });
            });
    }

    function checkUsersLevel(level, orgId)
    {
            var inputjson = {level_name: level, organization_id: orgId}
                return Levels.find(inputjson).then(function(result){
                    //console.log('----result----', result)
                    //return result !== null;
                    if( result.length==0)
                    {
                        return true
                    }else{
                        return result;
                    }
            });
    }

    function checkAlreadyinsertedimportUserdata(playerEmail, guard1Email)
    {
        var inputjson = {player_email: playerEmail, guard_1_email: guard1Email}
            return Importusersdata.find(inputjson).then(function(result){
               // console.log('----result----', result)
                //return result !== null;
                if( result.length==0)
                {
                    return true
                }else{
                    return result;
                }
        });
    }
function getValidEmail(email)
{
    var inputjson = {email_address: email}
    return Users.find(inputjson).then(function(result){
        //console.log('----result----', result)
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

function updateImportsLogs(id, json)
{
    Importuserslog.findByIdAndUpdate(id, json, {new: true})
    .then(logs => {
        if(!logs) {
            return false
        }else{
            return true
        }   
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

function updateImportsData(id, json)
{
    Importusersdata.findByIdAndUpdate(id, json, {new: true})
    .then(logs => {
        if(!logs) {
            return false
        }else{
            //console.log('----updated import user data----')
            return true
        }   
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
            .then(logdata => {
                    if(logger.exitOnError == true){
                    logger.log('info',`${cname} - create DB response`)
                    }
                if( logdata._id ){
                            var json = {
                                imported_file_id                        : logdata._id,
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
                            
                            Importuserslog.findByIdAndUpdate(logdata._id, json, {new: true}, function (err, place) {

                                var csvFilePaths = req.body.imported_file_url;//'https://firebasestorage.googleapis.com/v0/b/sportsgravy-testing.appspot.com/o/Z1wiLsm7q22taU6KNCOo_1600251030051_standard_user_import_template.csv?alt=media&token=ac5ec6cd-7034-4ba7-9931-69fe8da129e2';
    
                                        var successUserCount = 0;
                                        var errorUserRecordCount = 0;
                                        var totalUserRecordCount = 0;

                                            readCSV(csvFilePaths).then( data => {
                                                //console.log('----read data----', data)
                                                if( data != undefined && data.length>0)
                                                {
                                                    data.forEach( da => {
                                                        //console.log('----da----', da)

                                                        var importUserDatainsertedId = '';


                                                        
                                                        checkAlreadyinsertedimportUserdata(da.athlete_1_email,da.guardian_1_email_1).then( chkimusersdata => {
                                                            if( chkimusersdata == true)
                                                            {
                                                                
                                                                importusersdatainsert(da, logdata._id)
                                                                
                                                            }
                                                        })
                                                        
                                                        let errorDes = [];
                                                        let error_for_status = [];
                                                        
                                                        var quardiansCount = 0;
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
                                                                        quardiansCount = quardiansCount + 1
                                                                        totalUserRecordCount = totalUserRecordCount + 1;
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
                                                                        quardiansCount = quardiansCount + 1
                                                                        totalUserRecordCount = totalUserRecordCount + 1;
                                                                        quardUserId.push( new ObjectID(quard1._id) );
                                                                    }).catch(err => {
                                                                        res.status(500).send({
                                                                            message: err.message || "Some error occurred while creating the Data."
                                                                        });
                                                                    });
                                                                }
                                                            })
                                                        }else{

                                                            checkAlreadyinsertedimportUserdata(da.athlete_1_email,da.guardian_1_email_1).then( chkimusersdata => {
                                                                if( chkimusersdata != true)
                                                                {
                                                                    //console.log('----invalid Email data----' , chkimusersdata )
                                                                    errorDes = errorDes.concat(chkimusersdata[0].error_description);
                                                                    error_for_status = error_for_status.concat(chkimusersdata[0].error_for_status);
                                                                    errorDes.push({ "property_name": "guard_1_email", "is_required": true });
                                                                    error_for_status.push("Guardian EmailID is Required");
                                                                    updateImportsData(chkimusersdata[0]._id, {processed_flag:"e",error_description: errorDes, error_for_status: error_for_status });
                                                                }
                                                            })
                                                        }
                                                        setTimeout(() => {
                                                            
                                                            
                                                            var json = {total_records_found: data.length,guardian_records_created: quardiansCount, total_guardains_found : quardiansCount};
                                                            //console.log('----update json----',json)
                                                            updateImportsLogs(logdata._id, json);

                                                            if( da.athlete_1_first_name != undefined && da.athlete_1_first_name != ''
                                                            && da.athlete_1_last_name != undefined && da.athlete_1_last_name != '' 
                                                            &&  da.athlete_1_email != undefined && da.athlete_1_email !=  '' 
                                                            && da.athlete_1_dob != undefined && da.athlete_1_dob !=''
                                                            && quardUserId.length>0)
                                                            {
                                                                
                                                                
                                                                getValidEmail(da.athlete_1_email).then( atheletdata =>  {
                                                                    if( atheletdata == true)
                                                                    {
                                                                        checkUsersLevel(da.athlete_1_level, req.body.organization_id).then( leveldata => {
                                                                            if( leveldata != true)
                                                                            {

                                                                                let dob = Date.parse(da.athlete_1_dob);

                                                                                if( dob !== NaN)
                                                                                {
                                                                                    successUserCount = successUserCount+1;
                                                                                    totalUserRecordCount = totalUserRecordCount + 1;
                                                                                    //console.log('---quardUserId----', quardUserId)
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
                                                                                        //console.log('---atheleteinsertJson----', atheleteinsertJson)
                                                                                        atheleteinsertJson.save()
                                                                                                .then(athelete => {
                                                                                                    //console.log('-----athelete----', athelete)

                                                                                                    checkAlreadyinsertedimportUserdata(da.athlete_1_email,da.guardian_1_email_1).then( chkimusersdata => {
                                                                                                        if( chkimusersdata != true)
                                                                                                        {
                                                                                                            //console.log('----invalid Email data----' , chkimusersdata )
                                                                                                            updateImportsData(chkimusersdata[0]._id, {processed_flag:"N"});
                                                                                                        }
                                                                                                    })

                                                                                                    atheleteUserId = athelete._id
                                                                                                }).catch(err => {
                                                                                                    res.status(500).send({
                                                                                                        message: err.message || "Some error occurred while creating the Data."
                                                                                                    });
                                                                                                });
                                                                                }else{

                                                                                    checkAlreadyinsertedimportUserdata(da.athlete_1_email,da.guardian_1_email_1).then( chkimusersdata => {
                                                                                        if( chkimusersdata != true)
                                                                                        {
                                                                                            errorDes = errorDes.concat(chkimusersdata[0].error_description);
                                                                                            error_for_status = error_for_status.concat(chkimusersdata[0].error_for_status);
                                                                                            errorDes.push({ "property_name": "player_dob", "is_required": true });
                                                                                            error_for_status.push("Player Date of Birth is invalid");
                                                                                            updateImportsData(chkimusersdata[0]._id, {processed_flag:"e",error_description: errorDes, error_for_status: error_for_status });
                                                                                        }
                                                                                    })
                                                                                }
                                                                                
                                                                            }else{

                                                                                checkAlreadyinsertedimportUserdata(da.athlete_1_email,da.guardian_1_email_1).then( chkimusersdata => {
                                                                                    if( chkimusersdata != true)
                                                                                    {
                                                                                        //console.log('----invalid level id----' , chkimusersdata )
                                                                                        errorDes = errorDes.concat(chkimusersdata[0].error_description);
                                                                                        error_for_status = error_for_status.concat(chkimusersdata[0].error_for_status);
                                                                                        errorDes.push({ "property_name": "player_level", "is_required": true, "error": "Level is not available in selected sport. Kindly create and upload" });
                                                                                        error_for_status.push("Invalid Level")
                                                                                        updateImportsData(chkimusersdata[0]._id, {processed_flag:"e",error_description: errorDes, error_for_status: error_for_status });
                                                                                    }
                                                                                })
                                                                                errorUserRecordCount = errorUserRecordCount + 1
                                                                            }
                                                                        })
                                                                        
                                                                    }else{
                                                                        checkAlreadyinsertedimportUserdata(da.athlete_1_email,da.guardian_1_email_1).then( chkimusersdata => {
                                                                            if( chkimusersdata != true)
                                                                            {
                                                                                //console.log('----invalid Email data----' , chkimusersdata )
                                                                                errorDes = errorDes.concat(chkimusersdata[0].error_description);
                                                                                error_for_status = error_for_status.concat(chkimusersdata[0].error_for_status);
                                                                                errorDes.push({ "property_name": "player_email", "is_required": true, "error": "Player Email already Exist" });
                                                                                error_for_status.push("Player Email already Exist")
                                                                                updateImportsData(chkimusersdata[0]._id, {processed_flag:"e",error_description: errorDes, error_for_status: error_for_status});
                                                                            }
                                                                        })
                                                                        errorUserRecordCount = errorUserRecordCount + 1
                                                                    }
                                                                })
                                                                
                                                            }else{
                                                                

                                                                checkAlreadyinsertedimportUserdata(da.athlete_1_email,da.guardian_1_email_1).then( chkimusersdata => {
                                                                    if( chkimusersdata != true)
                                                                    {

                                                                        if(!da.athlete_1_first_name)
                                                                        {
                                                                            errorDes.push({ "property_name": "player_first_name", "is_required": true });
                                                                            error_for_status.push("Player Firstname is required");
                                                                        }if(!da.athlete_1_last_name)
                                                                        {
                                                                            errorDes.push({ "property_name": "player_last_name", "is_required": true });
                                                                            error_for_status.push("Player Lastname is required");
                                                                        }if(!da.athlete_1_dob)
                                                                        {
                                                                            errorDes.push({ "property_name": "player_dob", "is_required": true });
                                                                            error_for_status.push("Player DOB is required");
                                                                        }
                                                                        updateImportsData(chkimusersdata[0]._id, {processed_flag:"e",error_description: errorDes, error_for_status: error_for_status});

                                                                    }
                                                                })
                                                                

                                                                
                                                                errorUserRecordCount = errorUserRecordCount + 1
                                                                
                                                            } 
                                                        }, 2000);
                                                        
                                                    })
                                                }
                                                
                                            })

                                            setTimeout(() => {
                                                var updatejson = { processed_records : successUserCount, error_records: errorUserRecordCount, total_records:  totalUserRecordCount, player_records_created: successUserCount};
                                                //console.log('----updatejson----', updatejson)
                                                updateImportsLogs(logdata._id, updatejson);  
                                            }, 10000);
                                            

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

exports.updateimportuserdata = (req, res) => {


    Importusersdata.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(importuserdata => {
        if(!importuserdata) {

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

        res.send(importuserdata);
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

exports.findbylogAll =  (req, res) => {

    if(logger.exitOnError == true)
    {
        logger.log('info',`${cname} - List All by import user log Id API Service Request`)   
    }

    var logId = req.params.id;

    Importusersdata.find({import_user_log_id: logId})
    .then(importuserdata => {
      if(logger.exitOnError == true)
      {
          logger.log('info',`${cname} - List All by import user log Id API Service Response`)   
      }
        res.send(importuserdata);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

exports.findbyid = (req, res) => {

    if(logger.exitOnError == true){
        logger.log('info',`${cname} - Get by Id API service Request`)
        }
        
    Importusersdata.findById(req.params.id)
                .then(userdata => {
                    if(!userdata) {
                
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
                
                    res.send(userdata);
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
