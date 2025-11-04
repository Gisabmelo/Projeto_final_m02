const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');

const app = express();

app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.get('/', (req, res) => res.json({ message: 'API para gerenciar troca de livros' }));

// simple error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
