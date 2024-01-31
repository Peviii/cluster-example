const os = require('node:os')
const cluster = require('node:cluster')

const runPrimaryProcess = () => {
  const processCount = os.cpus().length * 2
  console.log(`primary ${process.pid} is running`);
  console.log(`forking server with ${processCount} processes \n`);
  
  for(let index = 0; index < processCount; index++) cluster.fork()

  cluster.on('exit', (worker, code) => {
    if (code !== 0 & !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died... scheduling another one!`)
      cluster.fork()  
    }
  })
}
const runWorkerProcess = async () => {
  require('./server.js')
}
cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()
