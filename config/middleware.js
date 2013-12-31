var passport = require('passport')
    , GitHubStrategy = require('passport-github').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {

        User.findOne(
                {
                    or : [
                            {uid: parseInt(profile.id)}, 
                            {uid: profile.id}
                        ]
                }
            ).done(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                User.create({
                    provider: profile.provider,
                    uid: profile.id,
                    name: profile.displayName
                }).done(function (err, user) {
                        return done(err, user);
                    });
            }
        });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
    User.findOne({uid: uid}).done(function (err, user) {
        done(err, user)
    });
});


module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function (app) {

            passport.use(new GitHubStrategy({
                    clientID: "YOUR_CLIENT_ID",
                    clientSecret: "YOUR_CLIENT_SECRET",
                    callbackURL: "http://localhost:1337/auth/github/callback"
                },
                verifyHandler
            ));

            passport.use(new FacebookStrategy({
                    clientID: "694616850571004",
                    clientSecret: "72caed6aade4987e708d3416e5b12610",
                    callbackURL: "http://localhost:1337/auth/facebook/callback"
                },
                verifyHandler
            ));
            var isLocalhost = process.env.PORT !== 8000;
            var callbackURL = isLocalhost ? 
                'http://tikal-remotube.herokuapp.com/auth/google/callback':
                'http://localhost:8000/auth/google/callback';
            passport.use(new GoogleStrategy({
                    clientID: '130570019401-cblp8glde6ssnj18vbaj4ircaa3eu164.apps.googleusercontent.com',
                    clientSecret: 'LB9rzywArIO9IKrPQnNPt5PI',
                    callbackURL: callbackURL
                },
                verifyHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};
