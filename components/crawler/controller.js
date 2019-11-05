// const store = require("./store");
// const config = require("../../config");

const request = require("request");
const cheerio = require("cheerio");

function getCataloguePolijic(filterCatalogue) {
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
      "&session=10442211&nh=20&infile=presearch.glue";

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

function getCatalogueItm(filterCatalogue) {
  return new Promise((resolve, reject) => {
    if (!filterCatalogue) {
      return reject("Invalid data");
    }
    const hostUrl = "https://catalogobibliotecas.itm.edu.co";

    const url =
      hostUrl +
      "/cgi-olib/?keyword=" +
      filterCatalogue +
      "&session=46810913&nh=20&infile=presearch.glue";

    const nameU = "itm";
    const universidad = "Instituto Tecnológico Metropolitano";

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

function getCatalogueSanbuena(filterCatalogue) {
  return new Promise((resolve, reject) => {
    if (!filterCatalogue) {
      return reject("Invalid data");
    }
    const hostUrl = "http://opac.biblioteca.usbmed.edu.co";

    const url =
      hostUrl +
      "/catalogo?keyword=" +
      filterCatalogue +
      "&session=98864653&nh=20&infile=presearch.glue";

    const nameU = "buenaventura";
    const universidad = "Universidad de San Buenaventura";

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

function getCataloguePoligranc(filterCatalogue) {
  return new Promise((resolve, reject) => {
    if (!filterCatalogue) {
      return reject("Invalid data");
    }
    const hostUrl = "http://catalogo.poligran.edu.co";

    const url =
      hostUrl + "/cgi-bin/koha/opac-search.pl?idx=&q=" + filterCatalogue;

    const nameU = "poli-gran-colombiano";
    const universidad = "Institución Universitaria Politécnico Grancolombiano";

    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const records = [];
        const totalR = $("#numresults strong").text();

        let totalRecords;
        if (totalR) {
          totalRecords = totalR.match(/\d+/g).join(" ");
        } else {
          totalRecords = "";
        }

        $(".bibliocol").each((i, element) => {
          const rank = $(element)
            .prev()
            .text();

          const title = $(element)
            .find(".title")
            .text();

          const autor = $(element)
            .find(".author")
            .text();

          const link = $(element)
            .find("a")
            .attr("href");

          const detail =
            hostUrl +
            link +
            "&query_desc=kw%2Cwrdl%3A%20" +
            filterCatalogue +
            " ";

          const metadata = {
            rank: rank,
            title: title,
            author: autor,
            detail: detail
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

function getCatalogueCeipa(filterCatalogue) {
  return new Promise((resolve, reject) => {
    if (!filterCatalogue) {
      return reject("Invalid data");
    }
    const hostUrl =
      "http://aplicaciones.ceipa.edu.co/biblioteca/biblio_digital/catalogo/";

    const url =
      hostUrl +
      "informe.jsp?cr1=T&cr2=A&cr3=M&con1=0&con2=0&con3=" +
      filterCatalogue +
      "&cole=Todos&ano=&ubi=Todos&idi=Todos";

    const nameU = "ceipa";
    const universidad = "Ceipa";

    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const records = [];

        $("form center table[border='0']").each((i, element) => {
          const rank = i + 1;

          const title = $(element)
            .find('td[width="660"] .Estilo17')
            .text()
            .trim();

          const autor = $(element)
            .find('td[width="660"]')
            .parent()
            .next()
            .children(".Estilo30")
            .text()
            .trim();

          const link = $(element)
            .find('a[target="_blank"]:nth-child(3)')
            .attr("href")
            .trim();

          const detail = hostUrl + link + " ";

          const metadata = {
            rank: rank,
            title: title,
            author: autor,
            detail: detail
          };

          records.push(metadata);
        });
        console.log(url);
        const totalRecords = records.length;
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

function getCatalogueColegiatura(filterCatalogue) {
  return new Promise((resolve, reject) => {
    if (!filterCatalogue) {
      return reject("Invalid data");
    }
    const hostUrl = "https://colegiatura.com.co";

    const url = hostUrl + "/cgi-bin/koha/opac-search.pl?q=" + filterCatalogue;

    const nameU = "colegiatura";
    const universidad = "COLEGIATURA";

    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const records = [];
        const totalR = $("#numresults strong").text();

        let totalRecords;
        if (totalR) {
          totalRecords = totalR.match(/\d+/g).join(" ");
        } else {
          totalRecords = "";
        }

        $(".bibliocol").each((i, element) => {
          const rank = $(element)
            .prev()
            .text();

          const title = $(element)
            .find(".title")
            .text();

          const autor = $(element)
            .find(".author")
            .text();

          const link = $(element)
            .find("a")
            .attr("href");

          const detail =
            hostUrl +
            link +
            "&query_desc=kw%2Cwrdl%3A%20" +
            filterCatalogue +
            " ";

          const metadata = {
            rank: rank,
            title: title,
            author: autor,
            detail: detail
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

function getCatalogueUnal(filterCatalogue) {
  return new Promise((resolve, reject) => {
    if (!filterCatalogue) {
      return reject("Invalid data");
    }
    const hostUrl = "http://168.176.5.96";

    const url =
      hostUrl +
      "/F/?func=find-b&request=" +
      filterCatalogue +
      "&find_code=WRD&adjacent=N&x=44&y=6";

    const nameU = "unal";
    const universidad = "Universidad Nacional de Colombia";

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
            .indexOf("recordLink");

          const titlePre = $(element)
            .find("td.td1:nth-child(5)")
            .html()
            .trim()
            .substring(titleStartingPosition + 3, titleFinalPosition - 3);

          const title = titlePre.replace(/&nbsp;/g, ' ');

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

module.exports = {
  getCataloguePolijic,
  getCatalogueUdea,
  getCatalogueItm,
  getCatalogueSanbuena,
  getCataloguePoligranc,
  getCatalogueCeipa,
  getCatalogueColegiatura,
  getCatalogueUnal
};
