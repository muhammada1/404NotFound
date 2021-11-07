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

function getLineChartData(dataArray) {
  let output = {};
  dataArray.forEach(item => {
    if (output[item.Product] == undefined) {
      output[item.Product] = [0,0,0,0,0,0];
    }
    output[item.Product][0] += Number(item.TRx_Month_1);
    output[item.Product][1] += Number(item.TRx_Month_2);
    output[item.Product][2] += Number(item.TRx_Month_3);
    output[item.Product][3] += Number(item.TRx_Month_4);
    output[item.Product][4] += Number(item.TRx_Month_5);
    output[item.Product][5] += Number(item.TRx_Month_6);
  });
  // Predict next by getting average
  Object.keys(output).forEach((key) => {
    output[key][6] = Math.floor(output[key].reduce((a, b) => {return a + b;}, 0) / 6);
  })
  return output;
}

function getTotalsTRX(dataArray) {
  // Calculate totals trx
  let doctors = []
  dataArray.forEach(item => {
    let sum = 0;
    sum += Number(item.TRx_Month_1);
    sum += Number(item.TRx_Month_2);
    sum += Number(item.TRx_Month_3);
    sum += Number(item.TRx_Month_4);
    sum += Number(item.TRx_Month_5);
    sum += Number(item.TRx_Month_6);
    doctors[item.id] = sum;
  })
  return doctors;
}
function getTotalsNRX(dataArray) {
  // Calculate totals nrx
  let doctors = []
  dataArray.forEach(item => {
    let sum = 0;
    sum += Number(item.NRx_Month_1);
    sum += Number(item.NRx_Month_2);
    sum += Number(item.NRx_Month_3);
    sum += Number(item.NRx_Month_4);
    sum += Number(item.NRx_Month_5);
    sum += Number(item.NRx_Month_6);
    doctors[item.id] = sum;
  })
  return doctors;
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

function rankDoctors(doctors, state, dataArray){
  let doctorRankState = {};
  if(state === "All States"){
    dataArray.forEach(item => {
      let doctorRank = {};
      if (doctorRankState[item.State] === undefined) doctorRankState[item.State] = {};
      doctorRankState[item.State][item.id] = Number(item.TRx_Month_1) + Number(item.TRx_Month_2) + Number(item.TRx_Month_3) + Number(item.TRx_Month_4) + Number(item.TRx_Month_5) + Number(item.TRx_Month_6)
    })
  }

  delete doctorRankState['undefined'];


  return doctorRankState;
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

function GFG_Fun(inData) {
  var select = document.getElementById("ProdSelect");
  var choices = differentProducts(inData);
  //var choices = ["test","val"];
  for (var i = 0; i < choices.length; i++) {
    var optn = choices[i];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;
    select.appendChild(el);
  }
function setTopTotalTable(tableId, topData) {
  let table = document.getElementById(tableId);
  table.innerHTML = "";
  let th = document.createElement("thead");
  th.innerHTML = "<th>Rank</th><th>Name</th><th>Total Prescribed</th>";
  table.appendChild(th);
  let tb = document.createElement("tbody");
  console.log(topData)
  console.log("WHAT!")
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
    makeLineChart(getLineChartData(data));
    makePieChart(rankProducts(data));
    console.log(data);
    console.log(getTotalsNRX(data));
    console.log(rankProducts(data));
    console.log(rankDoctors(getTotalsNRX(data),"All States",data));
    console.log(differentProducts(data));




    GFG_Fun(data);
    //console.log(pieChart(rankProducts(data)))
    console.log(getTotalsNRX(data))
    console.log(rankProducts(data))
    //console.log(pieChart)
    console.log(rankDoctors(getTotalsNRX(data),"Ohio",data))
    setTopTotalTable("topTotalTable", getTopDoctors(data, "All States", "All Products"));
    setTopTotalTable("topTotalFutureTable", getTopFutureDoctors(data, "All States", "All Products"));
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("analysisPage").style.display = "block";

  };

  reader.readAsText(input);
});

topTotalStates = document.getElementById("topTotalStatesSelect");
topTotalProduct = document.getElementById("topTotalStatesSelect");

topTotalStates.addEventListener('change', () => {
  console.log(topTotalStates.value);
  setTopTotalTable("topTotalTable", getTopDoctors(globalData, topTotalStates.value, "All Products"));
})
topTotalProduct.addEventListener('change', () => {
  setTopTotalTable("topTotalTable", getTopDoctors(globalData, "All States", topTotalProduct.value));
})

/*
topTotalFutureStates = document.getElementById("topTotalFutureStatesSelect");
topTotalFutureProduct = document.getElementById("topTotalFutureStatesSelect");

topTotalFutureStates.addEventListener('change', () => {
  setTopTotalTable("topTotalFutureTable", getTopFutureDoctors(globalData, "All States", topTotalProduct.value));
})
topTotalFutureProduct.addEventListener('change', () => {
  setTopTotalTable("topTotalFutureTable", getTopFutureDoctors(globalData, topTotalS, "All Products"));
})
*/
