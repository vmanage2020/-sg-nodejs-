const mongoose = require('mongoose');

var importusersSchema = new mongoose.Schema({
    imported_file_id: {
        type: String
    },
    error_records: {
        type: String
    },
    season_id: {
        type: String
    },
    file_id: {
        type: String
    },
    imported_file_url: {
        type: String
    },
    season_end_date: {
        type: Date, default:Date.now()
    },
    season_name: {
        type: String
    },
    imported_file_template: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    season_start_date: {
        type: Date, default:Date.now()
    },
    processed_Flag: {
        type: String
    },
    total_players_found: {
        type: String
    },
    status: {
        type: Array
    },
    player_duplicate_records_found: {
        type: String
    },
    erroDes:{
        type: Array
    },
    player_records_created: {
        type: String
    },
    sports_name: {
        type: String
    },
    imported_by: {
        type: String
    },
    total_guardains_found: {
        type: String
    },
    processed_records: {
        type: String
    },
    imported_user_id: {
        type: String
    },
    imported_datetime: {
        type: Date, default:Date.now()
    },
    organization_id: {
        type: String
    },
    total_records_found: {
        type: String
    },
    total_records: {
        type: String
    },
    guardian_records_created: {
        type: String
    },
    guardian_duplicate_records_found: {
        type: String
    },
    imported_file_name: {
        type: String
    },
    sports_id: {
        type: String
    }
});

// Custom validation for email
/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

//mongoose.model('states', stateSchema);
module.exports = mongoose.model('import_users_logs', importusersSchema);
