const express = require("express");

const crawler = require('../components/crawler/network');

const routes = function(server) {
  server.use("/crawler", crawler);
}

module.exports = routes;
