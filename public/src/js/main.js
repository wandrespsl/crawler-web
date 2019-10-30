const BASE_API = "http://localhost:3000/crawler/";

async function getData(url) {
  const response = await fetch(url);
  console.log(url);
  
  const data = await response.json();
  return data;
}

const $formButton = document.querySelector("button.btn-secondary");

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
  const $tableHeaderTitle = document.querySelector(".title");
  if ($container.children.length > 1) {
    $tableHeaderTitle.remove();
  }
  const HTMLStringT = templateTableHeader(list);
  const tableHeaderElement = createTemplate(HTMLStringT);
  $container.append(tableHeaderElement);
}

function renderRow(list, $container, $row) {
  const $tableRwo = document.querySelectorAll(".record-row tr");
  if ($tableRwo.length > 1) {
    for (let index = 0; index < $tableRwo.length; index++) {
      const element = $tableRwo[index];
      element.remove();
    }
  }
  list.forEach(tr => {
    const clone = $row.content.cloneNode(true);
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
function addEventClick($element, data) {
  $element.addEventListener("click", () => {
    const $contentContainerTableHeader = document.querySelector(
      ".table-header"
    );
    renderTableHeader(data, $contentContainerTableHeader);

    const $contentContainerRow = document.querySelector("tbody.record-row");
    const $row = document.querySelector("#row");

    renderRow(data.records, $contentContainerRow, $row);
    showTable();
  });
}
$formButton.addEventListener("click", async event => {
  event.preventDefault();
  const keyword = document.querySelector("input.form-control").value;
  loadCatalogue("polijic", keyword);
  loadCatalogue("udea", keyword);
});

function showTable() {
  const $contenTable = document.querySelector(".content-table");
  $contenTable.classList.remove("div-hidden");
  $contenTable.style.animation = "tableIn .8s forwards";

  const $contentCard = document.querySelector(".content-card");
  $contentCard.classList.add("div-hidden");
}

function showCard(cardElement) {
  cardElement.style.animation = "cardIn .8s forwards";
}

function renderCard(data, $container) {
  const HTMLString = templateCard(data);
  const cardElement = createTemplate(HTMLString);
  $container.append(cardElement);
  showCard(cardElement);
  addEventClick(cardElement, data);
}

async function loadCatalogue(catalogue, keyword) {
  try {
    const $contentContainerCard = document.querySelector(".content-card");
    const data = await getData(`${BASE_API}${catalogue}/?keyword=${keyword}`);
    console.log(data);
    const withoutResults = data.body;
    if (withoutResults == "No hay datos para la busqueda realizada") {
      return withoutResults;      
    } else {
      renderCard(data.body, $contentContainerCard);
    }
  } catch (err) {
    console.log("error al ejecutar", err);
  }
}

const $back = document.querySelector(".back");
$back.addEventListener("click", backShowCard);
function backShowCard() {
  const $contenTable = document.querySelector(".content-table");
  $contenTable.classList.add("div-hidden");
  $contenTable.style.animation = "tableIn .8s forwards";

  const $contentCard = document.querySelector(".content-card");
  $contentCard.classList.remove("div-hidden");

  const $card = document.querySelector(".card");
  $card.style.animation = "cardIn .8s forwards";
}
