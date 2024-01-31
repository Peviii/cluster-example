const http = require('node:http')
const processId = process.pid

const server = http.createServer((request, response) => {
    for(let index = 0; index < 1e7; index++);
    response.end(`handled by pid: ${processId}`)
})

server.listen(3000)
  .once('listening', () => console.log('started in process', processId))

//aguardaras conexões serem encerradas para só então encerrar o programa
process.on('SIGTERM', () => {
  console.log('server ending', new Date().toISOString())
  server.close(() => process.exit())
})
