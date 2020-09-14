const mongoose = require('mongoose');

var sportsSchema = new mongoose.Schema({
    country: {
        type: String
    },
    isUsed: {
        type: Boolean
    },
    sport: {
        type: String
    },
    updated_datetime: {
        type: Date, default:Date.now()
    },
    keywordForCountry: {
        type: Array
    },
    keywords: {
        type: Array
    },
    created_uid: {
        type: String
    },
    created_datetime: {
        type: Date, default:Date.now()
    },
    created_date: {
        type: Date, default:Date.now()
    },
    name: {
        type: String
    },
    sport_id: {
        type: String
    },
    country_code: {
        type: String
    },
    updated_uid: {
        type: String
    },
    keywordForSportName: {
        type: Array
    },
    keywordForDateTime: {
        type: Array
    },
    subCollection: {
        type: Object
    }
});

// Custom validation for email
/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

module.exports = mongoose.model('sports', sportsSchema);
