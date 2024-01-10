const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.end('<h1>Hola Mundo</h1>')
  } else if (req.url === '/landscape.webp') {
    fs.readFile('./landscape.webp', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
        return
      }

      res.setHeader('Content-Type', 'image/webp')
      res.end(data)
    })
  } else if (req.url === '/contact') {
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port ${desiredPort}`)
})
