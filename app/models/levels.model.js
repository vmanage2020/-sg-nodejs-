const mongoose = require('mongoose');

var levelSchema = new mongoose.Schema({
    level_name: {
        type: String
    },
    organization_id: {
        type: String
    },
    abbreviation: {
        type: String
    },
    description: {
        type: String
    },
    copied_from: {
        type: String
    },
    level_id: {
        type: String
    },
    sport_id: {
        type: String
    },
    is_deleted: {
        type: Boolean
    },
    sport_name: {
        type: String
    },
    is_active: {
        type: Boolean
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
    },
    keywords: {
        type : Array , default : []
    }
});

// Custom validation for email
/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

//mongoose.model('states', stateSchema);
module.exports = mongoose.model('levels', levelSchema);
