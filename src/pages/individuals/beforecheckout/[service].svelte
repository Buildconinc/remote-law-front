<script>
  import { service_groups as service_groups_store} from '@/store/getStore.js'
  import { tmp_user_uuid } from '@/store/loginStore.js'
  import FileUpload from '@/components/FileUpload.svelte';
  import { goto } from '@sveltech/routify'
  import { fetch2 } from '@/utils/fetch2.js'
  import { session } from '@/store/loginStore.js'
  import FileThumbs from '@/components/FileThumbs.svelte' 

  export let service 
  let progress = 0
  let preview
  let case_text
  let files = []
  function uploaded(o) {
    console.log('Upload finished in beforebblebleb', o.detail)
    preview = o.detail.url
    files = [...files, o.detail]
  }

  async function case_insert(){
    let [res, err] = await fetch2('api/v2/'+ ($session.isLogedIn?'':'public_') +'client_case_save', {service_uuid:service, case_text:case_text, tmp_user_uuid:tmp_user_uuid, files:files})
    if (res && res.results && res.results.case_uuid) {
      $goto(`/individuals/checkout/${res.results.case_uuid}`);
    }    
  }
</script>

<div class="container-fluid" style="flex:1; overflow:auto">
  <h2>Individuals/ Registration and checkout</h2>
  <p>izabrani servis: <b>{service}</b></p>
  <div class="row">

    <!--Grid column-->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="card-body" style="text-align: center;">
          <h5 class="card-title">Upload your doc</h5>
<!--          
            {#if preview}
              <img src="{preview}" alt="" class="img-fluid mx-auto d-block">
              <button type="button" class="btn btn-light" on:click={()=>preview=null}>Upload other image</button>
            {:else}
-->
              <FileUpload on:progress={(o)=>{progress=o.detail} } on:uploaded = {uploaded}>
                <div class="dropzone" style="background-image: linear-gradient(to right, #0e0 {progress}%, white {progress}%);">
                  Click or drag &amp; drop your doc here<br>
                  DROPZONE
                </div>
              </FileUpload>
<!--            {/if} -->

          <FileThumbs files={files}></FileThumbs>
        </div>      
      </div>
    </div>

    <!--Grid column-->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Your story here</h5>
          <textarea class="card-text form-control" placeholder="text here" rows="10" bind:value={case_text}></textarea>
          <button class="btn btn-primary" on:click={case_insert}>PROCEED TO CHECKOUT</button>
        </div>      
      </div>
    </div>


  </div>    
</div>

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