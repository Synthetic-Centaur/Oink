import schedule from 'node-schedule'
import cronHandler from './handlers/cronHandler'

export default function() {
  console.log('in scheduler, job is: ---------->')
  let job = schedule.scheduleJob('*/1 * * * *', cronHandler.sendMail)
}