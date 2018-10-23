// config/passport.js

// load all the things we need
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = (passport) => {
    //// =========================================================================
    //// passport session setup ==================================================
    //// =========================================================================
    //// required for persistent login sessions
    //// passport needs ability to serialize and unserialize members out of session

    // used to serialize the member for the session
    passport.serializeUser((member: JMath.IMember, done) => {
        global.logger.trace('passport.serializeUser', member);
        if (member)
            done(null, member._id);
    });

    //// used to deserialize the member
    passport.deserializeUser((id, done) => {
        global.logger.trace('passport.deserializeUser', id);
        var db = global.dbAccess.connect();
        var collection = db.collection('Members');
        collection.findOne({ _id: id }, (err, member) => {
            done(err, member);
        });
    });
};