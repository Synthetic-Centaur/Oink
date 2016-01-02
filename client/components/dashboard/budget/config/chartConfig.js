//configures data for High-chart

function chartConfig(data) {
  //data should be formatted as an array with objects for data points
  let total = 0
  let budget = []
  
  for (var i = 0; i < data.length; i++) {
    total += data[i].target
  }

  for (var j = 0; j < data.length; j++) {
    budget.push({name: data[j].description, y: data[j].target / total})
  }

  let config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Your Budgets'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
    },
    series: [{
      name: 'Budget',
      colorByPoint: true,
      data: budget
    }],
    credits: {
      enabled: false
    }
  }

  return config
}

export default chartConfig
