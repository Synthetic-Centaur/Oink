//configures data for High-chart

function chartConfig(data) {
  console.log('DATA inside chartConfig:', data)
  //data should be formatted as an array with objects for data points
<<<<<<< HEAD
  let total = 0
  let budget = []
  for(var i=0; i<data.length; i++) {
    total += data[i].target
  }
  for(var j=0; j<data.length; j++) {
    budget.push({name: data[j].description, y: data[j].target/total})
  }
=======

  console.log('chartconfig data: ', data)

  let total = 0
  let budget = []

  for (var i = 0; i < data.length; i++) {
    total += parseInt(data[i].target)
  }
  console.log('total', total)
  for (var j = 0; j < data.length; j++) {
    budget.push({name: data[j].description, y: parseInt(data[j].target) / total})
  }
  console.log('info:', budget)

>>>>>>> Populating dropdown, populating pie chart
  let config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Budget'
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
    }]
  }

  return config;
}

export default chartConfig
