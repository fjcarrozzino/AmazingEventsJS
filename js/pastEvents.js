let dataArray = [];
let checkboxSelected = [];
let textSearch = "";


async function dataApi(){
  await fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(resp => resp.json())
  .then(json => dataArray = json)

  createCheckbox()

  var checkbox = document.querySelectorAll("input[type=checkbox]");

  checkbox.forEach((check) =>
    check.addEventListener("click", (event) => {
      var checked = event.target.checked;
      if (checked) {
        checkboxSelected.push(event.target.value);
        filterArray();
      } else {
        checkboxSelected = checkboxSelected.filter(
          (uncheck) => uncheck !== event.target.value
        );
        filterArray();
      }
    })
  );

  filterArray();
  }

dataApi()


console.log(dataArray)

function pastEvents(data) {
  let templateHtml = "";
  let fechaActual = dataArray.currentDate
  console.log(dataArray.currentDate)
  for (i = 0; i < data.length; i++) {
    let fechaCard = data[i].date;
    if (fechaActual > fechaCard) {
      templateHtml += `<div class="card" style="width: 18rem;">
        <img src="${data[i].image}" class="card-img-top" alt="concierto-musica" style="height: 190px">
        <div class="card-body text-center d-flex flex-column justify-content-between">
        <div>
        <h5 class="card-title">${data[i].name}</h5>
        <p class="card-text">${data[i].description}</p>
        <p class="card-text">${data[i].date}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-4">
        <p class="mb-0">Price: $${data[i].price}</p>
                        </div>
                    </div>
                    </div>`;
    }
  }
  if (data.length == 0) {
    templateHtml += `<h1 class="h1-nothing-found"> Nothing was found. Please try with something else.</h1>`;
  }
  document.getElementById("div-past-events").innerHTML = templateHtml;
}

const createCheckbox = () => {
  const checkboxes = document.getElementById("checkboxes");
  const category = dataArray.events.map((eventos) => eventos.category);
  const dataSet = new Set(category);
  const allCategory = [...dataSet];
  let inputCheckbox = "";
  allCategory.forEach((category) => {
    inputCheckbox += `<label><input class="input-checkbox" type="checkbox" value="${category}">${category} </label>`;
  });
  checkboxes.innerHTML = inputCheckbox;
};

var inputSearch = document.getElementById("search-bar");
inputSearch.addEventListener("keyup", (e) => {
  textSearch = e.target.value;
  filterArray();
});

function filterArray() {
  let data = [];
  if (checkboxSelected.length > 0 && textSearch !== "") {
    checkboxSelected.map((category) => {
      data.push(
        ...dataArray.events.filter(
          (evento) =>
            evento.name
              .toLowerCase()
              .includes(textSearch.trim().toLowerCase()) &&
            evento.category == category
        )
      );
    });
  } else if (checkboxSelected.length > 0 && textSearch === "") {
    checkboxSelected.map((category) =>
      data.push(...dataArray.events.filter((evento) => evento.category == category))
    );
  } else if (checkboxSelected.length == 0 && textSearch !== "") {
    data.push(
      ...dataArray.events.filter(
        (evento) =>
          evento.name.toLowerCase().includes(textSearch.trim().toLowerCase()) ||
          evento.category
            .toLowerCase()
            .includes(textSearch.trim().toLowerCase())
      )
    );
  } else {
    data.push(...dataArray.events);
  }
  pastEvents(data);
}

