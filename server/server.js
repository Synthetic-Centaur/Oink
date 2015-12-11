/* eslint-disable no-console, no-use-before-define */

import Express from 'express'

var app = new Express()

const port = process.env.PORT || 3000


if (process.env.NODE_ENV === 'dev') {
  app.listen(port, (error) => {
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

export default app