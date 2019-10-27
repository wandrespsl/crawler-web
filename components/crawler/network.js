const express = require("express");

const config = require('../../config');
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();


router.get("/", function(req, res) {
  const filterCatalogue = req.query.keyword;
  controller
    .getCatalogue(filterCatalogue)
    .then(catalogueList => {
      response.success(req, res, catalogueList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});


module.exports = router;
