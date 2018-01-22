const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.error(`worker ${worker.process.pid} died, code=${code}, signal=${signal}`);
    cluster.fork();
  });
} else {
  require('./index');
}
