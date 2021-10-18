var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true});
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs')

// We must implement our own secret file loading mechanism as 'dotenv' does not
// innately have this capability, nor are there convenient libraries out there.
if (process.env.NODEJS_SECRETS_DIR) {
  const dir = fs.opendirSync(process.env.NODEJS_SECRETS_DIR)
  let dirent
  while ((dirent = dir.readSync()) !== null) {
    if (!dirent.name.startsWith("..")) {
        process.env[dirent.name] = fs.readFileSync(path.join(process.env.NODEJS_SECRETS_DIR, dirent.name), {encoding:'utf8', flag:'r'})
    }
  }
  dir.closeSync()
}

require('dotenv-defaults').config({ path: process.env.NODEJS_CONFIG_PATH ? process.env.NODEJS_CONFIG_PATH : path.resolve(process.cwd(), '.env') });

//const logger = require('pino-http')({
//  logger: require('pino-caller')(
//   require('pino')({
//     level: process.env.LOG_LEVEL || 'info',
//    prettyPrint:
//        process.env.LOG_FORMAT === 'plain'
//          ? {
//              colorize: true,
//              translateTime: 'yyyy-mm-dd HH:MM:ss',
//              ignore: 'pid,hostname',
//              messageFormat: false,
//            }
//         : false,
//     redact: {
//       paths: ['req.headers', 'res.headers', 'pid', 'hostname'],
//       remove: true,
//     },
//   })
// )
//});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// view engine setup
app.use(metricsMiddleware);


const swaggerDefinition = {
  info: {
    title: 'NodeJS Microservice',
    version: '0.0.1',
    description: 'Endpoints to test the user routes',
  },
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const NODE_ENV = process.env.NODE_ENV || "production";

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: true
};

app.use(cors(corsOptions));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// app.get('/liveness', (req, res) => {
//  // logger(req, res);
//   res.status(200).json({msg:
//     'Application is Live'});
// });

// app.get('/readiness', (req, res) => {
//  //logger(req, res);
//   res.status(200).json({msg:
// 'Application is Ready'});
// });


// app.get('/health', (req, res) => {
//  // logger(req, res);
//   res.status(200).json({msg:
// 'Application is Healthy'});
// });


app.get('/info', (req, res) => {
  res.status(200).json({
    BUILD_INFO: process.env.BUILD_INFO ? process.env.BUILD_INFO : 'BUILD_INFO not available',
    NODE_ENV: process.env.NODE_ENV
  })
})

const client = require('prom-client');
const counter = new client.Counter({
  name: 'my_custom_metric',
  help: 'my_custom_metric_help_info',
});
counter.inc(10); // Increment by 10

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 // logger(req, res);
  next(createError(404));
});

app.use(function(req, res, next) {
 // logger(req, res);
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
 //console.log(`Express API server running against NODE_ENV: ${NODE_ENV} at localhost:${port}`)
});

module.exports = app;
