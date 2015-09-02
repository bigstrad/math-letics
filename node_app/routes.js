"use strict";

var path = require('path');

//
// Add controllers =======================================================
//
var GlobalCtrl = require('./global/globalCtrl');
var VideoCtrl = require('./components/video/videoCtrl');

module.exports = function(app, router, passport) {

    //
    // Inject Controller routes ==========================================
    //
    GlobalCtrl.add_routes(app, router);
    VideoCtrl.add_routes(app, router);

    //
    // Send test ERROR ==================================================
    //
    router.get('/api/error', function(req, res, next) {
        return next(new Error("FORCED test error"));
    });


    //
    // Angular routes =========================================================
    //
    router.get('*', function(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public') });
    });

};

