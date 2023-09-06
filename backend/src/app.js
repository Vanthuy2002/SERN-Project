const express = require('express');
const dotenv = require('dotenv');
const config = require('./config');
const defineRoutes = require('./Routes');
const connectDb = require('./db');

dotenv.config();
const app = express();

config(app);
defineRoutes(app);
connectDb();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`App is listening in PORT ${PORT}`));
