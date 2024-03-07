const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 7777; 

server.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
  console.log(`Server is running at http://localhost:${port}/`);
});


app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../client/pages/firstJoin.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});


const users = [];
const connections = [];


io.sockets.on('connection',function(socket){
  console.log('Connected');
  connections.push(socket);

  socket.on('disconnect', function(){
    connections.slice(connections.indexOf(socket), 1);
    console.log('disconnected');
  });
});

