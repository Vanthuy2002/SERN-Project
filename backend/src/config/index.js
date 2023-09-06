const express = require('express');
const cors = require('cors');

/**
 * @param {*} app Express
 */
const config = (app) => {
  app.use(express.json());
  app.use(express.static('src/public'));
  app.use(cors());

  // view engines
  app.set('view engine', 'ejs');
  app.set('views', 'src/Views');
};

module.exports = config;
