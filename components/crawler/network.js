const express = require("express");

const config = require('../../config');
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();


router.get("/polijic", function(req, res) {
  const filterCatalogue = req.query.keyword;
  const keyword = filterCatalogue.replace(/\s/g, "+");
  controller
    .getCataloguePolijic(keyword)
    .then(catalogueList => {
      response.success(req, res, catalogueList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpected Error", 500, e);
    });  
});

router.get("/udea", function(req, res) {
  const filterCatalogue = req.query.keyword;
  const keyword = filterCatalogue.replace(/\s/g, "+");
  controller
    .getCatalogueUdea(keyword)
    .then(catalogueList => {
      response.success(req, res, catalogueList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpected Error", 500, e);
    });  
});

router.get("/itm", function(req, res) {
  const filterCatalogue = req.query.keyword;
  const keyword = filterCatalogue.replace(/\s/g, "+");
  controller
    .getCatalogueItm(keyword)
    .then(catalogueList => {
      response.success(req, res, catalogueList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpected Error", 500, e);
    });  
});

module.exports = router;
