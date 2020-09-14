const mongoose = require('mongoose');

var organizationSchema = new mongoose.Schema({
    street1: {
        type: String
    },
    avatar: {
        type: String
    },
    sports: {
        type: Array
    },
    street2: {
        type: Array
    },
    state_code: {
        type: String
    },
    email_address: {
        type: String
    },
    phone: {
        type: String
    },
    primary_user_id: {
        type: String
    },
    city: {
        type: String
    },
    isNewPrimaryUser: {
        type: Boolean
    },
    primary_first_name: {
        type: String
    },
    primary_middle_initial: {
        type: String
    },
    stateGoverningOrganizations: {
        type: Array
    },
    state: {
        type: String
    },
    primary_last_name: {
        type: String
    },
    fax: {
        type: String
    },
    country_code: {
        type: String
    },
    governing_body_info: {
        type: Array
    },
    country: {
        type: String
    },
    name: {
        type: String
    },
    keywordForPhone: {
        type: Array
    },
    governing_key_array_fields: {
        type: Array
    },
    organization_id: {
        type: String
    },
    mobile_phone: {
        type: String
    },
    abbrev: {
        type: Array
    },
    primary_suffix: {
        type: String
    },
    nationalGoverningOrganizations: {
          type: Array
    },
    primary_admin_email: {
        type: String
    },
    secondary_first_name: {
        type: String
    },
    secondary_last_name: {
        type: String
    },
    secondary_admin_email: {
        type: String
    },
    secondary_middle_initial: {
        type: String
    },
    secondary_suffix: {
        type: String
    },
    secondary_user_id: {
        type: String
    },
    website: {
        type: String
    },
    postal_code: {
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
module.exports = mongoose.model('organizations', organizationSchema);
