console.log("Working");
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFileInput");
const csvInputButton = document.getElementById("csvInputButton");
csvInputButton.value = csvFile.value == "" ? "Browse...": csvFile.value.split(/(\\|\/)/g).pop();


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

function rank(doctors, state, dataArray){
  let myMap = new Map;
  let mapSort2 = new Map;
  let i = 1;
  if(state === "All States"){
    doctors.forEach(item => {
      myMap.set(i,item);
      i++;
    })
    mapSort2 = new Map([...myMap.entries()].sort((a, b) => a[1] - b[1]));
    console.log(mapSort2);
  } else {
    doctors.forEach(item => {
      if(dataArray[i].State === state){

        myMap.set(i,item);
      }

      i++;

    })
    mapSort2 = new Map([...myMap.entries()].sort((a, b) => a[1] - b[1]));
    console.log(mapSort2);

  }

  return mapSort2;
}




function getTotals(dataArray) {
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

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    console.log(data);
    console.log(getTotals(data))
    console.log(rank(getTotals(data),"All States",data))
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("analysisPage").style.display = "block";
    //document.write(JSON.stringify(data));
  };

  reader.readAsText(input);
});
