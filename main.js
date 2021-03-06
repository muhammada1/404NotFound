console.log("Working");
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFileInput");
const csvInputBtn = document.getElementById("csvInputButton")

csvInputBtn.value = csvFile.value == "" ? "Select file..." : csvFile.value.replace(/^.*[\\\/]/, '');

csvFile.addEventListener('change', () => {
  csvInputBtn.value = csvFile.value.replace(/^.*[\\\/]/, '');
});

var input = document.getElementById( 'file-upload' );
var infoArea = document.getElementById( 'file-upload-filename' );

function csvToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });
  return arr;
}


function linechart(dataArray) {
  var block = [];
  
diffArray = differentProducts(dataArray);
diffArray = diffArray.filter(function( element ) {
  return element !== "All Products";
});
let sumM1 = [];
let sumM2 = [];
let sumM3 = [];
let sumM4 = [];
let sumM5 = [];
let sumM6 = [];
for(let i = 0; i < diffArray.length; i++){
  sumM1[i]=0;
  sumM2[i]=0;
  sumM3[i]=0;
  sumM4[i]=0;
  sumM5[i]=0;
  sumM6[i]=0;
}


for(let i = 0; i < diffArray.length; i++){
  dataArray.forEach(item =>{
    if(item.Product === diffArray[i]){
      sumM1[i]+=parseInt(item.TRx_Month_1);
    }
  })
}
console.log(sumM1);
for(let i = 0; i < diffArray.length; i++){
  dataArray.forEach(item =>{
    if(item.Product === diffArray[i]){
      sumM2[i]+=parseInt(item.TRx_Month_2);
    }
  })
}
for(let i = 0; i < diffArray.length; i++){
  dataArray.forEach(item =>{
    if(item.Product === diffArray[i]){
      sumM3[i]+=parseInt(item.TRx_Month_3);
    }
  })
}
for(let i = 0; i < diffArray.length; i++){
  dataArray.forEach(item =>{
    if(item.Product === diffArray[i]){
      sumM4[i]+=parseInt(item.TRx_Month_4);
    }
  })
}
for(let i = 0; i < diffArray.length; i++){
  dataArray.forEach(item =>{
    if(item.Product === diffArray[i]){
      sumM5[i]+=parseInt(item.TRx_Month_5);
    }
  })
}
for(let i = 0; i < diffArray.length; i++){
  dataArray.forEach(item =>{
    if(item.Product === diffArray[i]){
      sumM6[i]+=parseInt(item.TRx_Month_6);
    }
  })
}
console.log(sumM6[0])
for(let i = 0; i < diffArray.length; i++){
  randColor = getRandomColor();
  block.push({'label' : diffArray[i], 'data' : [parseInt(sumM1[i]), parseInt(sumM2[i]) , parseInt(sumM3[i]), parseInt(sumM4[i]), parseInt(sumM5[i]),parseInt(sumM6[i]), 
  Math.floor((parseInt(sumM1[i])+ parseInt(sumM2[i]) +parseInt(sumM3[i]) + parseInt(sumM4[i]) + parseInt(sumM5[i])+ parseInt(sumM6[i]))/6)], 'backgroundColor': randColor, 'borderColor': randColor, 'fill': false, 'lineTension': 0, 'radius': 5});
}
 
  
  return block;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function rankProducts(dataArray) {
  let productRank = {};
  dataArray.forEach(item => {
    if(productRank[item.Product] === undefined) {
      //Creates an item in the map
      productRank[item.Product] =  Number(item.TRx_Month_1) + Number(item.TRx_Month_2) + Number(item.TRx_Month_3) + Number(item.TRx_Month_4) + Number(item.TRx_Month_5) + Number(item.TRx_Month_6);
    } else {
      //Adds additional items into the map
      productRank[item.Product] +=  Number(item.TRx_Month_1) + Number(item.TRx_Month_2) + Number(item.TRx_Month_3) + Number(item.TRx_Month_4) + Number(item.TRx_Month_5) + Number(item.TRx_Month_6);
    }
  })
  delete productRank['undefined'];
  var productRankOrdered = [];
  for (var product in productRank) {
    productRankOrdered.push([product, productRank[product]]);
  }
  productRankOrdered.sort(function(a, b) {
      return b[1] - a[1];
  });
  return productRankOrdered;
}


function differentProducts(dataArray) {
  var diffProds = [];

  diffProds.push("All Products")
  dataArray.forEach(item => {
    if(!diffProds.includes(item.Product)) {
      diffProds.push(item.Product)
    }
  })

  diffProds = diffProds.filter(function( element ) {
    return element !== undefined;
 });



  return diffProds;
}


function getTopDoctors(dataArray, state, product) {
  let doctors = [];
  dataArray.forEach(item => {
    if ((state === "All States" || item.State === state) && (product === "All Products" || item.Product === product)) {
      let sum = Number(item.TRx_Month_1) + Number(item.TRx_Month_2) + Number(item.TRx_Month_3) + Number(item.TRx_Month_4) + Number(item.TRx_Month_5) + Number(item.TRx_Month_6);
      doctors.push({id: item.id, first_name: item.first_name, last_name: item.last_name, total: sum});
    }
  });
  doctors.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
  doctors.length = 10;
  return doctors;
}

function getTopFutureDoctors(dataArray, state, product) {
  let doctors = [];
  dataArray.forEach(item => {
    if ((state === "All States" || item.State === state) && (product === "All Products" || item.Product === product)) {
      let sum = Number(item.NRx_Month_1) + Number(item.NRx_Month_2) + Number(item.NRx_Month_3) + Number(item.NRx_Month_4) + Number(item.NRx_Month_5) + Number(item.NRx_Month_6);
      doctors.push({id: item.id, first_name: item.first_name, last_name: item.last_name, total: sum});
    }
  });
  doctors.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
  doctors.length = 10;
  return doctors;
}

function GFG_Fun(inData, elem_id) {
  var select = document.getElementById(elem_id);
  var choices = differentProducts(inData);
  for (var i = 0; i < choices.length; i++) {
    var optn = choices[i];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;
    select.appendChild(el);
  }
}

function setTopTotalTable(tableId, topData) {
  let table = document.getElementById(tableId);
  table.innerHTML = "";
  let th = document.createElement("thead");
  th.innerHTML = "<th>Rank</th><th>Name</th><th>Total Prescribed</th>";
  table.appendChild(th);
  let tb = document.createElement("tbody");
  console.log(topData)
  console.log("Why")
  topData.forEach((item, index) => {
    // For each doctor object in topData
    let tr = document.createElement("tr");
    tr.innerHTML = "<tr><td>" + (index+1) + "</td><td>" + item.first_name + " " + item.last_name + "</td><td>" + item.total + "</td></tr>";
    tb.appendChild(tr);
  })
  table.appendChild(tb);
}

function setTopTotalTable2(tableId, topData) {
  let table = document.getElementById(tableId);
  table.innerHTML = "";
  let th = document.createElement("thead");
  th.innerHTML = "<th>Rank</th><th>Name</th><th>Total New Prescriptions</th>";
  table.appendChild(th);
  let tb = document.createElement("tbody");
  console.log(topData)
  console.log("Why")
  topData.forEach((item, index) => {
    // For each doctor object in topData
    let tr = document.createElement("tr");
    tr.innerHTML = "<tr><td>" + (index+1) + "</td><td>" + item.first_name + " " + item.last_name + "</td><td>" + item.total + "</td></tr>";
    tb.appendChild(tr);
  })
  table.appendChild(tb);
}

let globalData = [];
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    globalData = data;
    GFG_Fun(data, "ProdSelect")
    GFG_Fun(data, "ProdSelectFuture")
    makeLineChart(linechart(data));
    makePieChart(rankProducts(data));
    setTopTotalTable("topTotalTable", getTopDoctors(data, "All States", "All Products"));
    setTopTotalTable2("topTotalFutureTable", getTopFutureDoctors(data, "All States", "All Products"));
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("analysisPage").style.display = "block";

  };

  reader.readAsText(input);
});

topTotalStates = document.getElementById("topTotalStatesSelect");
topTotalProduct = document.getElementById("ProdSelect");

topTotalStates.addEventListener('change', () => {
  console.log(topTotalStates.value);
  setTopTotalTable("topTotalTable", getTopDoctors(globalData, topTotalStates.value, "All Products"));
})

topTotalProduct.addEventListener('change', () => {
  setTopTotalTable("topTotalTable", getTopDoctors(globalData, "All States", topTotalProduct.value));
})


topTotalFutureStates = document.getElementById("topTotalFutureStatesSelect");
topTotalFutureProduct = document.getElementById("ProdSelectFuture");

topTotalFutureStates.addEventListener('change', () => {
  setTopTotalTable("topTotalFutureTable", getTopFutureDoctors(globalData, topTotalFutureStates.value, "All Products"));
})
topTotalFutureProduct.addEventListener('change', () => {
  setTopTotalTable("topTotalFutureTable", getTopFutureDoctors(globalData, "All States", topTotalFutureProduct.value));
})
