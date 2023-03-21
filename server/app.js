const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const port = 4000;
const schema = require('./schema/schema');

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    })
);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/graphql`);
    }   
);

