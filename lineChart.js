function makeLineChart(dataset) {
  const ctx = document.getElementById('lineChart');
  console.log("Before");
  console.log(dataset);
  console.log("After");
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7 Prediction"],
        datasets: [
          {
            label: "Cholecap",
            data: dataset["Cholecap"],
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
          },
          {
            label: "Zap-a-Pain",
            data: dataset["Zap-a-Pain"],
            backgroundColor: "green",
            borderColor: "lightgreen",
            fill: false,
            lineTension: 0,
            radius: 5
          },
          {
            label: "Nasalclear",
            data: dataset["Nasalclear"],
            backgroundColor: "orange",
            borderColor: "#ffd699",
            fill: false,
            lineTension: 0,
            radius: 5
          },
          {
            label: "Nova-itch",
            data: dataset["Nova-itch"],
            backgroundColor: "purple",
            borderColor: "#ff33ff",
            fill: false,
            lineTension: 0,
            radius: 5
          }
        ]
      },
      options: {
        title: {
          display: true,
          position: "top",
          text: "TRx predictions",
          fontSize: 18,
          fontColor: "#fff"
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
  });
}