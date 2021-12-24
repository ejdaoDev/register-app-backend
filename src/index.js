import app from "./app";
import express from "express";

const sequelize = require("./database");
const path = require('path');

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/images')));

// Models
require("./Models/Models");

//seeds
require("./Libs/seeds");

// Routes
require("./Routes/Routes");

// Server Start
app.listen(PORT, function () {
  console.log(`start http://localhost:${PORT}`);

  // Conect with the db
  // Force true: DROP TABLES
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("connect with db");
    })
    .catch((error) => {
      console.log("error", error);
    });
});
