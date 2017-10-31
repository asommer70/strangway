const express = require('express');
const expressGraphQL = require('express-graphql');
require('dotenv').config();

const app = express();

app.use('/graphql', expressGraphQL({
  graphiql: true
}))

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
