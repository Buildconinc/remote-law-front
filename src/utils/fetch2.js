import { session } from '../store/loginStore.js'
let authorization = null;
session.subscribe($session=>{
  authorization = $session?$session.token:null
})
const HOSTNAME = "https://remotelaw.ga/";
//const HOSTNAME = "http://localhost:8080/"
//const HOSTNAME = window.HOSTNAME;

export const fetch2 = window.fetch2 = function(url, obj){
//  var authorization=localStorage.getItem('token')    
  var body = JSON.stringify(obj)
    return new Promise(function(resolve, reject) {
      var response = fetch(HOSTNAME+url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(authorization? {"authorization":'Bearer '+ authorization}:{})
          //"authorization":'Bearer '+ authorization
        },
        body: body
      }).then(function(response){ return response.json()})
      .then(function(j){ 
        console.log('j',j); 
        resolve([j,null]) 
      })
      .catch(function(err){
        console.log('nework error!', err);
        //izitoast.error({ message: 'Network error!!!'});
        resolve([null,err])
      })
    })
}