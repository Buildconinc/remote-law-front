import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { fetch2 } from '@/utils/fetch2.js'
import { session } from '@/store/loginStore.js'
import { derived } from 'svelte/store';

//function createUnreadChatStore() {
  console.log('createUnreadChatStore() exec')
  const { subscribe, update, set } = writable({});
  
  // unread messages (get initial state on login)
  session.subscribe( async $session=>{
    if (!$session.isLogedIn || !$session.rola) return
    let [resp, err] = await fetch2(`api/v2/message_${$session.rola.toLowerCase()}_unread_count_get`)
    if (err) return
    console.log('message_client_unread_count_get, ', resp)
    set(resp.results || {})
  })  

  /*
	return {
    subscribe,
    update,
  };
  */
//}


export const chatUnreadStore = {
  subscribe,
  update,
};

export let chatUnreadStoreTotalTweened = tweened(0, { duration: 300 });

export const chatUnreadStoreTotal = derived(chatUnreadStore, $a => {
  let count = 0
  Object.keys($a).forEach(function (item) {
    count = count + Number($a[item]);
  });
  console.log('chatUnreadStoreTotalTweened.set = ', count)
  chatUnreadStoreTotalTweened.set(count)
  return count
});