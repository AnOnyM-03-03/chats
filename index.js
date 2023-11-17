const express = require('express')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)


app.use(express.static(__dirname + '/public'))


const users = []


app.get('/',(req,res) =>{
  res.sendFile(__dirname + '/index.html')
})



io.on('connection', (socket) =>{
  socket.on('login', data =>{
    const found = users.find(nickname => nickname === data)
    if(!found){
      users.push(data)
      socket.nickname = data
      io.sockets.emit('login', {status: 'okay'})
      io.sockets.emit('users', {users})
    }else{
      io.sockets.emit('login', {status: 'failed'})
    }
  })
  socket.on('message', (data) =>{
    io.sockets.emit('new message', {
      message:data,
      time: new Date(),
      nickname: socket.nickname
    })
  })
  socket.on('disconnect', (data) =>{
    for(let i = 0; i<users.length; i++){
      if(users[i] === socket.nickname){
        users.splice(i,1)
      }
    }
    io.sockets.emit('users',{users})
  })
})

server.listen(5000, ()=> {
  console.log('started');
})