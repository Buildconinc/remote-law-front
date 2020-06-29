<script>
  import { session } from '@/store/loginStore.js'
  //$: console.log('sess dashb', $session)
  import { service_groups as service_groups_store} from '@/store/getStore.js'

//  import {storeTemplate} from '@/store/storeTemplate.js'
//  let client_cases = storeTemplate('client_case')
//  $: console.log('client_cases:', $client_cases.data)
  import { client_cases } from '@/store/getStore.js'
  import { chatUnreadStore } from '@/store/chatUnreadStore.js'

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
    loged_in <input type="checkbox" bind:checked={$session.isLogedIn}>
    <br>
  Grupe predmeta:
        {#each $service_groups_store.data as {label}}
          <span class="badge badge-light">{label} </span> 
        {/each}
    <br>
    Lista Vasih predmeta: <br>

    {#if !$client_cases.data || $client_cases.data.length===0}
    {#each [1,2,3,4,5] as caze}
      <a style="background-color: #ddd;" href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
      <small style="background-color: #ddd;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</small> 
      <br>
    {/each}
    {/if}

    {#each $client_cases.data as caze}
      <a href="/client/dashboard/{caze.case_uuid}">{caze.service_label}-{caze.case_text}</a>
      <small>{caze.created_date}</small> 
      {#if $chatUnreadStore[caze.case_uuid]}
       <span class="badge badge-danger">{$chatUnreadStore[caze.case_uuid]} new message{$chatUnreadStore[caze.case_uuid]>1?'s':''}</span>
      {/if}
      <br>
    {/each}
    {:else}
    <div style="text-align:center">
      <h2>Danger danger, high woltage</h2>
      <img src="https://d1f7geppf3ca7.cloudfront.net/origin/559239/1533595947896_8690web.jpg" alt="restricted area">
    </div>
  {/if}

  <button on:click={()=>showModal=true} class="btn btn-secondary" disabled={showModal}>
    Show modal
  </button>
  {#if showModal}
    <Modal on:close={()=>showModal=false}>
      <h2 slot='header'>
        modal
        <small><em>adjective</em>  mod·al \ˈmō-dəl\</small>
      </h2>

      <ol class="definition-list">
        <li>of or relating to modality in logic</li>
        <li>containing provisions as to the mode of procedure or the manner of taking effect —used of a contract or legacy</li>
        <li>of or relating to a musical mode</li>
        <li>of or relating to structure as opposed to substance</li>
        <li>of, relating to, or constituting a grammatical form or category characteristically indicating predication</li>
        <li>of or relating to a statistical mode</li>
      </ol>

      <a href='https://www.merriam-webster.com/dictionary/modal'>merriam-webster.com</a>
    </Modal>
  {/if}
</div>