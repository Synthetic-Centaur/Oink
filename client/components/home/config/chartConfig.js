//configures data for High-chart

function chartConfig(data) {
  //data should be formatted as an array with objects for data points
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
      name: 'Brands',
      colorByPoint: true,
      data: data
    }]
  }

  return config;
}

export default chartConfig