const express = require('express');
const dotenv = require('dotenv');
const configApp = require('./config');
const defineRoutes = require('./Routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

configApp(app);
defineRoutes(app);

app.listen(PORT, () => console.log(`App is listening in PORT ${PORT}`));
