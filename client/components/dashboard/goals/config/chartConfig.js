import moment from 'moment'

function chartConfig(data, net, avg) {
  let goalStart = moment(data.goalStarted)
  let goalEnd = moment(data.goalBy)
  let daysToGoal = goalEnd.diff(goalStart, 'days')
  let avgNeeded = (data.amount / daysToGoal)
  let avgActual = -(Math.min(net.lastMonth, net.lastThree, net.lastSix, net.lastYear) / 30)
  let goalPath = []
  let actualPath = []
  let userPath = []
  let dateScale = [goalStart.format('M/D/YY')]
  let generatePath = (path, avg) => {
    for (var i = 0; i <= daysToGoal; i++) {
      path.push(Math.round(avg * i))
    }
  }
  generatePath(goalPath, avgNeeded)
  generatePath(actualPath, avgActual)
  generatePath(userPath, avg)

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
      plotLines: [{
        color: 'red',
        label: {
          text: 'Today',
          align: 'left'
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
      valuePrefix: '$'
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
    }]
  }

  return config
}

export default chartConfig