

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BudgetDoughnutChart from './budgetDoughnutChart.jsx';
import BudgetBarChart from './budgetBarChart.jsx';

class VisualizeBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: 'hide',
    }
    this.switchViewMode = this.switchViewMode.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
  }

  switchViewMode() {
    const currentMode = this.state.viewMode;
    if (currentMode === 'show') {
      this.setState({ viewMode: 'hide'});
    }
    this.setState({ viewMode: 'show' });
  }

  renderCharts() {
    const { viewMode } = this.state;
    if (viewMode === 'hide') {
      return (
        <button 
          className = "visualize-budget"
          onClick = { this.switchViewMode }> Visualize
        </button>
      )
    } else if (viewMode === 'show') {
      const { budgetLabels, budgetValues } =  this.props;
      
      return (
        <div>
          <button 
            className = "visualize-budget"
            onClick = { this.switchViewMode }> Hide Charts
          </button>
          <div className = "charts">
            <div className = "doughnut-chart">
              <BudgetDoughnutChart 
                budgetLabels = { budgetLabels }
                budgetValues = { budgetValues }
              />
            </div>
            <div className = "bar-chart">
              <BudgetBarChart
                budgetLabels = { budgetLabels }
                budgetValues = { budgetValues }
              />
            </div>
          </div>
        </div>
      )
    }

  }

  render() {
    { return this.renderCharts() }
  }
}

export default VisualizeBudget;