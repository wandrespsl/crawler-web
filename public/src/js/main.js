document.querySelector("button.btn-secondary").addEventListener("click", () => {
  const keyword = document.querySelector("input.form-control").value;
  load(keyword);
});

async function load(keyword) {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const urlPoli = "http://localhost:3000/crawler/?keyword=" + keyword;
  const recordsJIC = await getData(urlPoli);

  console.log(recordsJIC);

  // const lengthData = recordsJIC.body.records.length;
  
  // const var1 = { ...recordsJIC };
  const res = [recordsJIC];


  var poliRes = res.find(r => r.body.nameU == "poli-jic");

  console.log('res', res);
  console.log('poliRes', poliRes);

  if (poliRes) {
    function templateCard(card) {
      return `
          <div class="card" id="card-${card.nameU}">
              <div class="img">
                  <img
                  src="src/imgs/${card.nameU}.png"
                  class="card-img-top"
                  alt="${card.nameU}"
                  />
              </div>
              <div class="card-body">
                  <h5 class="card-title">
                  Registros encontrados: <span>${card.totalRecords}</span>
                  </h5>
              </div>
          </div>`;
    }

    function templateTableHeader(header) {
      return `
        <div class="title">
          <img src="src/imgs/${header.nameU}.png" alt="${header.nameU}" />
          <h2>${header.universidad}</h2>
          <a href="${header.url}" target="blank">Ver lista completa</a>
        </div>
        `;
    }

    function createTemplate(HTMLString) {
      const html = document.implementation.createHTMLDocument();
      html.body.innerHTML = HTMLString;
      return html.body.children[0];
    }

    function renderTableHeader(list, $container) {
      const HTMLStringT = templateTableHeader(list);
      const tableHeaderElement = createTemplate(HTMLStringT);
      $container.append(tableHeaderElement);
    }

    function renderCard(list, $container) {
      const HTMLString = templateCard(list);
      const cardElement = createTemplate(HTMLString);
      $container.append(cardElement);
    }

    const $contentContainerTableHeader = document.querySelector(
      ".table-header"
    );
    renderTableHeader(recordsJIC.body, $contentContainerTableHeader);

    const $contentContainerCard = document.querySelector(".content-card");
    renderCard(recordsJIC.body, $contentContainerCard);

    document.querySelector("#card-poli-jic").addEventListener("click", () => {
      function renderRow(list, $container, row) {
        list.forEach(tr => {
          const clone = row.content.cloneNode(true);
          const tds = clone.querySelectorAll("td");
          const th = clone.querySelector("th");
          const aHref = clone.querySelector("a");
          aHref.href = tr.detail;
          th.textContent = tr.rank;
          tds[0].textContent = tr.author;
          tds[1].textContent = tr.title;
          $container.appendChild(clone);
        });
      }

      const $contentContainerRow = document.querySelector("tbody.record-row");
      const row = document.querySelector("#row");
      renderRow(recordsJIC.body.records, $contentContainerRow, row);

      const $contenTable = document.querySelector(".content-table");
      $contenTable.classList.remove("div-hidden");

      const $contentCard = document.querySelector(".content-card");
      $contentCard.classList.add("div-hidden");
    });

    document.querySelector(".back").addEventListener("click", () => {
      const $contenTable = document.querySelector(".content-table");
      $contenTable.classList.add("div-hidden");

      const $contentCard = document.querySelector(".content-card");
      $contentCard.classList.remove("div-hidden");
    });
  } else {
    console.log(recordsJIC.body);
  }
}
