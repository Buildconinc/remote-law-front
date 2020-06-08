import io  from 'socket.io-client';
console.log('sock io', io)

//export const socket = io('https://remotelaw.ga');
export const socketPromise = new Promise(function(resolve, reject) {
  const socket = io('https://remotelaw.ga');

  socket.on('connect', function(){
    console.log('sock connect')
    resolve(socket)
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
});

