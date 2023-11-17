window.addEventListener('DOMContentLoaded',()=>{
  const socket = io.connect()
  const nickname = document.querySelector('#nickname')
  const loginForm = document.querySelector('.login-form')

  const messageList = document.querySelector('.message-list')
  const userList = document.querySelector('.users-list')
  const messageform = document.querySelector('.message-form')
  const listGroup = document.querySelector('.list-group')
  const messageInput = document.querySelector('.form-control')
  const newMessage = document.querySelector('.list-group_message')
 
  loginForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    socket.emit('login', nickname.value)
  })
  messageform.addEventListener('submit', (e) =>{
    e.preventDefault()
    socket.emit('message', messageInput.value)
  })



  socket.on('login', (data) =>{
    if(data.status === 'okay'){
      messageList.classList.remove('d-none')
      userList.classList.remove('d-none')
      messageform.classList.remove('d-none')
      loginForm.classList.add('d-none')
    }
  })


  socket.on('new message', (data)=>{
    const message = 
    `
            <a href="" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${data.nickname}</h5>
                <small class="text-muted">${data.time}</small>
              </div>
              <p class="mb-1">${data.message}</p>
            </a>`
    newMessage.innerHTML += message
    messageInput.value = ''
    
  });

  socket.on('users', (data) =>{
    listGroup.innerHTML = ''
    for(let i = 0; i<data.users.length; i++){
      listGroup.innerHTML += `<li class="list-group-item list-group-item_user">${data.users[i]}</li>`
    }
  })
}) 