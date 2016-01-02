// ## Configures data for Bar Chart

function chartConfig(data) {
  //data should be formatted as an array with objects for data points
  let actual = data.map((budget) => {
    return budget.actual
  })

  let budget = data.map((budget) => {
    return budget.target
  })
  let categories = data.map((budget) => {
    return budget.description
  })

  let config = {
    
    chart: {
      type: 'column'
    },
    title: {
      text: 'Budget vs. Actual'
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Amount'
      }
    },
    legend: {
      shadow: false,
    },
    tooltip: {
      shared: true,
      formatter: function() {
        return '<strong>' + this.x + '</strong><br/><p style={"color":"' + this.points[0].color + '"}>' + this.points[0].series.name + ' : $' + this.y.toLocaleString() + '</p>'
          + '<br/><p style={"color":"' + this.points[0].color + '"}>' + this.points[1].series.name + ' : $' + this.points[1].y.toLocaleString()
      }
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Budget',
      color: 'rgba(165,170,217,1)',
      data: budget,
      pointPadding: 0.3,
      pointPlacement: 0.0
    }, {
      name: 'Actual',
      color: 'rgba(126,86,134,.9)',
      data: actual,
      pointPadding: 0.4,
      pointPlacement: 0.0
    }],
    credits: {
      enabled: false
    }

  }

  return config
}

export default chartConfig
