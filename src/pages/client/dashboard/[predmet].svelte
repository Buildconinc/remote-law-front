<script>
  import { session } from '../../../store/loginStore.js'
  import FileUpload from '../../../components/FileUpload.svelte';
  
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
<div class="container" style="flex:1; overflow:auto">
  <FileUpload on:input={gotFiles}>
  <div class="dropzone">
    Whatever you want here.<br>
    DROPZONE
  </div>
  </FileUpload>

  loged_in <input type="checkbox" bind:checked={$session.isLogedIn}>
  <br>
  predmet = {predmet}
  <br>
  To see an drugi, go to 
  <a href="/client/drugi">/client/drugi</a>
</div>