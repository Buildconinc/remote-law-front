<script>
  import { fly } from 'svelte/transition';
  import { tick } from 'svelte';
  import { name, greeting } from './chatStore.js';
  import { afterUpdate } from 'svelte';

 // import { socket } from './sock.js';
  import { socketPromise } from './sock.js'
  let socket 
  socketPromise.then((s)=> socket = s )

  export let predmet
  import {chatStore} from '@/store/chatStore.js'
  chatStore.getPredmet(predmet)
/*
  import { route, getDirection } from '@sveltech/routify'
  $: lastRoute = $route.last
  $: direction = getDirection($route, lastRoute)
  $: console.log('direction', $route)
  */

	afterUpdate(() => {
    if (msg_history_el) msg_history_el.scrollTop = msg_history_el.scrollHeight
	});


	async function handleKeydown(event) {
    if (event.key=='Enter') {
      addMsg()
      await tick()
      text_to_send = null
    }
  }
  
  let msg_history_el
  let text_to_send = ''
  let text_to_send_el
  async function addMsg(){
    text_to_send_el.focus()
    if (!text_to_send || !text_to_send.trim()) return
    text_to_send = text_to_send.trim()
    //if (socket) socket.emit('chat_msg', {'text':text_to_send})
    chatStore.addNewMessage(predmet, text_to_send)
    //msgs = [...msgs, {id:msgs.length+1, ts: ' 11:01 AM    |    June 9', incoming:false, img:'https://ptetutorials.com/images/user-profile.png', text:text_to_send}]    
    await tick()
    text_to_send = ''
    msg_history_el.scrollTop = 9999999
    

  }
</script>

<!--
<h1>{$greeting}</h1>
<input bind:value={$name}>

<button on:click="{() => $name += '!'}">
	Add exclamation mark!
</button>
-->
<div class="mesgs">

  <div class="msg_history" bind:this={msg_history_el}>
    {#each $chatStore[predmet] || [] as msg (msg.m_id)}
      {#if msg.incoming}

        <div class="incoming_msg" in:fly="{{ x: 40, duration: 200 }}">
          <div class="incoming_msg_img"> <img src="{msg.img}" alt="sunil"> </div>
          <div class="received_msg">
            <div class="received_withd_msg">
              <p>{msg.text1}</p>
              <span class="time_date">{msg.ts}</span></div>
          </div>
        </div>
      
      {:else}

        <div class="outgoing_msg" in:fly="{{ x: 40, duration: 200 }}">
          <div class="sent_msg">
            <p>{msg.text1}</p>
            <span class="time_date">{new Date(msg.ts).toLocaleString()}</span> </div>
        </div>

      {/if}
    {/each}
  </div>

  <div class="type_msg">
    <div class="input_msg_write">
      <textarea on:keyup={handleKeydown} bind:this={text_to_send_el} class="write_msg" placeholder="Type a message" bind:value={text_to_send} />
      <button class="msg_send_btn" type="button" on:click = { addMsg }>
        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
      </button>
    </div>
  </div>

</div>


<style>
img{ max-width:100%;}
.msg_history{
  flex:1;
  overflow:auto;
}
.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
  white-space: pre-wrap;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { max-width: 66%;}
.mesgs {
  display: flex;
  flex-flow: column;
  padding: 30px 15px 0 25px;
  width: 100%;
  height: 100%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
  white-space: pre-wrap;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  max-width: 66%;
}
.input_msg_write textarea {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
</style>