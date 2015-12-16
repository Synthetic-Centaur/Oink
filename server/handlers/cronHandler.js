import schedule from 'node-schedule'

let scheduler = {
  addText(reminder) {

    let job = schedule.scheduleJob('job_call_' + reminder._id, new Date(parseInt(reminder.shdlCall)), function () {
      //trigger twillio text
    })

    job.remId = reminder._id
    //return saving job in database

  },
  cancelText(req, res) {

  }
}

export default cronHandler