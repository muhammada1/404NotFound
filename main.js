console.log("Working");
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFileInput");
const csvInputButton = document.getElementById("csvInputButton");
csvInputButton.value = csvFile.value.split(/(\\|\/)/g).pop();


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
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("analysisPage").style.display = "block";
    //document.write(JSON.stringify(data));
  };

  reader.readAsText(input);
});
