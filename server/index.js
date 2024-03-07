const express = require('express');
const path = require('path');  
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 7777;

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/firstJoin.html'));
});
  
app.listen(port, () => {
    console.log(`Сервер прослуховує порт ${port}`);
    console.log(`Server is running at http://localhost:${port}/`);
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
