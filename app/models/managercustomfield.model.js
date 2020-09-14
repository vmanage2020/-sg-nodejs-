const mongoose = require('mongoose');

var managerSchema = new mongoose.Schema({
    sport_id: {
        type: String
    },
    is_active: {
        type: Boolean
    },
    value: {
        type : Array
    },
    updated_datetime: {
        type: Date, default:Date.now()
    },
    created_datetime: {
        type: Date, default:Date.now()
    },
    is_deletable: {
        type: Boolean
    },
    is_required: {
        type: Boolean
    },
    is_editable: {
        type: Boolean
    },
    field_id: {
        type: String
    },
    organization_id: {
        type: String
    },
    created_uid: {
        type: String
    },
    updated_uid: {
        type: String
    },
    field_name: {
        type: String
    },
    field_type: {
        type: String
    },
    is_deleted: {
        type: Boolean
    },
    sport: {
        type: String
    }
});

// Custom validation for email
/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

//mongoose.model('countries', countrySchema);
module.exports = mongoose.model('managercustomfields', managerSchema);
