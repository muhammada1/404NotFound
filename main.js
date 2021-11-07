console.log("Working");
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFileInput");

var input = document.getElementById( 'file-upload' );
var infoArea = document.getElementById( 'file-upload-filename' );
//input.addEventListener( 'change', showFileName );
function showFileName( event ) {
  
  // the change event gives us the input it occurred in 
  var input = event.srcElement;
  
  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var fileName = input.files[0].name;
  
  // use fileName however fits your app best, i.e. add it into a div
  infoArea.textContent = 'File name: ' + fileName;
}











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

function rankDoctors(doctors, state, dataArray){
  let myMap = new Map;
  let mapSort1 = new Map;
  let i = 1;
  if(state === "All States"){
    doctors.forEach(item => {
      myMap.set(i,item);
      i++;
    })
    mapSort1 = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));
    console.log(mapSort1);
  } else {
    doctors.forEach(item => {
      
      if(dataArray[i-1].State === state){

        myMap.set(i,item);
      }
      i++;
      
      
    })
    const mapSort1 = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));
    console.log(mapSort1);
    
  }

  return mapSort1;
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


function GFG_Fun(inData) {
  var select = document.getElementById("ProdSelect");
  var choices1 = rankDoctors(getTotalsNRX(inData),"All States",inData);
  var choices = Object.keys(choices1);
  //var choices = ["test","val"];
  for (var i = 0; i < choices.length; i++) {
    var optn = choices[i];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;
    select.appendChild(el);
  }
}


myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    console.log(data);
    console.log(getTotalsNRX(data));
    console.log(rankProducts(data));
    console.log(rankDoctors(getTotalsNRX(data),"All States",data));
    GFG_Fun(data);
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("analysisPage").style.display = "block";
    //document.write(JSON.stringify(data));


    //Product Select Choice Gen
    var choices1 = rankDoctors(getTotalsNRX(data),"All States",data);
    var choices = choices1.entries();
    console.log(choices)




  };

  reader.readAsText(input);
});
