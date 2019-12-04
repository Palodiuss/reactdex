import React, { Component } from "react";
import { Radar, Bar } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "hp",
          "attack",
          "defense",
          "special-attack",
          "special-defense",
          "speed"
        ],
        datasets: [
          {
            label: "stats",
            data: [91, 100, 95, 100, 100, 82],
            backgroundColor: "rgba(59, 96, 252, 0.6)",
            pointStyle: "circle",

            pointRadius: 3
          }
        ]
      }
    };
  }
  render() {
    return <Radar data={this.state.chartData} options={options} />;
  }
}

export default Chart;

const options = {
  // scales: {
  //   yAxes: [{ ticks: { beginAtZero: true, maximum: 300, fontSize: 16 } }],
  //   xAxes: [{ ticks: { beginAtZero: true, fontSize: 16 } }]
  // }
  scale: {
    angleLines: {
      display: false
    },
    ticks: {
      callback: function() {
        return "";
      },
      backdropColor: "rgba(0, 0, 0, 0)",
      suggestedMin: 0,
      suggestedMax: 180,
      stepSize: 20
    }
  },
  legend: {
    display: false
  },
  maintainAspectRatio: false
};
