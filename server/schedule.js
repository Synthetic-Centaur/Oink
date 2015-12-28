import schedule from 'node-schedule'
import cronHandler from './handlers/cronHandler'
import apiHandler from './handlers/apiHandler'

let jobSchedules = {

  emailSchedule() {
      //currently set up to email on Sundays at 10 AM
    let rule = new schedule.RecurrenceRule()
    rule.dayOfWeek = 0
    rule.hour = 10
    rule.minute = 0

    let job = schedule.scheduleJob(rule, cronHandler.sendMail)
  }

  dailyTransactions() {
    let job = schedule.scheduleJob('00 00 24 * * *', apiHandler.usersDailyTransactions)
  }

}


export default jobSchedules