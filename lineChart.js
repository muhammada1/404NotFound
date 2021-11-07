function makeLineChart(dataset) {
  
  
  var occ = []
  dataset.forEach(item => {
      occ.push(item);
  })



  const ctx = document.getElementById('lineChart');
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7 Prediction"],
        datasets: occ
      },
      options: {
        title: {
          display: true,
          position: "top",
          text: "TRx predictions",
          fontSize: 24,
          fontColor: "#fff"
        },
	legend: {
          labels: {
            fontColor: "white"
          }
        },
        scales: {
	  yAxes: [{
            ticks: {
              beginAtZero:true,
              fontColor: 'white'
            },
	    gridLines: { color: 'white' }
          }],
	  xAxes: [{
            ticks: {
              beginAtZero:true,
              fontColor: 'white'
            },
	    gridLines: { color: 'white' }
          }],
        },
      }
  });
}
