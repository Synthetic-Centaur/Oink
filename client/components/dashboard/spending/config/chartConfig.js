import moment from 'moment'

function chartConfig(data, selectDate) {
  data = data.transactions
  let series = []
  let categories = []
  let tempSum = 0
  let nextDate
  if (data) {
    for (var i = 0; i < data.length; i++) {
      let date =  data[i].date

      // prevents duplication of dates in x axis
      if (categories.indexOf(date) === -1) {
        categories.push(date)
      }
    }

    // resolves a bug where categories were displaying in random order
    categories = categories.sort()
    for (var j = 0; j < data.length; j++) {
      let index = categories.indexOf(data[j].date)

      // adds to series array at same index of date, if already present it will add to the sum.
      series[index] = series[index] === undefined ? -Math.round(data[j].amount) : series[index] + -Math.round(data[j].amount)
    }

  }

  let config = {
    legend: {
      enabled: false
    },
    chart: {
      type: 'line',
      zoomType: 'x',
      panning: true,
      panKey: 'shift'
    },
    title: {
      text: 'Spending Over Time'
    },
    xAxis: {
      categories: categories.map((date) => {
        return moment(date).format('M/D/YY')
      })
    },
    tooltip: {
      valuePrefix: '$',
      formatter: function() {

        // formats tooltip, toLocaleString adds commas and decimals based on localization
        return '<p>Daily Net: $' + this.y.toLocaleString() + '</p><br/>' +
          '<p>on ' + moment(this.x).format('M/D/YY') + '</p>'
      }
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {

            // sends dispatch to show selected date's transactions
            click: function(e) {selectDate(categories[this.x])}
          }
        }
      }
    },
    series: [{
      name: 'Spending',
      data: series || [],
      zones: [{
        value: 0,
        color: '#FF8A80'
      }, {
        color: '#B4CCB9'
      }]
    }],
    credits: {
      enabled: false
    }
  }

  return config
}

export default chartConfig
