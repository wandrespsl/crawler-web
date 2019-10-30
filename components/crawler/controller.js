// const store = require("./store");
// const config = require("../../config");

const request = require("request");
const cheerio = require("cheerio");

function getCatalogue(filterCatalogue) {
  return new Promise((resolve, reject) => {
    if (!filterCatalogue) {
      return reject("Invalid data");
    }
    const hostUrl = "http://prometeo-politecnicojic.hosted.exlibrisgroup.com";

    const url =
      hostUrl +
      "/F/?func=find-b&request=" +
      filterCatalogue +
      "&find_code=WRD&adjacent=N&x=32&y=94=WFM&filter_request_4=&filter_code_5=WSL&filter_request_5=";

    const nameU = "poli-jic";
    const universidad = "Politécnico Colombiano Jaime Isaza Cadavid";

    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const records = [];
        const totalRecords = $('.text3[width="20%"]')
          .text()
          .trim()
          .substring(40, 44)
          .trim();

        $("table[cellspacing='2'] tr[valign='baseline']").each((i, element) => {
          const rank = i + 1;

          const titleStartingPosition = $(element)
            .find("td.td1:nth-child(5)")
            .html()
            .trim()
            .indexOf("=");

          const titleFinalPosition = $(element)
            .find("td.td1:nth-child(5)")
            .html()
            .trim()
            .indexOf(";");

          const title = $(element)
            .find("td.td1:nth-child(5)")
            .html()
            .trim()
            .substring(titleStartingPosition + 2, titleFinalPosition - 1);

          const autor = $(element)
            .find("td.td1:nth-child(3)")
            .text()
            .trim();

          const link = $(element)
            .find("td.td1:nth-child(1) a")
            .attr("href");

          const metadata = {
            rank: rank,
            title: title,
            author: autor,
            detail: link
          };

          records.push(metadata);
        });
        console.log(url);
        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad
          };
          resolve(jsonCatalogue);
          console.log(jsonCatalogue);
        } else {
          resolve("No hay datos para la busqueda realizada");
        }       
      }
    });
  });
}

function getCatalogueUdea(filterCatalogue) {
  return new Promise((resolve, reject) => {
    if (!filterCatalogue) {
      return reject("Invalid data");
    }
    const hostUrl = "http://opac.udea.edu.co";

    const url =
      hostUrl +
      "/cgi-olib/?keyword=" +
      filterCatalogue +
      "&session=10442211&nh=10&infile=presearch.glue";

    const nameU = "udea";
    const universidad = "Universidad de Antioquia";

    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const records = [];
        const totalRecords = $(".number-of-hits font").text();

        $(".hitlist-alt tr").each((i, element) => {
          const rank = i;

          const title = $(element)
            .find(".resultsbright")
            .text();

          const autor = $(element)
            .find(".extras i")
            .text();

          const link = $(element)
            .find(".resultsbright a")
            .attr("href");

          const detail = hostUrl + link;
          if (i > 0) {
            const metadata = {
              rank: rank,
              title: title,
              author: autor,
              detail: detail
            };
            records.push(metadata);
          }
        });
        console.log(url);
        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad
          };
          resolve(jsonCatalogue);
          console.log(jsonCatalogue);
        } else {
          resolve("No hay datos para la busqueda realizada");
        }
      }
    });
  });
}

module.exports = {
  getCatalogue,
  getCatalogueUdea
};
