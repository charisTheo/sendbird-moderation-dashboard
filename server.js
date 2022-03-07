require('dotenv').config();

const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express()
const port = process.env.PORT || 8080
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join(__dirname, "./web/build");
  app.use(express.static(publicPath))
  app.get('/profanity', (req, res) => res.sendFile(path.join(publicPath, '/index.html')))
  app.get('/login', (req, res) => res.sendFile(path.join(publicPath, '/index.html')))
  app.get('/', (req, res) => res.sendFile(path.join(publicPath, '/index.html')))
}

routes(app)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))