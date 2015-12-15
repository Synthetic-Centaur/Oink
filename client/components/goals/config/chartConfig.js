let config = {
  title: {
        text: 'Goal Predictions',
        x: 0 //center
    },
    xAxis: {
        title: {
          text: 'Date'
        },
        categories: ['Now', 'Then']
    },
    yAxis: {
        title: {
            text: 'Goal ($)'
        },
        plotLines: [{
            value: 0.5,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        valuePrefix: '$'
    },
    series: [{
        name: 'Goal',
        data: [0, 500]
    }, {
      name: 'Actual',
      data: [0, 375]
    }]
}
export default config