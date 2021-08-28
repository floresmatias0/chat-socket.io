const express = require('express');
const cors = require('cors')
const routes = require('./routes/index.js');
const app = express();

app.name = 'Chat-websockets';

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Credentials', 'false');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(cors())
app.use('/', routes);

app.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")

const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
  },
}); 

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('chat:message', (msg) => {
    io.emit('chat:message', msg);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

module.exports = server;