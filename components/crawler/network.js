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

router.get("/sanbuenaventura", function(req, res) {
  const filterCatalogue = req.query.keyword;
  const keyword = filterCatalogue.replace(/\s/g, "+");
  controller
    .getCatalogueSanbuena(keyword)
    .then(catalogueList => {
      response.success(req, res, catalogueList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpected Error", 500, e);
    });  
});

router.get("/poligrancolombiano", function(req, res) {
  const filterCatalogue = req.query.keyword;
  const keyword = filterCatalogue.replace(/\s/g, "+");
  controller
    .getCataloguePoligranc(keyword)
    .then(catalogueList => {
      response.success(req, res, catalogueList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpected Error", 500, e);
    });  
});

router.get("/ceipa", function(req, res) {
  const filterCatalogue = req.query.keyword;
  const keyword = filterCatalogue.replace(/\s/g, "+");
  controller
    .getCatalogueCeipa(keyword)
    .then(catalogueList => {
      response.success(req, res, catalogueList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpected Error", 500, e);
    });  
});

router.get("/colegiatura", function(req, res) {
  const filterCatalogue = req.query.keyword;
  const keyword = filterCatalogue.replace(/\s/g, "+");
  controller
    .getCatalogueColegiatura(keyword)
    .then(catalogueList => {
      response.success(req, res, catalogueList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpected Error", 500, e);
    });  
});

router.get("/unal", function(req, res) {
  const filterCatalogue = req.query.keyword;
  const keyword = filterCatalogue.replace(/\s/g, "+");
  controller
    .getCatalogueUnal(keyword)
    .then(catalogueList => {
      response.success(req, res, catalogueList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpected Error", 500, e);
    });  
});

module.exports = router;
