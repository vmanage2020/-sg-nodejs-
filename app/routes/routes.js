module.exports = (app) => {
    const country             = require('../controllers/countries.controller.js');
    const states              = require('../controllers/states.controller.js');
    const roles               = require('../controllers/roles.controller.js');
    const sports              = require('../controllers/sports.controller.js');
    const positions           = require('../controllers/positions.controller.js');
    const levels              = require('../controllers/levels.controller.js');
    const tags                = require('../controllers/tags.controller.js');
    const cannedresponse      = require('../controllers/cannedresponse.controller.js');
    const coachcustomfield    = require('../controllers/coachcustomfield.controller.js');
    const managercustomfield  = require('../controllers/managercustomfield.controller.js');    
    const playermetadata      = require('../controllers/playermetadata.controller.js');
    
    const users               = require('../controllers/users.controller.js');
    const teams               = require('../controllers/teams.controller.js');
    const seasons             = require('../controllers/seasons.controller.js');
    const organization        = require('../controllers/organization.controller.js');

    const feeds               = require('../controllers/feeds.controller.js');
    const feedcomments        = require('../controllers/feedcomments.controller.js');

    const importuserslog      = require('../controllers/importuserslog.controller.js');

    // Country
    app.post('/countries', country.create);
    app.get('/countries', country.findAll);
    app.get('/countries/:id', country.findOne);
    app.put('/countries/:id', country.update);
    app.delete('/countries/:id', country.delete);
    
    app.get('/countriesdropdown', country.findAll);
    
    
    // State
    app.post('/states', states.create);    
    app.get('/states', states.findAll);    
    app.get('/states/:id', states.findOne);   
    app.put('/states/:id', states.update);    
    app.delete('/states/:id', states.delete);
    
    app.get('/statesdropdown', states.findAll); 
    
    // Roles
    app.post('/roles', roles.create);    
    app.get('/roles', roles.findAll);    
    app.get('/roles/:id', roles.findOne);   
    app.put('/roles/:id', roles.update);    
    app.delete('/roles/:id', roles.delete);
    
    app.get('/rolesdropdown', roles.findAll); 
    
    // Sports
    app.post('/sports', sports.create);    
    app.get('/sports', sports.findAll);    
    app.get('/sports/:id', sports.findOne);   
    app.put('/sports/:id', sports.update);    
    app.delete('/sports/:id', sports.delete);
    
    app.get('/sportsbycountry/:id', sports.findsportsbycountry);  
    app.get('/sportsdropdown', sports.findAll);
    
    // Positions
    app.post('/positions', positions.create);    
    app.get('/positions', positions.findAll);    
    app.get('/positions/:id', positions.findOne);   
    app.put('/positions/:id', positions.update);    
    app.delete('/positions/:id', positions.delete);
    
    app.get('/positionsbysports/:id', positions.findbySportsAll);
    
    // Levels
    app.post('/levels', levels.create);    
    app.get('/levels', levels.findAll);    
    app.get('/levels/:id', levels.findOne);   
    app.put('/levels/:id', levels.update);    
    app.delete('/levels/:id', levels.delete);
    
    app.get('/levelsbyorg/:id', levels.findbyOrgAll);
    
    // Tags
    app.post('/tags', tags.create);    
    app.get('/tags', tags.findAll);    
    app.get('/tags/:id', tags.findOne);   
    app.put('/tags/:id', tags.update);    
    app.delete('/tags/:id', tags.delete);
    
    app.get('/tagsbyorg/:id', tags.findbyOrgAll); 
    
    // Cannedresponse
    app.post('/cannedresponse', cannedresponse.create);    
    app.get('/cannedresponse', cannedresponse.findAll);    
    app.get('/cannedresponse/:id', cannedresponse.findOne);   
    app.put('/cannedresponse/:id', cannedresponse.update);    
    app.delete('/cannedresponse/:id', cannedresponse.delete);
    
    app.get('/cannedresponsebyorg/:id', cannedresponse.findbyOrgAll); 
    
    // Coach
    app.post('/coachcustomfield', coachcustomfield.create);    
    app.get('/coachcustomfield', coachcustomfield.findAll);    
    app.get('/coachcustomfield/:id', coachcustomfield.findOne);   
    app.put('/coachcustomfield/:id', coachcustomfield.update);    
    app.delete('/coachcustomfield/:id', coachcustomfield.delete);
    
    app.get('/coachcustomfieldbyorg/:id', coachcustomfield.findbyOrgAll);  
    
    // Manager
    app.post('/managercustomfield', managercustomfield.create);    
    app.get('/managercustomfield', managercustomfield.findAll);    
    app.get('/managercustomfield/:id', managercustomfield.findOne);   
    app.put('/managercustomfield/:id', managercustomfield.update);    
    app.delete('/managercustomfield/:id', managercustomfield.delete);
    
    app.get('/managercustomfieldbyorg/:id', managercustomfield.findbyOrgAll); 
    
    // Player Meta data
    app.post('/playermetadata', playermetadata.create);    
    app.get('/playermetadata', playermetadata.findAll);    
    app.get('/playermetadata/:id', playermetadata.findOne);   
    app.put('/playermetadata/:id', playermetadata.update);    
    app.delete('/playermetadata/:id', playermetadata.delete);
    
    app.get('/playermetadatabyorg/:id', playermetadata.findbyOrgAll); 
    
    //Users
    app.post('/users', users.create);    
    app.get('/users', users.findAll);    
    app.get('/users/:id', users.findOne);   
    app.put('/users/:id', users.update);    
    app.delete('/users/:id', users.delete);

    app.get('/usersbyorg/:id', users.findbyOrgAll);   
    
    // Teams
    app.post('/teams', teams.create);    
    app.get('/teams', teams.findAll);    
    app.get('/teams/:id', teams.findOne);   
    app.put('/teams/:id', teams.update);    
    app.delete('/teams/:id', teams.delete);
    
    // Seasons
    app.post('/seasons', seasons.create);    
    app.get('/seasons', seasons.findAll);    
    app.get('/seasons/:id', seasons.findOne);   
    app.put('/seasons/:id', seasons.update);    
    app.delete('/seasons/:id', seasons.delete);

    app.get('/seasonsbyorg/:id', seasons.findseasonbyorg);  
    app.get('/seasonsbysports/:id', seasons.findseasonbysports);  
    
    // Organizations
    app.post('/organization', organization.create);    
    app.get('/organization', organization.findAll);    
    app.get('/organization/:id', organization.findOne);   
    app.put('/organization/:id', organization.update);    
    app.delete('/organization/:id', organization.delete);

    app.get('/organizationprofile/:id', organization.findOne);
    app.put('/organizationprofile/:id', organization.update);    
    app.get('/organizationdropdown', organization.findAll);

    app.get('/organizationsports/:id', organization.findorganizationsportsAll);
    
    app.get('/organizationnationalgoverningbyid/:country/:sport', organization.findNationalGovAll);   
    app.get('/organizationstategoverningbyid/:country/:state/:sport', organization.findStateGovAll);

    //Feed
    app.post('/feeds', feeds.create);    
    app.get('/feeds', feeds.findAll);    
    app.get('/feeds/:id', feeds.findOne);   
    app.put('/feeds/:id', feeds.update);    
    app.delete('/feeds/:id', feeds.delete); 

    //Feedcomment
    app.post('/feedcomments', feedcomments.create);
    app.get('/feedcomments/:id', feedcomments.findbyFeedAll);
    app.delete('/feedcomments/:id', feedcomments.delete);

    //Import user logs
    app.post('/importuserlogs', importuserslog.create);   
    app.get('/importuserlogsdbyorg/:id', importuserslog.findbyOrgAll);  
    app.get('/importuserlogs/:id', importuserslog.findOne);
    
}
