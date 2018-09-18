import React, { Component } from 'react'
import * as d3 from 'd3'

import './Chart.scss'

class Chart extends Component<Props> {
  initStackChart = (dataSet) => {
    const svgHeight = 240
    const barWidth = 10
    const step = 40
    const offsetX = 20

    const color = ["#69d1ff", "#6258e5", "#f15f9f"]

    const stack = d3.stack()
      .keys(['deployment', 'execution', 'transfer'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone)

    d3.select(this.$graph)
      .selectAll('g')
      .data(stack(dataSet))
      .enter()
      .append('g')
      .attr('fill', (d, i) => color[i])
      .selectAll('rect')
      .data((d, i) => d)
      .enter()
      .append('rect')
      .attr('x', (d, i) => offsetX + i * step)
      .attr('y', (d, i) => d[1])
      .attr('width', barWidth)
      .attr('height', (d, i) => {
        return svgHeight - d[1] - d[0]
      })
  }

  initCurvedLineChart = (dataSet) => {
    
  }

  componentDidMount() {
    var dataSet = [
      { month: new Date(2015, 0, 1), deployment: 38, execution: 19, transfer: 9},
      { month: new Date(2015, 1, 1), deployment: 16, execution: 14, transfer: 29},
      { month: new Date(2015, 2, 1), deployment: 16, execution: 19, transfer: 17},
      { month: new Date(2015, 3, 1), deployment: 11, execution: 8, transfer: 14},
      { month: new Date(2015, 4, 1), deployment: 31, execution: 14, transfer: 19},
      { month: new Date(2015, 5, 1), deployment: 13, execution: 44, transfer: 21},
      { month: new Date(2015, 6, 1), deployment:  3, execution: 54, transfer: 41},
    ]

    this.initStackChart(dataSet)
  }

  render() {
    return (
      <svg className="Chart" ref={($graph) => this.$graph = $graph} />
    )
  }
}

export default Chart
