const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = new require('../models/user')();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findByUsernameCallback(username, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false, 'Invalid Credentials'); }

    user.comparePasswordCallback(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, 'Invalid credentials.');
      }
    });
  });
}));

function signup(username, password, req) {
  if (!username || !password) { throw new Error('You must provide an username and password.'); }
  const user = {username, password};

  return User.findByUsername(username)
    .then((existingUser) => {
      if (existingUser) {
        throw new Error('Username in use');
      } else {
        return User.create({username, password})
          .then((user) => {
            return user;
          });
      }
      return existingUser;
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        req.logIn(user, (err) => {
          if (err) { reject(err); }
          resolve(user);
        });
      });
    })
    .catch((err) => {
      console.log('signup User.findByUsername err:', err);
    })
}

function login(username, password, req) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject('Invalid credentials.') }

      req.login(user, (err) => {
        resolve(user);
      });
    })({ body: { username, password } });
  });
}

module.exports = { signup, login };
