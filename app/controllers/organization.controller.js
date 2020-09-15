
const Organization = require('../models/organization.model.js');
const Sports = require('../models/sports.model.js');

// Create and Save a new Data
exports.create = (req, res) => {
     
     //validation
    if(!req.body.sports) {
        return res.status(400).send({
            message: "Sport can not be empty"
        });
    }
    if(!req.body.street1) {
        return res.status(400).send({
            message: "Street1 can not be empty"
        });
    }
    if(!req.body.state_code) {
        return res.status(400).send({
            message: "State can not be empty"
        });
    }
    if(!req.body.email_address) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }
    if(!req.body.phone) {
        return res.status(400).send({
            message: "Phone can not be empty"
        });
    }
    /*if(!req.body.primary_first_name) {
        return res.status(400).send({
            message: "Firstname can not be empty"
        });
    }
    if(!req.body.primary_last_name) {
        return res.status(400).send({
            message: "Lastname can not be empty"
        });
    }
    if(!req.body.state) {
        return res.status(400).send({
            message: "State can not be empty"
        });
    }
    if(!req.body.country_code) {
        return res.status(400).send({
            message: "Country code can not be empty"
        });
    }
    if(!req.body.governing_body_info) {
        return res.status(400).send({
            message: "Governing body can not be empty"
        });
    }
    if(!req.body.governing_key_array_fields) {
        return res.status(400).send({
            message: "Governing Key fields can not be empty"
        });
    }
    if(!req.body.country) {
        return res.status(400).send({
            message: "Country can not be empty"
        });
    }
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }
    if(!req.body.mobile_phone) {
        return res.status(400).send({
            message: "Mobile phone can not be empty"
        });
    }
    if(!req.body.abbrev) {
        return res.status(400).send({
            message: "Abbreviation can not be empty"
        });
    }
    if(!req.body.primary_admin_email) {
        return res.status(400).send({
            message: "Primary Admin Email can not be empty"
        });
    }*/
         
    // Create a Data
    const organization = new Organization({
        street1                           : req.body.street1, 
        avatar                            : req.body.avatar,
        sports                            : req.body.sports,
        street2                           : req.body.street2,
        state_code                        : req.body.state_code,
        email_address                     : req.body.email_address,
        phone                             : req.body.phone,
        primary_user_id                   : req.body.primary_user_id,        
        city                              : req.body.city,
        isNewPrimaryUser                  : req.body.isNewPrimaryUser,
        primary_first_name                : req.body.primary_first_name,        
        primary_middle_initial            : req.body.primary_middle_initial,
        stateGoverningOrganizations       : req.body.stateGoverningOrganizations,
        state                             : req.body.state,
        primary_last_name                 : req.body.primary_last_name,
        fax                               : req.body.fax,
        country_code                      : req.body.country_code,
        governing_body_info               : req.body.governing_body_info,
        country                           : req.body.country,
        name                              : req.body.name,
        keywordForPhone                   : req.body.keywordForPhone,
        governing_key_array_fields        : req.body.governing_key_array_fields,
        mobile_phone                      : req.body.mobile_phone,
        abbrev                            : req.body.abbrev,
        primary_suffix                    : req.body.primary_suffix,
        nationalGoverningOrganizations    : req.body.nationalGoverningOrganizations,
        primary_admin_email               : req.body.primary_admin_email,
        secondary_first_name              : req.body.secondary_first_name,
        secondary_middle_initial          : req.body.secondary_middle_initial,
        secondary_last_name               : req.body.secondary_last_name,
        secondary_suffix                  : req.body.secondary_suffix,
        secondary_admin_email             : req.body.secondary_admin_email,
        secondary_user_id                 : req.body.secondary_user_id,
        website                           : req.body.website,
        postal_code                       : req.body.postal_code,
        created_uid                       : req.body.created_uid,
        updated_uid                       : req.body.updated_uid,
        created_datetime                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    });

    // Save Data in the database
    organization.save()
    .then(data => {
    
              if( data._id ){
                    var json = {
				street1                           : req.body.street1, 
                                      avatar                            : req.body.avatar,
                                      sports                            : req.body.sports,
                                      street2                           : req.body.street2,
                                      state_code                        : req.body.state_code,
                                      email_address                     : req.body.email_address,
                                      phone                             : req.body.phone,
                                      primary_user_id                   : req.body.primary_user_id,        
                                      city                              : req.body.city,
                                      isNewPrimaryUser                  : req.body.isNewPrimaryUser,
                                      primary_first_name                : req.body.primary_first_name,        
                                      primary_middle_initial            : req.body.primary_middle_initial,
                                      stateGoverningOrganizations       : req.body.stateGoverningOrganizations,
                                      state                             : req.body.state,
                                      primary_last_name                 : req.body.primary_last_name,
                                      fax                               : req.body.fax,
                                      country_code                      : req.body.country_code,
                                      governing_body_info               : req.body.governing_body_info,
                                      country                           : req.body.country,
                                      name                              : req.body.name,
                                      keywordForPhone                   : req.body.keywordForPhone,
                                      governing_key_array_fields        : req.body.governing_key_array_fields,
                                      organization_id                   : data._id,
                                      mobile_phone                      : req.body.mobile_phone,
                                      abbrev                            : req.body.abbrev,
                                      primary_suffix                    : req.body.primary_suffix,
                                      nationalGoverningOrganizations    : req.body.nationalGoverningOrganizations,
                                      primary_admin_email               : req.body.primary_admin_email,
                                      secondary_first_name              : req.body.secondary_first_name,
                                      secondary_middle_initial          : req.body.secondary_middle_initial,
                                      secondary_last_name               : req.body.secondary_last_name,
                                      secondary_suffix                  : req.body.secondary_suffix,
                                      secondary_admin_email             : req.body.secondary_admin_email,
                                      secondary_user_id                 : req.body.secondary_user_id,
                                      website                           : req.body.website,
                                      postal_code                       : req.body.postal_code,
                                      created_uid                       : req.body.created_uid,
                                      updated_uid                       : req.body.updated_uid,
                                      created_datetime                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
			}
			
			Organization.findByIdAndUpdate(data._id, json, {new: true}, function (err, orgdata) {
			//console.log('---orgdata----', orgdata);
                                res.send(orgdata);
                              });
              }
        //res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Data."
        });
    });
    
};

