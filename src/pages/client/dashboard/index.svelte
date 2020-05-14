<script>
  import { session } from '../../../store/loginStore.js'
  $: console.log('sess dashb', $session)
  import { service_groups as service_groups_store} from '../../../store/getStore.js'

  import FileUpload from '../../../components/FileUpload.svelte';
  
  function gotFiles(files) {
    //do something with files
    console.log('files', files)
  }
  

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
  <FileUpload on:input={gotFiles}>
  <div class="dropzone">
    Whatever you want here.<br>
    DROPZONE
  </div>
  </FileUpload>

  loged_in <input type="checkbox" bind:checked={$session.isLogedIn}>
  <br>
 LISTA PREDMETA:<br>
      {#each $service_groups_store.data as {label}}
        {label}<br>
      {/each}
  <br>
  To see an drugi, go to 
  <a href="/client/">/client/</a><br>
  <a href="/client/drugi">/client/drugi</a><br>
  <a href="/client/dashboard/uuid1">/client/dashboard/uuid1</a><br>
  <a href="/client/dashboard/uuid2">/client/dashboard/uuid2</a><br>
  {:else}
  <div style="text-align:center">
    <h2>Danger danger, high woltage</h2>
    <img src="https://d1f7geppf3ca7.cloudfront.net/origin/559239/1533595947896_8690web.jpg" alt="restricted area">
  </div>
{/if}
</div>