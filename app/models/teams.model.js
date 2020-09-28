const mongoose = require('mongoose');

var teamsSchema = new mongoose.Schema({
    is_completed: {
        type: Boolean
    },
    season_id: {
        type: String
    },
    managers_count: {
        type: Boolean
    },
    level_name: {
        type: Array
    },
    players_count: {
        type: String
    },
    sport_name: {
        type: String
    },
    season_start_date: {
        type: String
    },
    organization_id: {
        type: String
    },
    season_end_date: {
        type: String
    },
    isMaster: {
        type: Boolean
    },
    season_lable: {
        type: String
    },
    coaches_count: {
        type: String
    },
    sport_id: {
        type: String
    },
    level: {
        type: String
    },
    team_name: {
        type: String
    },
    team_id: {
        type: String
    },
    level_id: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    organization_name: {
        type: String
    },
    created_uid: {
        type: String
    },
    updated_uid: {
        type: String
    },
    created_datetime: {
        type:String
    },
    updated_datetime: {
        type:String
    }
});



// Custom validation for email

/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

//mongoose.model('states', stateSchema);

module.exports = mongoose.model('teams', teamsSchema);
