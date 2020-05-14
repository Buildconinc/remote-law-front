<script>
  import { service_groups as service_groups_store} from '../../../store/getStore.js'
  import FileUpload from '../../../components/FileUpload.svelte';
  let progress = 0
  let preview
  function uploaded(o) {
    //do something with files
    preview = o.detail.url
  }
  import { goto } from '@sveltech/routify'
  export let service 
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

<div class="container-fluid" style="flex:1; overflow:auto">
  <h2>Individuals/ Registration and checkout</h2>
  <p>izabrani servis: <b>{service}</b></p>
  <div class="row">

    <!--Grid column-->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="card-body" style="text-align: center;">
          <h5 class="card-title">click below to upload or dragndrp your doc here</h5>
          
            {#if preview}
              <img src="{preview}" alt="" class="img-fluid mx-auto d-block">
              <button type="button" class="btn btn-light" on:click={()=>preview=null}>Upload other image</button>
            {:else}
              <FileUpload on:progress={(o)=>{progress=o.detail} } on:uploaded = {uploaded}>
                <div class="dropzone" style="background-image: linear-gradient(to right, #0e0 {progress}%, white {progress}%);">
                  upload or dragndrp your doc here<br>
                  DROPZONE
                </div>
              </FileUpload>
            {/if}

          
        </div>      
      </div>
    </div>

    <!--Grid column-->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">YOUR story here</h5>
          <textarea class="card-text form-control" placeholder="text here" rows="10"></textarea>
          <a href="/individuals/checkout/{service}" class="btn btn-primary">PROCEED TO CHECKOUT</a>
        </div>      
      </div>
    </div>


  </div>    
</div>