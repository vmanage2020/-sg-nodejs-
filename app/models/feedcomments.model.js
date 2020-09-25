const mongoose = require('mongoose');

var feedcommentsSchema = new mongoose.Schema({
    feed_id: {
        type: String
    },
    feed_comment_id:{
        type: String
    },
    first_name: {
        type: String
    },
    middle_initial: {
        type: String
    },
    last_name: {
        type: String
    },
    avatar: {
        type: String
    },
    suffix: {
        type: String
    },
    update_userid: {
        type: String
    },
    user_id: {
        type: String
    },
    comment_desc: {
        type: String
    },
    updated_dateTime: {
        type: Date, default:Date.now()
    },
    created_userid: {
        type: String
    },
    subCollection:{
        type: String
    }
});

// Custom validation for email
/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

//mongoose.model('states', stateSchema);
module.exports = mongoose.model('feed_comments', feedcommentsSchema);
