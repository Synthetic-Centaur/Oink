let expect = require('chai').expect
let schedules = require('../../server/schedule')
let cronHandler = requireu('../../server/handlers/cronHandler')

describe('Schedule initiation', () => {
  it('Should schedule weekly email job for the first of every week', (done) => {
    let emailJob = schedules.emailSchedule()
    expect(emailJob).not.to.be.null
    expect(emailJob.job).to.be.a('function')
    expect(emailJob.job).to.equal('sendMail')
  })

  it('Should schedule daily update for Plaid transactions', () => {
    let updateJob = schedules.dailyTransactions()
    expect(updateJob).not.to.be.null
    expect(updateJob.job).to.be.a('function')
    expect(updateJob.job).to.equal('usersDailyTransactions')
  })
})
