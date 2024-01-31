const http = require('node:http')
const processId = process.pid

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('X-Custom-Header', 'Custom Value');

  for(let index = 0; index < 1e7; index++);
  response.end(`handled by pid: ${processId}`)
})

server.listen(3000)
  .once('listening', () => console.log('started in process', processId))

//aguardaras conexões serem encerradas para só então encerrar o programa
process.on('SIGTERM', () => {
  console.log('server ending', new Date().toISOString())
  server.close(() => process.exit());
})

process.on('SIGINT', () => {
  console.log('server ending', new Date().toISOString())
  server.close(() => process.exit());
})

//simular um erro aleatorio
setTimeout(() => {
  server.close(() => process.exit(1));
}, Math.random() * 1e4);
