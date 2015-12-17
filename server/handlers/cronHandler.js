import cronController from '../controllers/cronController'
import authController from '../controllers/authController'
import Promise from 'bluebird'
import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport();

let cronHandler = {

  sendMail: function() {
    //get all users by mailBoolean
    cronController.findUsersByMail()
      .then((users) => {
        if (users) {
          Promise.each(users, (user) => {
            //get users transactions/actul for week
            cronController.userTransactions(user.id)
              .then((sums) => {
                console.log('here are your sum-------->', sums)
                //send email


                let script = '<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div><script src="https://code.highcharts.com/highcharts.js"></script><script src="https://code.highcharts.com/modules/data.js"></script><script src="https://code.highcharts.com/modules/exporting.js"></script><script>document.getElementById("container").highcharts({chart: {type: "bar"},title: {text: "Your weekly financial summary"},xAxis: {categories: ["Africa", "America", "Asia", "Europe", "Oceania"],title: {text: null}},yAxis: {min: 0,title: {text: "Population (millions)",align: "high"},labels: {overflow: "justify"}},tooltip: {valueSuffix: " millions"},plotOptions: {bar: {dataLabels: {enabled: true}}},legend: {layout: "vertical",align: "right",verticalAlign: "top",x: -40,y: 80,floating: true,borderWidth: 1,backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || "#FFFFFF"),shadow: true},credits: {enabled: false},series: [{name: "Year 1800",data: [107, 31, 635, 203, 2]}, {name: "Year 1900",data: [133, 156, 947, 408, 6]}, {name: "Year 2012",data: [1052, 954, 4250, 740, 38]}]})</script>'

                let mailOptions = {
                  from: 'aaronbackerman@gmail.com',
                  to: user.email,
                  subject: 'Your weekend summary',
                  text: 'Hello from Oink Financial!!',
                  html: script
                }

                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return console.log(error)
                  }
                })
                
              })
            //get users budget for week

          })

        } 

      })
  },

  cancelEmail: function(req, res) {
    authController.findUserByToken(req)
      .then((user) => {
        cronController.cancelEmail(user, function(err, result) {
          if (result) {
            res.status(200)
            res.json({success: true})
          } else {
            res.state(400)
          }
        })
      })
  }

}

export default cronHandler