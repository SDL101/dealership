var express = require('express');
const https = require("https");
const fs = require("fs");
var db = require('./database/db-connector')

var Sale_Cars = require('./routes/Sale_Cars')
var Sales = require('./routes/Sales')
var Cars = require('./routes/Cars')

var app = express();

PORT = 3355;
SSL_PORT = 3356
app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/health', (req, res) => {
  res.send('HEALTHY');
});

try {
  app.use('/api/sale_cars/', Sale_Cars());
  app.use('/api/sales/', Sales());
  app.use('/api/cars/', Cars());
} catch(err) {
	console.log(`ERROR: ${err}`);
}

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(SSL_PORT, () => {
    console.log(`SSL App listening on port ${SSL_PORT}!`);
  });

app.get('/', function (req, res) {
    res.send("CS340 Project API")
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});