function makeLineChart(dataArray) {
  const ctx = document.getElementById('lineChart');
  console.log("Before");
  const dataset = getLineChartData();
  console.log("After");
  console.log(dataset);
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            label: "Cholecap",
            data: [10, 50, 25, 70, 40],
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
          },
          {
            label: "TeamB Score",
            data: [20, 35, 40, 60, 50],
            backgroundColor: "green",
            borderColor: "lightgreen",
            fill: false,
            lineTension: 0,
            radius: 5
          }
        ]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}
