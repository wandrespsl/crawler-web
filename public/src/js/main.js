document.querySelector("button.btn-secondary").addEventListener("click", () => {
  const keyword = document.querySelector("input.form-control").value;
  load(keyword);
});

async function load(keyword) {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();

    const lengthData = data.body.records.length;
    console.log("array", lengthData);

    if (lengthData == 0) {
      console.log("no hay datos");
      return;
    } else {
      return data;
    }

    // return data;
  }

  const urlPoli = "http://localhost:3000/crawler/?keyword=" + keyword;
  const recordsJIC = await getData(urlPoli);

  console.log(recordsJIC);

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

  function renderCard(list, $container) {
    const HTMLString = templateCard(list);
    const cardElement = createTemplate(HTMLString);
    $container.append(cardElement);
  }

  function renderTableHeader(list, $container) {
    const HTMLStringT = templateTableHeader(list);
    const tableHeaderElement = createTemplate(HTMLStringT);
    $container.append(tableHeaderElement);
  }

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

  const $contentContainerTableHeader = document.querySelector(".table-header");
  renderTableHeader(recordsJIC.body, $contentContainerTableHeader);

  const $contentContainerCard = document.querySelector(".content-card");
  renderCard(recordsJIC.body, $contentContainerCard);

  const $contentContainerRow = document.querySelector("tbody.record-row");
  const row = document.querySelector("#row");
  renderRow(recordsJIC.body.records, $contentContainerRow, row);
}
