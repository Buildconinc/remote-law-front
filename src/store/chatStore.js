import { writable } from 'svelte/store';
import { fetch2 } from '@/utils/fetch2.js'
import { session } from '@/store/loginstore.js'
import { chatUnreadStore } from '@/store/chatUnreadStore.js'
import { get } from 'svelte/store';

/*
import { socketPromise } from '@/components/sock.js'
let socket 
*/
function createChatStore() {
  console.log('createChatStore() exec')
  const { subscribe, update } = writable({});
  
/*
  socketPromise.then((s)=> {
    console.log('socketPromise resolved')
    socket = s
    socket.on('tb_message', function(data){
      console.log('tb_message event iz chatstore-a', data)
    });
  })
  */
	return {
    subscribe,
    getPredmet: async function(predmet){
      let [resp, err] = await fetch2('api/v2/message_get_client', {case_uuid:predmet})
      if (err) return
      console.log('chatstore, ', predmet)
      update( store => {
        /*
        let msgs = [
          {m_id:1, ts: '11:02 | friday', incoming:true, img:'https://ptetutorials.com/images/user-profile.png', text1:'1 Test which is a new approach to have all solutions'},
          {m_id:2, ts: ' 11:01 AM    |    June 9', incoming:false, img:'https://ptetutorials.com/images/user-profile.png', text1:'2 Test which is a new approach to have all solutions'},
        ] 
        */   
        //if (!store[predmet])    
        store[predmet]=resp.results
        return store
      })
      //await fetch2('')
    },
    markMessageAsRead: async function(predmet){
      let [resp, err] = await fetch2('api/v2/message_mark_client_read', {case_uuid:predmet})
      if (err) return
      console.log('markMessageAsRead, ', resp)

      // TODO: napravi funkciju u chatUnreadStore-u, nemoj direktno da ga mijenjas
      chatUnreadStore.update(($chatUnreadStore)=>{
        delete($chatUnreadStore[predmet])
        return $chatUnreadStore
      })

    },
    incoming_message_from_sock: async function(msg){
      console.log('incoming_message_from_sock event iz sock.js', msg)
      let predmet = msg.case_uuid

      // TODO: napravi funkciju u chatUnreadStore-u, nemoj direktno da ga mijenjas
      // increment unred counter
      // TODO if current url<>case_uuid

      //get current path
//      console.log($url()) //'recipes/cakes/cupcakes'      
//get current path
      let current_case_uuid = document.location.pathname? document.location.pathname.split('/').pop():null
      //console.log('UNWRAPED URL',current_case_uuid)
      // increment unread count if not looking at chat
      if (current_case_uuid != predmet) 
        chatUnreadStore.update(($chatUnreadStore)=>{
          if (!$chatUnreadStore[predmet]) $chatUnreadStore[predmet] = 1
          else $chatUnreadStore[predmet] = Number($chatUnreadStore[predmet]) + 1
          
          return $chatUnreadStore
        })    
      else {
        let [resp, err] = await fetch2('api/v2/message_mark_client_read', {case_uuid:predmet})
        if (err) return
        console.log('markMessageAsRead, ', resp)  
      }
      /*
      case_uuid: "d0921fc8-a8cf-11ea-867e-7a486d8cb178"
      client_uuid: "7e48d106-9521-11ea-867e-7a486d8cb178"
      company_uuid: "3ac88b36-9555-11ea-867e-7a486d8cb178"
      created_by: "7e48d106-9521-11ea-867e-7a486d8cb178"
      created_by_me: true
      created_by_name: "Igor Vujovic"
      created_date: "2020-06-10T10:27:24.475511+00:00"
      file_uuid: null
      json1: {file_url: null, file_name: null, file_type: null}
      m_id: 52
      profile_photo: "https://api.adorable.io/avatars/40/crni@adorable.png"
      text1: "mmmm"      
      */
      update( store => {
        if (!store || !store[predmet]) store[predmet] = []
        let msgs = store[predmet]
        msgs = [...msgs, {m_id:msg.m_id, ts: msg.created_date , incoming:!msg.created_by_me, img:msg.profile_photo, text1:msg.text1}]
        store[predmet] = msgs
        return store
      })     

    },
    addNewMessage: async function(predmet, msg){
      let $session = get(session)
      let [resp, err] = await fetch2(`api/v2/message_insert_${$session.rola.toLowerCase()}`, {case_uuid:predmet, text1:msg})
      console.log(resp, err)
/*
      update( store => {
        if (!store || !store[predmet]) store[predmet] = []
        let msgs = store[predmet]
        msgs = [...msgs, {m_id:resp.results.m_id, ts: resp.results.created_date , incoming:false, img:'https://ptetutorials.com/images/user-profile.png', text1:resp.results.text1}]
        store[predmet] = msgs
        return store
      })
      */
    }
	};
}

export const chatStore = createChatStore();