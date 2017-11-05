const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
require('dotenv').config();
const schema = require('./schema');

const app = express();

app.use(cors());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
