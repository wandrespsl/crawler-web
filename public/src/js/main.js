const BASE_API = "https://catalago-web-amva.herokuapp.com/crawler/";
// const BASE_API = "http://localhost:3000/crawler/";

var contador = 0;

async function getData(url) {  
  const response = await fetch(url);
  // contador = contador + 1;
  const data = await response.json();    
  // if (contador == 8) {    
  //   enabledElement($formButton);
  //   enabledElement($formInput);
  //   $inputGroup.classList.remove("load-data");
  // }
  return data;
}
const $formButton = document.querySelector("button.btn-secondary");
const $formInput = document.querySelector("#input-search");
const $inputGroup = document.querySelector(".input-group");

function deleteHeaderTable() {
  const $tableHeaderTitle = document.querySelector(".title");
  $tableHeaderTitle.remove();
}

function deleteTable(row) {
  for (let index = 0; index < row.length; index++) {
    const element = row[index];
    element.remove();
  }
}

function deleteCard(card) {
  for (let index = 0; index < card.length; index++) {
    const element = card[index];
    element.remove();
  }
}

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
      <a href="${header.url}" target="_blank">Ver lista completa</a>
    </div>
    `;
}

function createTemplate(HTMLString) {
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = HTMLString;
  return html.body.children[0];
}

function renderTableHeader(list, $container) {
  if ($container.children.length > 1) {
    deleteHeaderTable();
  }
  const HTMLStringT = templateTableHeader(list);
  const tableHeaderElement = createTemplate(HTMLStringT);
  $container.append(tableHeaderElement);
}

function renderCard(data, $container) {
  const HTMLString = templateCard(data);
  const cardElement = createTemplate(HTMLString);
  $container.append(cardElement);
  showCard(cardElement);
  addEventClick(cardElement, data);
}

function renderRow(list, $container, $row) {
  const $tableRwo = document.querySelectorAll(".record-row tr");
  if ($tableRwo.length > 1) {
    deleteTable($tableRwo);
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
    tds[2].style.minWidth = "100px";
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

$formInput.addEventListener("keypress", event => {
  const valueInput = $formInput.value;
  const keyword = reemplazarAcentos(valueInput);
  if ((event.which == 13 || event.keyCode == 13) && keyword != "") {
    contador = 0;
    event.preventDefault();
    callCata(keyword);
    disabledElement($formButton);
    disabledElement($formInput);
    $inputGroup.classList.add("load-data");
  }
});

$formButton.addEventListener("click", event => {
  const valueInput = $formInput.value;
  const keyword = reemplazarAcentos(valueInput);
  if (keyword != "") {
    contador = 0;
    event.preventDefault();
    callCata(keyword);
    disabledElement($formButton);
    disabledElement($formInput);
    $inputGroup.classList.add("load-data");
  }
});

function callCata(keyword) {
  const $oldCard = document.querySelectorAll(".card");
  if ($oldCard.length > 1) {
    deleteCard($oldCard);
    backShowCard();
  }
  loadCatalogue("polijic", keyword);
  loadCatalogue("udea", keyword);
  loadCatalogue("itm", keyword);
  loadCatalogue("sanbuenaventura", keyword);
  loadCatalogue("poligrancolombiano", keyword);
  loadCatalogue("ceipa", keyword);
  loadCatalogue("colegiatura", keyword);
  loadCatalogue("unal", keyword);
}

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

async function loadCatalogue(catalogue, keyword) {
  try {
    const $contentContainerCard = document.querySelector(".content-card");
    const data = await getData(`${BASE_API}${catalogue}/?keyword=${keyword}`);    
    contador = contador + 1;
    if (contador == 8) {    
      enabledElement($formButton);
      enabledElement($formInput);
      $inputGroup.classList.remove("load-data");
    }
    console.log(data, 'contador:', contador);    
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
  if ($card) {
    showCard($card);
  }
}

function disabledElement(element) {
  element.setAttribute("disabled", "");
}
function enabledElement(element) {
  element.removeAttribute("disabled");
}

var reemplazarAcentos = function(cadena) {
  var chars = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    à: "a",
    è: "e",
    ì: "i",
    ò: "o",
    ù: "u",
    ñ: "n",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    À: "A",
    È: "E",
    Ì: "I",
    Ò: "O",
    Ù: "U",
    Ñ: "N"
  };
  var expr = /[áàéèíìóòúùñ]/gi;
  var res = cadena.replace(expr, function(e) {
    return chars[e];
  });
  return res;
};
