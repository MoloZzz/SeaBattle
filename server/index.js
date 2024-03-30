require('dotenv').config();
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const sequelize = require('./DataBase/initSequelize');
const router = require('./routers/PlayerRouter')
const cors = require('cors');
const port = process.env.PORT || 8888; 

app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());
app.use(express.json());
app.use('/api', router);


app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../client/firstJoin.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

const start = async () =>{
  try{
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(port, () => {
          console.log(`Server started on port ${port}`);
          console.log(`Server is running at http://localhost:${port}/`);
      })
  
  }catch(e){
      console.log(e);
  }
}

start();



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
