'use strict';

const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const Audience = require('./audience');
const { auth: config = {} } = require('../../config');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const { User } = require('../database');

const options = {
  usernameField: 'email',
  session: false
};

passport.use(new LocalStrategy(options, (email, password, done) => {
  return User.findOne({ where: { email } })
    .then(user => user && user.authenticate(password))
    .then(user => done(null, user || false))
    .catch(err => done(err, false));
}));

const jwtOptions = {
  ...config,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(config.scheme),
  secretOrKey: config.secret,
  audience: Audience.Scope.Access
};

passport.use(new JwtStrategy(jwtOptions, verifyJWT));

passport.use('token', new JwtStrategy({
  ...config.jwt,
  audience: Audience.Scope.Setup,
  jwtFromRequest: ExtractJwt.fromBodyField('token'),
  secretOrKeyProvider
}, verifyJWT));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = {
  initialize(options = {}) {
    return passport.initialize(options);
  },
  authenticate(strategy, options = {}) {
    // NOTE:  passport to forward errors down the middleware chain:
    // https://github.com/jaredhanson/passport/blob/ad5fe1dfaeb79f81ba21f99e6025daa0dec87e6e/lib/middleware/authenticate.js#L171
    return passport.authenticate(strategy, { ...options, failWithError: true });
  }
};

function secretOrKeyProvider(_, rawToken, done) {
  const { id } = jwt.decode(rawToken);
  return User.findByPk(id, { rejectOnEmpty: true })
    .then(user => user.getTokenSecret())
    .then(secret => done(null, secret))
    .catch(err => done(err));
}

function verifyJWT(payload, done) {
  return User.findByPk(payload.id)
    .then(user => done(null, user || false))
    .catch(err => done(err, false));
}
