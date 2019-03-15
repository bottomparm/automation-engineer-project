const rp = require('request-promise')
const express = require('express')

const app = express()

app.listen(3000, () => {
  console.log("DATA FETCHER RUNNING OR PORT 3000")
})

app.get('/users', async (req, res) => {
  const opts = {
    method: 'GET',
    uri: 'https://jsonplaceholder.typicode.com/users',
    json: true
  }

  const users = await rp(opts)

  res.json(users)
})

module.exports = app; // exporting our express app so that it may be imported and tested in our test.js file