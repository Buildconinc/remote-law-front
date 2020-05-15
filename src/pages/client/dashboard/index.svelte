<script>
  import { session } from '../../../store/loginStore.js'
  $: console.log('sess dashb', $session)
  import { service_groups as service_groups_store} from '../../../store/getStore.js'
  import  Modal  from '../../../components/Modal.svelte'
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
    Lista Vasih predmeta
    <a href="/client/dashboard/uuid1">/client/dashboard/uuid1</a><br>
    <a href="/client/dashboard/uuid2">/client/dashboard/uuid2</a><br>
    <a href="/client/">/client/</a><br>
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