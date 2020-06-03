import { writable, derived } from 'svelte/store'

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

const loginLocalStorage = getLocalStorageItem('login') || { isLogedIn:false, token:null }
//selectedModule:null, 
export const session = writable(loginLocalStorage)

// save store to localstorage on change
session.subscribe( $session=>{
  //console.log('na subscribe',$session)
  if (!$session) return
  if ( $session.isLogedIn) setLocalStorageItem('login', $session)
  if (!$session.isLogedIn) setLocalStorageItem('login', { isLogedIn:false, token:null })
})


//export {session}