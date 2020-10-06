const mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    profile_image: {
        type: String
    },
    is_signup_completed: {
        type: Boolean
    },
    parent_user_id: {
        type: Array
    },
    country_code: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    postal_code: {
        type: String
    },
    dial_code: {
        type: String
    },
    suffix: {
        type: String
    },
    city: {
        type: String
    },
    street1: {
        type: String
    },
    organization_name: {
        type: String
    },
    organization_id: {
        type: String
    },
    user_id: {
        type: String
    },
    email_address: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    country: {
        type: String
    },
    last_name: {
        type: String
    },
    is_invited: {
        type: Boolean
    },
    state: {
        type: String
    },
    mobile_phone: {
        type: String
    },
    state_code: {
        type: String
    },
    street2: {
        type: String
    },
    middle_initial: {
        type: String
    },
    organizations: {
        type: Array
    },
    organization_abbrev: {
        type: String
    },
    role: {
        type: String
    },
    hasRoleEnabled: {
        type: Boolean
    },
    isUserDuplicated: {
        type: Boolean
    },
    roles: {
        type: Array
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
module.exports = mongoose.model('users', usersSchema);
