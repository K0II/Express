var main = require('./handlers/main');
var contest = require('./handlers/contest');
var nursery = require('./handlers/nurseryRhyme');
var newsletter = require('./handlers/newsletter');
var processContact = require('./handlers/processContact');
var vacation = require('./handlers/vacation');

module.exports = function(app){
    app.get('/', main.home);
    app.get('/about', main.about);
    app.get('/headers', main.header);
    app.get('/error', main.error);
    app.get('/thank-you', main.thankYou);
    app.get('/test', main.test);
    app.get('/no-layout', main.noLayout);

    app.get('/contest/vacation-photo', contest.vacationPhoto);
    app.post('/contest/vacation-photo/:year/:month', contest.vacationPhotoPost);

    app.get('/nursery-rhyme', nursery.nurseryRhyme );
    app.get('/data/nursery-rhyme', nursery.nurseryRhymeAjax );

    app.get('/newsletter', newsletter.newsLetter);

    app.get('/process-contact', processContact.processPage );
    app.post('/process-contact', processContact.processPost);
    app.post('/process', processContact.processAjax);

    app.get('/vacation', vacation.vacation);
    app.get('/notify-me-when-in-season', vacation.notifyMeWhenInSeason);
    app.post('/notify-me-when-in-season',vacation.notifyMeWhenInSeasonPost);
}
