import React, { Component } from 'react';
import Chart from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
import pattern from 'patternomaly';

import { oneHundredRandomColors } from '../utils/generateChartColors.js';

class BudgetDoughnutChart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    const ctx = document.getElementById('doughnut-chart');
    const { budgetLabels, budgetValues } = this.props
    const colorsNeeded = budgetLabels.length;
    const backgroundColors = []
    for (let i = 0; i < colorsNeeded; i += 1) {
      const currentEl = oneHundredRandomColors[i % 100];
      backgroundColors.push(pattern.draw(currentEl.pattern, currentEl.color))
    }
    const chartConfig = {
      type: 'doughnut',
      data: {
        labels: budgetLabels,
        datasets: [{
          label: 'label',
          data: budgetValues,
          backgroundColor: backgroundColors,
        }]
      },
      cutoutPercentage: 20,
      circumference: 2 * Math.PI
    }
    new Chart(ctx, chartConfig); 
    console.log(`The props are --> `, this.props)
  }

  render() {
    return (
      <div>
        <h2>Doughnut Example</h2>
        <canvas id="doughnut-chart" name="doughnut-chart"></canvas>
      </div>
    );
  }
}

export default BudgetDoughnutChart;