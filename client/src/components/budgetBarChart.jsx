import React, { Component } from 'react';
import Chart from 'chart.js';
import pattern from 'patternomaly';

import { oneHundredRandomColors } from '../utils/generateChartColors.js';


class BudgetBarChart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const ctx = document.getElementById('bar-chart');
    const { budgetLabels, budgetValues } = this.props
    const colorsNeeded = budgetLabels.length;
    const backgroundColors = []
    for (let i = 0; i < colorsNeeded; i += 1) {
      const currentEl = oneHundredRandomColors[i % 100];
      backgroundColors.push(pattern.draw(currentEl.pattern, currentEl.color))
    }
    const chartConfig = {
      type: 'horizontalBar',
      data: {
        labels: budgetLabels,
        datasets: [{
          label: 'Hours Budgeted Per Category',
          data: budgetValues,
          backgroundColor: backgroundColors,
          xAxisId: 'Categories',
          yAxisId: 'Hours'
        }]
      },
      barPercentage: 0.9,
      barThickness: 'flex',
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
    new Chart(ctx, chartConfig); 
  }
  render() {
    const chartStyle = {
      position: 'relative', 
      height: '40vh', 
      width: '80vw'
    }
    return (
      <div className="bar-chart-container">
        <h2>Bar Example</h2>
        <canvas id="bar-chart" name="bar-chart"></canvas>
      </div>
    )
  }
}

export default BudgetBarChart;