"use strict";

const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const PORT = 3000;

const home = require("./src/routes/home")
app.set("views", "./src/views");
app.set("view engine", "ejs");


app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", home); // use -> 미들 웨어를 등록해주는 메소드

// app.use(express.static(path.join(__dirname, '../react-project/build')));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, '../react-project/build/index.html'))
// });


// app.get('*', ()  => {
//   res.sendFile(path.join(__dirname, '../react-project/build/index.html'))
// })

module.exports = app;