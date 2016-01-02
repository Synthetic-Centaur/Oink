import schedule from 'node-schedule'
import cronHandler from './handlers/cronHandler'
import apiHandler from './handlers/apiHandler'

let jobSchedules = {

  // Schedules cron job to send out user mail on Sundays at 10 AM
  emailSchedule() {
    let rule = new schedule.RecurrenceRule()
    rule.dayOfWeek = 0
    rule.hour = 10
    rule.minute = 0

    let job = schedule.scheduleJob(rule, cronHandler.sendMail)
    return job
  },

  // Schedules cron job to update user plaid transactions daily at midnight
  dailyTransactions() {
    let job = schedule.scheduleJob('0 0 12 * * *', apiHandler.usersDailyTransactions)
    return job
  }

}

export default jobSchedules