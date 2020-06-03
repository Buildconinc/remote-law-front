import { writable } from 'svelte/store';
import { fetch2 } from '@/utils/fetch2.js'

function createChatStore() {
	const { subscribe, update } = writable({});

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
    addNewMessage: async function(predmet, msg){
      let [resp, err] = await fetch2('api/v2/message_insert_client', {case_uuid:predmet, text1:msg})
      console.log(resp, err)

      update( store => {
        if (!store || !store[predmet]) store[predmet] = []
        let msgs = store[predmet]
        msgs = [...msgs, {m_id:resp.results.m_id, ts: resp.results.created_date , incoming:false, img:'https://ptetutorials.com/images/user-profile.png', text1:resp.results.text1}]
        console.log('addNewMessage', msgs)
        store[predmet] = msgs
        console.log('store:', store)
        return store
      })
    }
	};
}

export const chatStore = createChatStore();