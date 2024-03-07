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


io.sockets.on('connection', function(socket){
  console.log('Connected');
  connections.push(socket);

  socket.on('add user', function (username) {
    let existingUser = null;

    users.forEach(user => {
      if (user.id === socket.id) {
        existingUser = user;
      }
    });

    if (existingUser) {
      console.log('Користувачу ', existingUser.username, ' оновлено нік:', username);
      existingUser.username = username;
    } else {
      const newUser = {
        id: socket.id,
        username: username,
      };

      users.push(newUser);

      console.log('Доданий новий користувач:', newUser.username);
    }
  });

  socket.on('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1);

    const disconnectedUser = users.find(user => user.id === socket.id);
    if (disconnectedUser) {
      users.splice(users.indexOf(disconnectedUser), 1);
    } 
    console.log('Disconnected'); 
  });
});
