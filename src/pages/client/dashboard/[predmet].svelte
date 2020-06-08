<script>
  import { session } from '@/store/loginStore.js'
  import FileUpload from '@/components/FileUpload.svelte';
  import Chat from '@/components/Chat.svelte'
  import {storeTemplate} from '@/store/storeTemplate.js'
  let case_store
  let case_store_ready

  function gotFiles(files) {
    //do something with files
    console.log('files', files)
  }
  export let predmet 

$: if (predmet) case_store = storeTemplate('client_case_history', {case_uuid:predmet})

$: if ($case_store && $case_store.data && $case_store.data.case_info) case_store_ready = true
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


<div class="container-fluid" style="flex:1; overflow:auto; height:100%">
  <div class="row" style="height:100%">
    <div class="col-12 col-sm-6 col-lg-8" >
      <h2>Izabrani predmet = {predmet}</h2>
      <p>loged_in <input type="checkbox" bind:checked={$session.isLogedIn}></p>
      {#if case_store_ready}
      case_status = {$case_store.data.case_info.case_status}
      <br>
      case_text = {$case_store.data.case_info.case_text}
      <br>
      current_step = {$case_store.data.case_info.current_step}
      <br>
      <hr>
      {#each $case_store.data.case_history as item}
        action_type = {item.action_type}<br>
        case_history_id = {item.case_history_id}<br>
        text1 = {item.tekst}<br>
      {/each}
      {/if}
      <FileUpload on:input={gotFiles}>
      <div class="dropzone">
        Upload doc here.<br>
        DROPZONE
      </div>
      </FileUpload>
      <p>
        Lista predmeta 
        <a href="/client/dashboard">/client/dashboard</a>
      </p>
    </div>
    <div class="col-12 col-sm-6 col-lg-4" style="height:100%">
      <Chat {predmet}></Chat>
    </div>

  </div>
</div>
