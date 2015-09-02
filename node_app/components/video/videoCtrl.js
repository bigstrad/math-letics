// TODO remove hard-coding and finalize logic!

// models
var Video           = require('./videoModel'),
    config          = require('../../../node_app_config/config'),
    fs              = require('fs'),
    path            = require('path');

exports.add_routes = function (app, router, passport) {
    router.get('/api/getPoster/:id', isLoggedIn, function(req, res, next) {
        var publicId = "" + req.params.id;
        var privateId = "";

        // temp !!!
        if(publicId=="1"){
            privateId = "lukedrills1.png";
        } else {
            privateId = "lukedrills2.png";
        }

        var actualPath = path.join(config.video.path, privateId);

        console.log("getPoster::actualPath",actualPath);

        var img = fs.readFileSync(actualPath);
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');

    });

    router.get('/api/getVideo/:format/:id', isLoggedIn, function(req, res, next) {
        var format = "" + req.params.format;
        var publicId = "" + req.params.id;
        var privateId = "";

        // temp !!!
        if(publicId=="1"){
            if(format.toLowerCase()=="mp4".toLowerCase()) {
                privateId = "lukedrills1.m4v";
            }
        } else {
            if(format.toLowerCase()=="mp4".toLowerCase()) {
                privateId = "lukedrills2.m4v";
            }
        }

        var actualPath = path.join(config.video.path, privateId);

        console.log("getVideo::actualPath",actualPath);

        var stat = fs.statSync(actualPath);
        var total = stat.size;
        if (req.headers['range']) {
            var range = req.headers.range;
            console.log("range found==>",range);
            var parts = range.replace(/bytes=/, "" +
                "" +
                "" +
                "").split("-");
            var partialstart = parts[0];
            var partialend = parts[1];

            //var partialstart = 14729763; //18971911;
            //var partialend = null; // 30902368;

            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : total-1;
            var chunksize = (end-start)+1;
            console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

            var file = fs.createReadStream(actualPath, {start: start, end: end});
            res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
            file.pipe(res);
        } else {
            console.log('ALL: ' + total);
            res.writeHead(206, { 'Content-Length': total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4'});
            fs.createReadStream(actualPath).pipe(res);
        }

    });

    /*
    router.get('/api/findVideo', isLoggedIn, function(req, res, next) {
        Video.find(function(err, obj) {
            if (err) { return next(err); }
            res.json(obj); // return data in JSON format
        });
    });*/

    /*
    router.get('/api/removeCat/:id', isLoggedIn, function(req, res, next) {
        var id = "" + req.params.id;
        Cat.findOne({_id: id}, function(err, obj){
            if (err) { return next(err); }
            if(obj) {
                obj.remove()
                res.send("removed id:"+ id);
            } else {
                res.send("id not found");
            }
        });
    });


    router.get('/api/saveCat', isLoggedIn, function(req, res, next) {
        var name = generateId();
        var cat = new Cat({
            name: "cat-"+name,
            body: "body for cat-"+name,
            comments: [
                { body: "comment for cat-"+name, date: new Date() }
            ],
            //date: { type: Date, default: Date.now },
            protected: false,
            meta: {
                votes: 0,
                favs: 0
            }
        });

        cat.save(function (err, obj) {
            if (err) { return next(err); }
            cat.speak();
            res.send("saved:"+ cat.name);
        });
    });
*/

}

/*
// private functions
function generateId() {
    var genName = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        genName += possible.charAt(Math.floor(Math.random() * possible.length));
    return genName;
}*/


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    console.log("not authenticated!");
    // if they aren't redirect them to the home page
    //res.redirect('/');
    //req.end;

    // for now - return next();
    return next();
}