const config = require("./config");
const loaders = require("./loaders");
const express = require("express");
const recordRouter = require("./routes/record");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const app = express();

//extra security packages

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const morgan = require("morgan");

//Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

config(); // set dotenv and express-async-errors
loaders(); //connected to database

//middlewares
app.use(morgan("tiny")); //logs coming requests
app.use(express.json()); // to be able to take req.body
app.use(helmet()); // set headres for security purposes
app.use(cors()); //accessible from different domain
app.use(xss()); //sanitizes user inputs to protect injected malicious codes

app.get("/", (req, res) => {
  res.send('<h1>GETIR-API</h1><a href="/api-docs">Documentation</a>');
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/v1/records", recordRouter); // routes
app.use(notFound); // endpoints not existed
app.use(errorHandlerMiddleware); // error handling

module.exports = app;
