import { writable, derived } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { fetch2 } from '@/utils/fetch2.js'
import { session } from '@/store/loginStore.js'

  console.log('notificationUnreadStore() exec')
  const { subscribe, update, set } = writable({});
  
  // notification (get initial state on login)
  session.subscribe( async $session=>{
    if (!$session.isLogedIn || !$session.rola) return
    let [resp, err] = await fetch2(`api/v2/notification_unread_count_get`)
    if (err) return
    //console.log('notification_unread_count_get, ', resp)
    set(resp.results || {})
  })  

  /*
	return {
    subscribe,
    update,
  };
  */
//}


export const notificationUnreadStore = {
  subscribe,
  update,
};

export let notificationUnreadStoreTotalTweened = tweened(0, { duration: 300 });

export const notificationUnreadStoreTotal = derived(notificationUnreadStore, $a => {
  let count = 0
  Object.keys($a).forEach(function (item) {
    count = count + Number($a[item]);
  });
  console.log('notificationUnreadStoreTotalTweened.set = ', count)
  notificationUnreadStoreTotalTweened.set(count)
  return count
});