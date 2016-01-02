import moment from 'moment'

function chartConfig(data, net, avg) {
  let goalStart = moment(data.goalStarted)
  let goalEnd = moment(data.goalBy)
  let daysToGoal = goalEnd.diff(goalStart, 'days')
  let avgNeeded = (data.amount / daysToGoal)

  // takes the best average savings to be used for actual path
  let avgActual = -(Math.min(net.lastMonth, net.lastThree, net.lastSix, net.lastYear) / 30)
  let goalPath = []
  let actualPath = []
  let userPath = []
  let dateScale = [goalStart.format('M/D/YY')]

  // function to generate plot points for graph series
  let generatePath = (path, avg) => {
    for (var i = 0; i <= daysToGoal; i++) {
      path.push(Math.round(avg * i))
    }
  }

  generatePath(goalPath, avgNeeded)
  generatePath(actualPath, avgActual)
  generatePath(userPath, avg)

  // populates x axis with dates within goal range
  for (var k = 0; k <= daysToGoal; k++) {
    dateScale.push(goalStart.add(1, 'day').format('M/D/YY'))
  }

  let today = dateScale.indexOf(moment().format('M/D/YY'))
  let config = {
    title: {
      text: 'Goal Predictions',
      x: 0 //center
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      categories: dateScale,

      // this is to show a line on the current date
      plotLines: [{
        color: '#FF1970',
        label: {
          text: 'Today',
          align: 'left',
          style: {
            color: '#ccc'
          }
        },
        value: today,
        width: 2
      }]
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
      valuePrefix: '$',

      // custom formatting for tooltip, toLocaleString formats it with commas for localization
      formatter: function() {
        return '<b>You should have saved $' + this.y.toLocaleString() + '</b><br/>' +
        'By: ' + this.x + '<br/>' +
        'This is your ' + this.series.name + ' path'
      }
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Goal',
      data: goalPath
    }, {
      name: 'Actual',
      data: actualPath
    }, {
      name: 'Experiment!',
      data: userPath
    }],
    credits: {
      enabled: false
    }
  }

  return config
}

export default chartConfig