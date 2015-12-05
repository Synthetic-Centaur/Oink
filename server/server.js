/* eslint-disable no-console, no-use-before-define */

import Express from 'express'

var app = new Express()

const port = 3000

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==>   Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

export default app
