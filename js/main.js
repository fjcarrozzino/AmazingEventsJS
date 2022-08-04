
let checkboxSelected = [];
let textSearch = "";
let dataArray = []


async function dataApi(){
  await fetch("https://amazing-events.herokuapp.com/api/events")
  .then(resp => resp.json())
  .then(json => dataArray = json.events)

  createCheckbox()

  var checkbox = document.querySelectorAll("input[type=checkbox]");
  console.log(checkbox)
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

const displayCardsHome = (data) => {
  let templateHtml = "";
  for (let i = 0; i < data.length; i++) {
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
        <a href="./pages/details.html?id=${data[i].id}" class="btn btn-primary">More Details</a>
                        </div>
                    </div>
                    </div>`;
  }
  if (data.length == 0) {
    templateHtml += `<h1 class="h1-nothing-found"> Nothing was found. Please try with something else.</h1>`;
  }
  document.getElementById("div1").innerHTML = templateHtml;
};

const createCheckbox = () => {
  const checkboxes = document.getElementById("checkboxes");
  const category = dataArray.map((eventos) => eventos.category);
  console.log(category)
  const dataSet = new Set(category);
  console.log(dataSet)
  const allCategory = [...dataSet];
  console.log(allCategory)
  let inputCheckbox = "";
  allCategory.forEach((category) => {
    inputCheckbox += `<label><input class="input-checkbox" type="checkbox" value="${category}">${category} </label>`;
  });
  checkboxes.innerHTML = inputCheckbox;

  var id = 1;
  dataArray.map((category) => (category.id = id++));
};



var inputSearch = document.getElementById("search-bar");

inputSearch.addEventListener("keyup", (e) => {
  textSearch = e.target.value;
  filterArray();
  e.preventDefault();
});

var buttonSearch = document.getElementById("search-button");
buttonSearch.addEventListener("click", (e) => {
  e.preventDefault();
  searchItem(inputSearch.value.toLowerCase());
});

function filterArray() {
  let data = [];
  if (checkboxSelected.length > 0 && textSearch !== "") {
    checkboxSelected.map((category) => {
      data.push(
        ...dataArray.filter(
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
      data.push(...dataArray.filter((evento) => evento.category == category))
    );
  } else if (checkboxSelected.length == 0 && textSearch !== "") {
    data.push(
      ...dataArray.filter(
        (evento) =>
          evento.name.toLowerCase().includes(textSearch.trim().toLowerCase()) ||
          evento.category
            .toLowerCase()
            .includes(textSearch.trim().toLowerCase())
      )
    );
  } else {
    data.push(...dataArray);
  }

  displayCardsHome(data);
}


