import { writable } from 'svelte/store';
import { fetch2 } from '@/utils/fetch2.js'
import { notificationUnreadStore } from '@/store/notificationUnreadStore.js'


/*
import { socketPromise } from '@/components/sock.js'
let socket 
*/
function createNotificationStore() {
  console.log('createNotificationStore() exec')
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

    markMessageAsRead: async function(predmet){
      let [resp, err] = await fetch2('api/v2/notification_mark_client_read', {case_uuid:predmet})
      if (err) return
      console.log('markMessageAsRead, ', resp)

      // TODO: napravi funkciju u notificationUnreadStore-u, nemoj direktno da ga mijenjas
      notificationUnreadStore.update(($notificationUnreadStore)=>{
        delete($notificationUnreadStore[predmet])
        return $notificationUnreadStore
      })

    },
    incoming_notification_from_sock: async function(msg){
      console.log('incoming_notification_from_sock event iz sock.js', msg)
      let predmet = msg.uuid1
      let current_case_uuid = document.location.pathname? document.location.pathname.split('/').pop():null

      // increment unread count if not looking at that case
      if (current_case_uuid != predmet) 
        notificationUnreadStore.update(($notificationUnreadStore)=>{
          if (!$notificationUnreadStore[predmet]) $notificationUnreadStore[predmet] = 1
          else $notificationUnreadStore[predmet] = Number($notificationUnreadStore[predmet]) + 1
          
          return $notificationUnreadStore
        })    
      else {
        let [resp, err] = await fetch2('api/v2/notification_mark_client_read', {case_uuid:predmet})
        if (err) return
        console.log('markNotificationAsRead, ', resp)  
      }

      update( store => {
        if (!store || !store[predmet]) store[predmet] = []
        let msgs = store[predmet]
        msgs = [...msgs, msg]
        store[predmet] = msgs
        return store
      })     

    }
	};
}

export const notificationStore = createNotificationStore();