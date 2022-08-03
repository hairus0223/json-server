const jsonServer = require("json-server");
const express = require("express");
const app = express();
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(router);

app.listen(process.env.PORT || 3000);

module.exports = app;
