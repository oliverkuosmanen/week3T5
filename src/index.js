import "./styles.css";

/*document.getElementById("app").innerHTML = `
<h1>Week 3</h1>

`;*/
const dataTable = document.getElementById("dataTableBody");

getData();

async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  const dataPromise = await fetch(url);
  const newDataPromise = await fetch(url2);
  const dataJSON = await dataPromise.json();
  const newDataJSON = await newDataPromise.json();

  const muniJSON = dataJSON.dataset.dimension.Alue.category.label;
  const popJSON = dataJSON.dataset.value;
  const empJSON = newDataJSON.dataset.value;

  let counter = 0;

  console.log(newDataJSON);

  /*popJSON.forEach(population => {

    let tr = document.createElement("tr");
    let tdMuni = document.createElement("td");
    let tdPop = document.createElement("td");

    //console.log(cityCode);
    //tdMuni.innerText = muniJSON[("KU"+cityCode)];
    tdPop.innerText = population
    tr.appendChild(tdMuni);
    tr.appendChild(tdPop);

    dataTable.appendChild(tr);
    counter++;
  });*/

  //for in takes the code but for each takes the population
  //so the for in gives keys and for each gives the values
  for (const cityCode in muniJSON) {
    //console.log(cityCode);

    let tr = document.createElement("tr");
    if (counter % 2 === 0) {
      tr.className = "odd";
      //console.log("odd")
    } else {
      tr.className = "even";
      //console.log("even")
    }

    let tdMuni = document.createElement("td");
    let tdPop = document.createElement("td");
    let tdEmp = document.createElement("td");
    let tdEmpP = document.createElement("td");

    tdMuni.innerText = muniJSON[cityCode];
    tdPop.innerText = popJSON[counter];
    tdEmp.innerText = empJSON[counter];

    tdEmpP.innerText =
      ((empJSON[counter] / popJSON[counter]) * 100).toFixed(2) + "%";

    if (((empJSON[counter] / popJSON[counter]) * 100).toFixed(2) > 45) {
      tr.className = "over45";
    } else if (((empJSON[counter] / popJSON[counter]) * 100).toFixed(2) < 25) {
      tr.className = "under25";
    }

    tr.appendChild(tdMuni);
    tr.appendChild(tdPop);
    tr.appendChild(tdEmp);
    tr.appendChild(tdEmpP);

    dataTable.appendChild(tr);
    counter++;
  }
}
