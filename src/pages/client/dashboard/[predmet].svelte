<script>
  import { session } from '../../../store/loginStore.js'
  import FileUpload from '../../../components/FileUpload.svelte';
  import Chat from '../../../components/Chat.svelte'
  function gotFiles(files) {
    //do something with files
    console.log('files', files)
  }
  export let predmet 

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
      <h1>Izabrani predmet = {predmet}</h1>
      <p>loged_in <input type="checkbox" bind:checked={$session.isLogedIn}></p>
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
