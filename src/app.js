import express, { json } from 'express';
import morgan from 'morgan';
import { createAdmin, createAreas, createCountries, createIdtypes, createRoles } from './Libs/seeds.js';
const cors = require('cors');

const app = express();
require('dotenv').config({path:'./.env'})

// Models
require("./Models/Models");

//Seeds
createRoles();
createIdtypes();
createAreas();
createCountries();
createAdmin();

app.use(morgan('dev'));
app.use(json());
app.use(cors());
app.options('*', cors());

export default app;