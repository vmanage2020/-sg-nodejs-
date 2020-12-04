const mongoose = require('mongoose');

var teammembersSchema = new mongoose.Schema({
    coach:{
        players_count:{type:String},
        display_name:{type:String},
        user_list:{type:Array},
        season_id:{type:String},
        sport_id:{type:String},
        people_id:{type:String},
        organization_id:{type:String},
        team_id:{type:String}
    },
    manager: {
        players_count:{type:String},
        display_name:{type:String},
        user_list:{type:Array},
        season_id:{type:String},
        sport_id:{type:String},
        people_id:{type:String},
        organization_id:{type:String},
        team_id:{type:String}
    },
    player: {
        players_count:{type:String},
        display_name:{type:String},
        user_list:{type:Array},
        season_id:{type:String},
        sport_id:{type:String},
        people_id:{type:String},
        organization_id:{type:String},
        team_id:{type:String}
    },
    team_id: {
        type: String
    },
    created_datetime: {
        type: Date, default:Date.now()
    }

});

// Custom validation for email
/*employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

//mongoose.model('states', stateSchema);
module.exports = mongoose.model('team_members', teammembersSchema);