import { writable, derived } from 'svelte/store'
//import {fetch2} from '@/utils/fetch2.js'


const getLocalStorageItem = (key) => JSON.parse(localStorage.getItem(key))
const setLocalStorageItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const tmp_user_uuid = getLocalStorageItem('tmp_user_uuid') || uuidv4()
setLocalStorageItem('tmp_user_uuid', tmp_user_uuid)

let loginLocalStorage = getLocalStorageItem('login') || { isLogedIn:false, token:null }

// only for fakn server side render
if (navigator.userAgent.match('jsdom')){
  loginLocalStorage = {
    "isLogedIn":true
  , "token":null
  , "rola":'CLIENT'
  }
}

//selectedModule:null, 
export const session = writable(loginLocalStorage)

// save store to localstorage on change
session.subscribe( $session=>{
  //console.log('na subscribe',$session)
  if (!$session) return
  if ( $session.isLogedIn) setLocalStorageItem('login', $session)
  if (!$session.isLogedIn) setLocalStorageItem('login', { isLogedIn:false, token:null })
  //if ( $session.isLogedIn){
  //  var [resp,err] = await fetch2('api/v2/message_client_unread_count_get')   
  //  console.log('message_client_unread_count_get',  resp)
  //}
    //message_client_unread_count = storeTemplate('message_client_unread_count')

})


//export {session}