// Retrieve and return all Data from the database.
exports.findAll = (req, res) => {
          
        
          Organization.find()
              .then(organization => { 
                  res.send(organization);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

exports.findNationalGovAll = ( req, res) => {
    var country = req.params.country;
   
    var sport   = new Array(req.params.sport);
    //console.log('---country---', country, '---sport----', sport)
    Organization.find({"country_code":country, "sports": {$in: sport} })
    .then(organization => { 

        res.send(organization);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

exports.findStateGovAll = ( req, res) => {
    var country = req.params.country;
    var state = req.params.state;
    var sport   = new Array(req.params.sport);
    //console.log('---country---', country, '---sport----', sport)
    Organization.find({"country_code":country, "state_code": state, "sports": {$in: sport} })
    .then(organization => { 

        res.send(organization);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

exports.findorganizationsportsAll = ( req, res) => {

    var orgId = req.params.id;

    Organization.find({"organization_id":orgId}, {"sports": 1, "_id":0})
              .then(organization => { 

                var sportsIdArray = organization[0].sports;
                
                Sports.find({sport_id: { $in: sportsIdArray }})
              .then(sports => {
                
                  res.send(sports);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });


                  //res.send(organization);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Some error occurred while retrieving data."
                  });
              });
};

// Find a single Data with a DataId
exports.findOne = (req, res) => {
          
          Organization.findById(req.params.id)
    .then(organization => {
        if(!organization) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });            
        }
        res.send(organization);
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
     
     //validation
    if(!req.body.sports) {
        return res.status(400).send({
            message: "Sport can not be empty"
        });
    }
    if(!req.body.street1) {
        return res.status(400).send({
            message: "Street1 can not be empty"
        });
    }
    if(!req.body.state_code) {
        return res.status(400).send({
            message: "State can not be empty"
        });
    }
    if(!req.body.email_address) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }
    /*if(!req.body.phone) {
        return res.status(400).send({
            message: "Phone can not be empty"
        });
    }
    if(!req.body.primary_first_name) {
        return res.status(400).send({
            message: "Firstname can not be empty"
        });
    }
    if(!req.body.primary_last_name) {
        return res.status(400).send({
            message: "Lastname can not be empty"
        });
    }
    if(!req.body.state) {
        return res.status(400).send({
            message: "State can not be empty"
        });
    }
    if(!req.body.country_code) {
        return res.status(400).send({
            message: "Country code can not be empty"
        });
    }
    if(!req.body.governing_body_info) {
        return res.status(400).send({
            message: "Governing body can not be empty"
        });
    }
    if(!req.body.governing_key_array_fields) {
        return res.status(400).send({
            message: "Governing Key fields can not be empty"
        });
    }
    if(!req.body.country) {
        return res.status(400).send({
            message: "Country can not be empty"
        });
    }
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }
    if(!req.body.mobile_phone) {
        return res.status(400).send({
            message: "Mobile phone can not be empty"
        });
    }
    if(!req.body.abbrev) {
        return res.status(400).send({
            message: "Abbreviation can not be empty"
        });
    }
    if(!req.body.primary_admin_email) {
        return res.status(400).send({
            message: "Primary Admin Email can not be empty"
        });
    }*/
    // Find Data and update it with the request body
    Organization.findByIdAndUpdate(req.params.id, {
        street1                           : req.body.street1, 
        avatar                            : req.body.avatar,
        sports                            : req.body.sports,
        street2                           : req.body.street2,
        state_code                        : req.body.state_code,
        email_address                     : req.body.email_address,
        phone                             : req.body.phone,
        primary_user_id                   : req.body.primary_user_id,        
        city                              : req.body.city,
        isNewPrimaryUser                  : req.body.isNewPrimaryUser,
        primary_first_name                : req.body.primary_first_name,        
        primary_middle_initial            : req.body.primary_middle_initial,
        stateGoverningOrganizations       : req.body.stateGoverningOrganizations,
        state                             : req.body.state,
        primary_last_name                 : req.body.primary_last_name,
        fax                               : req.body.fax,
        country_code                      : req.body.country_code,
        governing_body_info               : req.body.governing_body_info,
        country                           : req.body.country,
        name                              : req.body.name,
        keywordForPhone                   : req.body.keywordForPhone,
        governing_key_array_fields        : req.body.governing_key_array_fields,       
        mobile_phone                      : req.body.mobile_phone,
        abbrev                            : req.body.abbrev,
        primary_suffix                    : req.body.primary_suffix,
        nationalGoverningOrganizations    : req.body.nationalGoverningOrganizations,
        primary_admin_email               : req.body.primary_admin_email,
        secondary_first_name              : req.body.secondary_first_name,
        secondary_middle_initial          : req.body.secondary_middle_initial,
        secondary_last_name               : req.body.secondary_last_name,
        secondary_suffix                  : req.body.secondary_suffix,
        secondary_admin_email             : req.body.secondary_admin_email,
        secondary_user_id                 : req.body.secondary_user_id,
        website                           : req.body.website,
        postal_code                       : req.body.postal_code,
        updated_uid                       : req.body.updated_uid,
        updated_datetime                  : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    }, {new: true})
    .then(organization => {
        if(!organization) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send(organization);
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

// Delete a Data with the specified dataId in the request
exports.delete = (req, res) => {
          Organization.findByIdAndRemove(req.params.id)
    .then(organization => {
        if(!organization) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
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
