const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/**
 * @param {*} app Express
 */
const config = (app) => {
  app.use(express.json());
  app.use(express.static('src/public'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  // view engines
  app.set('view engine', 'ejs');
  app.set('views', 'src/Views');
};

module.exports = config;
