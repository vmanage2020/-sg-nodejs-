const mongoose = require('mongoose');

var importusersdataSchema = new mongoose.Schema({
    import_user_log_id:{
        type: String
    },
    player_first_name: {
        type: String
    },
    player_middle_name: {
        type: String
    },
    player_last_name: {
        type: String
    },
    player_dob: {
        type: String
    },
    player_gender: {
        type: String
    },
    player_level: {
        type: String
    },
    player_email: {
        type: String
    },
    player_address1: {
        type: String
    },
    player_address2: {
        type: String
    },
    player_city: {
        type: String
    },
    player_state: {
        type: String
    },
    player_postalcode: {
        type: String
    },
    player_country: {
        type: String
    },
    guard_1_firstname: {
        type: String
    },
    guard_1_lastname:{
        type: String
    },
    guard_1_phone: {
        type: String
    },
    guard_1_email: {
        type: String
    },
    guard_2_firstname: {
        type: String
    },
    guard_2_lastname: {
        type: String
    },
    guard_2_phone: {
        type: String
    },
    guard_2_email: {
        type: String
    },
    created_datetime: {
        type: Date, default:Date.now()
    },
    isRowReadyToProcess: {
        type: String
    },
    guardians: {
        type: String
    },
    players: {
        type: String
    },
    users: {
        type: String
    },
    error_description: {
        type: Array
    },
    error_for_status: {
        type: Array
    },
    processed_flag: {
        type: String
    },
    level_id: {
        type: String
    }

});

// Custom validation for email
/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

//mongoose.model('states', stateSchema);
module.exports = mongoose.model('import_users_datas', importusersdataSchema);
