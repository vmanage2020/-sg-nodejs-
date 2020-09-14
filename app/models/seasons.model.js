const mongoose = require('mongoose');

var seasonsSchema = new mongoose.Schema({
    season_start_date: {
        type: String
    },
    sports_id: {
        type: String
    },
    season_end_date: {
        type: String
    },
    sports_name: {
        type: Array
    },
    season: {
        type: String
    },
    organization_id: {
        type: String
    },
    season_id: {
        type: String
    },
    isUsed: {
        type: Boolean
    },
    organization_abbreviation: {
        type: String
    },
    season_name: {
        type: String
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
        type: Date, default:Date.now()
    },
    updated_datetime: {
        type: Date, default:Date.now()
    }
});

// Custom validation for email
/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

//mongoose.model('states', stateSchema);
module.exports = mongoose.model('seasons', seasonsSchema);
