import schedule from 'node-schedule'
import cronHandler from './handlers/cronHandler'

export default function() {
  console.log('in scheduler, job is: ---------->')

  // let rule = new schedule.RecurrenceRule()
  // rule.dayOfWeek = 4
  // rule.hour = 10
  // rule.minute = 0

  let job = schedule.scheduleJob('*/1 * * * *', cronHandler.sendMail)
}