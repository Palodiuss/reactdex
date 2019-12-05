import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }
  render() {
    return <Radar data={this.state.chartData} options={options} />;
  }
}

export default Chart;

const options = {
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
      suggestedMax: 140,
      stepSize: 20
    }
  },
  legend: {
    display: false
  },
  maintainAspectRatio: false
};
