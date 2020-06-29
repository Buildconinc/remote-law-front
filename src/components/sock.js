import io from 'socket.io-client';
import { chatStore } from '@/store/chatStore.js';
import { session } from '@/store/loginStore.js'
let resolved
let sess 
let socket

session.subscribe(s => {
  console.log('session.subscribe socks', s)
  sess = s
  if (resolved && sess.token && sess.isLogedIn){
    console.log('client_token emit', sess.token)
    socket.emit('client_token', sess.token)
  }  
})
/*
$: if (resolved && $session.token && $session.isLogedIn){
  console.log('sock io', io)
  socket.emit('client_token', $session.token)
}
*/
//console.log('sock io', io)

//export const socket = io('https://remotelaw.ga');
export const socketPromise = new Promise(function(resolve, reject) {
  socket = io('https://remotelaw.ga', { transports: ["websocket", "polling"] });

  socket.on('connect', function(){
    console.log('sock connect')
    if (sess.token && sess.isLogedIn){
      console.log('client_token emit', sess.token)
      socket.emit('client_token', sess.token)
    }  

    if (!resolved) resolve(socket)     
    resolved = true
  });
  socket.on('event', function(data){
    console.log('sock event', data)
  });
  socket.on('disconnect', function(){
    console.log('sock disconnect')
  });
  socket.on('server_message', function(m){
    console.log('sock server_message',m)
  });  
  socket.on('tb_message', function(data){
    console.log('tb_message event iz sock.js', data)
    chatStore.incoming_message_from_sock(data)
  });  
});

