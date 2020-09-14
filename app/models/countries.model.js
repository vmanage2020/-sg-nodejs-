const mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
    country_code: {
        type: String
    },
    name: {
        type: String
    },
    dial_code: {
        type: String
    }
});

// Custom validation for email
/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

//mongoose.model('countries', countrySchema);
module.exports = mongoose.model('countries', countrySchema);
