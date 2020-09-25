const mongoose = require('mongoose');

var feedsSchema = new mongoose.Schema({
    feedPostedUser_suffix: {
        type: String
    },
    feedPostedOrg_id: {
        type: String
    },
    feedPostedUser_id: {
        type: String
    },
    feededLevel: {
        type: Array
    },
    feedPostedOrg_abbre: {
        type: String
    },
    feedPostedUser_avatar: {
        type: String
    },
    feedPostedUser_firstName: {
        type: String
    },
    feedToUserId: {
        type: Array
    },
    tag_name: {
        type: String
    },
    feedPostedDatetime: {
        type: Date, default:Date.now()
    },
    feedPostedUser_middleInitial: {
        type: String
    },
    lastSelectedFeededLevel: {
        type: String
    },
    feedPostedUser_role: {
        type: String
    },
    feedPostedUser_lastName: {
        type: String
    },
    cannedResponseDesc: {
        type: String
    },
    feedPostedOrg_name: {
        type: String
    },
    feededLevelObject: {
        type: Array
    },
    tag_id: {
        type: String
    },
    cannedResponseTitle: {
        type: String
    },
    feedText: {
        type: String
    },
    feed_id: {
        type: String
    },
    comments: {
        user_list:{
            type: Array
        },
        count: {
            type: String 
        }
    },
    likes:{
        user_list:{
            type: Array
        },
        count: {
            type: String 
        }
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
module.exports = mongoose.model('feeds', feedsSchema);
