const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const FileStore = require('session-file-store')(session);
const passportConfig = require('./services/auth');

require('dotenv').config();
const schema = require('./schema');

const app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());
app.use(session({ secret: 'notes rule', cookie: {}, resave: true, saveUninitialized: true, store: new FileStore }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.get('/', function (req, res) {
  res.json({message: 'Hello, welcome to Strangway...'});
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
