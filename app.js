var express = require('express');
var path = require('path');
var logger = require('morgan');
var index = require('./routes/index');
var app = express();

// view engine setup ..
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found... xㅁx');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});

const {Client} = require('pg');
const client = new Client({
  connectionString: 'POSTGRES_URL',
  ssl: { rejectUnauthorized:true},
});

client.connect();
// const promise = Promise.reject(new Error("Something happened!"));
// setTimeout(async () => {
//   // You want to process the result here...
//   try {
//     const result = await promise;
//     console.log(`Hello, ${result.toUpperCase()}`)
//   }
//   // ...and handle any error here.
//   catch (err) {
//     console.error("There was an error:", err.message);
//   }
// }, 1000);

//https://blog.gaerae.com/2015/10/postgresql-insert-update-returning.html
// const {Client} = require('pg');
// const client = new Client({
// 	connectionString: 'postgres://eotuuoyeqjrcsl:ba65cfb9efd29d1eb77d0015026f1d84db6b7f79177cb018ed797622ef7881c1@ec2-54-157-78-113.compute-1.amazonaws.com:5432/d5fptoet21f0ls',
// 	ssl: true,
// });

// client.connect();

module.exports = app;