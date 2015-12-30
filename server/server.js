// # Node/Express Web Server

import Express from 'express'
import cors from 'cors'

var app = new Express()
app.use(cors())

const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  var server = app.listen(port, (error) => {
    if (error) {
      console.error(error)
    } else {
      console.info(`==>   Listening on port ${port}. NODE_ENV is ${process.env.NODE_ENV}.`)
    }
  })

} else {
  app.listen(port, '0.0.0.0', (error) => {
    if (error) {
      console.error(error)
    } else {
      console.info(`==>   Listening on port ${port}. NODE_ENV is ${process.env.NODE_ENV}.`)
    }
  })
}

export var server

export default app
