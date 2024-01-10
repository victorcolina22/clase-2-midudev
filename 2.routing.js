const http = require('node:http')
// const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      switch (url) {
        case '/':
          return res.end('<h1>Hola Mundo</h1>')
        case '/pokemon/ditto': {
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        }
        default: {
          res.statusCode = 404
          res.end('<h1>404 not found</h1>')
        }
      }
      break
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end('<h1>404</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port ${desiredPort}`)
})
