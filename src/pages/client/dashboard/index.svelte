<script>
  import { session } from '@/store/loginStore.js'
  //$: console.log('sess dashb', $session)
  import { service_groups as service_groups_store} from '@/store/getStore.js'

//  import {storeTemplate} from '@/store/storeTemplate.js'
//  let client_cases = storeTemplate('client_case')
//  $: console.log('client_cases:', $client_cases.data)
  import { client_cases } from '@/store/getStore.js'
  import { chatUnreadStore } from '@/store/chatUnreadStore.js'
  import { notificationUnreadStore} from '@/store/notificationUnreadStore.js'

  import Loading from '@/components/Loading.svelte'

  import Modal from '@/components/Modal.svelte'
  let showModal = false
 
</script>
<style>
  .dropzone {
    border: dashed 1px rgb(1, 15, 1);
    border-radius: 5%;
    padding: 4rem;
    text-align: center;
  }
  :global(.dragging .dropzone) {
    border: dashed 1px green;
  }
</style>
<div class="container" style="flex:1; overflow:auto">
  {#if $session.isLogedIn }
  <!--
    loged_in <input type="checkbox" bind:checked={$session.isLogedIn}>
    <br>
    Grupe predmeta:
    {#each $service_groups_store.data as {label}}
      <span class="badge badge-light">{label} </span> 
    {/each}
    <br>
  -->
    <strong>Lista Vasih predmeta: </strong>
    <br>

    {#each $client_cases.data as caze}
      <a href="/client/dashboard/{caze.case_uuid}">{caze.group_label}/{caze.service_label}-{caze.case_text}</a>
      <small>{caze.created_date}</small> 

      {#if $chatUnreadStore[caze.case_uuid]}
       <span class="badge badge-danger">{$chatUnreadStore[caze.case_uuid]} new message{$chatUnreadStore[caze.case_uuid]>1?'s':''}</span>
      {/if}

      {#if $notificationUnreadStore[caze.case_uuid]}
       <span class="badge badge-warning">{$notificationUnreadStore[caze.case_uuid]} new notification{$notificationUnreadStore[caze.case_uuid]>1?'s':''}</span>
      {/if}
      
      <br>
      {:else}
      <Loading></Loading>
    {/each}
    <!--
    {:else}
    <div style="text-align:center">
      <h2>Danger danger, high woltage</h2>
      <img src="https://d1f7geppf3ca7.cloudfront.net/origin/559239/1533595947896_8690web.jpg" alt="restricted area">
    </div>
    -->
  {/if}

</div>