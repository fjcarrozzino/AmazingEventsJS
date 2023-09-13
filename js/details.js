let dataArray = []


async function dataApi(){
  await fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(resp => resp.json())
  .then(json => dataArray = json.events)
  console.log(dataArray)

  function getData() {
    let idEvento = 1;
    dataArray.map((evento) => (evento.id = idEvento++));
    let id = location.search.split("?id=").filter(Number);
    const selectedId = Number(id[0]);
    console.log(dataArray)
    let evento = dataArray.find((evento) => {
      return evento.id == selectedId;
    });
    var templateHtml = `<div class="main d-flex">
                          <div>
                              <img class="img-details" src="${
                                evento.image
                              }" alt="logo">
                          </div>
      
                          <div class="titulo-detail">
                              <h3><span>Name:</span> ${evento.name}</h3>
                              <p><span>Date:</span> ${evento.date}</p>
                              <p><span>Description:</span> ${
                                evento.description
                              }</p>
                              <p><span>Category:</span> ${evento.category}</p>
                              <p><span>Price:</span> $${evento.price}</p>
                              <p><span>Place:</span> ${evento.place}</p>
                              <p>${
                                evento.assistance == undefined
                                  ? `<span>Estimate:</span> ${evento.estimate}`
                                  : `<span>Capacity:</span> ${evento.assistance}`
                              }</p>
                          </div>
                          </div>`;
    document.querySelector(".main-details").innerHTML = templateHtml;
  }
  
  getData();


}

dataApi()


