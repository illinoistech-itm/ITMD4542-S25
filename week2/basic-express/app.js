const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  console.log(req);
  res.send('Hello World About!!!')
})

app.get('/about/abc', (req, res) => {
  res.send('Hello World About abc!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})