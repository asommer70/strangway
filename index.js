const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const FileStore = require('session-file-store')(session);
const passportConfig = require('./services/auth');

require('dotenv').config();
const schema = require('./schema');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(session({ secret: 'notes rule', cookie: {}, resave: true, saveUninitialized: true, store: new FileStore }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
