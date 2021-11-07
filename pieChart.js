function makePieChart(productRankOrdered) {
  const ctx = document.getElementById('pieChart');
  let sum = 0;
  let xVal = [];
  let yVal = [];
  for (var i = 0; i < productRankOrdered.length; i++) {
    sum+=productRankOrdered[i][1];
  }
  if(productRankOrdered.length >= 5){
    for(var i = 0; i < 5; i++){
      xVal[i] = productRankedOrdered[i][0];
      yVal[i] = productRankOrdered[i][1];
    }
  } else {
    for(var i = 0; i < productRankOrdered.length; i++){
      xVal[i] = productRankOrdered[i][0];
      yVal[i] = productRankOrdered[i][1];
    }
  }
  var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
  ];

  new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: xVal,
      datasets: [{
        backgroundColor: barColors,
        data: yVal
      }]
    },
    options: {
      title: {
        display: true,
        text: "Most Prescribed Products",
        fontSize: 24,
        fontColor: "#fff"
      },
      legend: {
	labels: {
	  fontColor: "white"
	}
      }
    }
  });
}
