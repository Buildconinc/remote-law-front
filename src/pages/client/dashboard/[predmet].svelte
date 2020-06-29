<script>
  import { slide } from 'svelte/transition';
  import { session } from '@/store/loginStore.js'
  import FileUpload from '@/components/FileUpload.svelte';
  import Chat from '@/components/Chat.svelte'
  import {storeTemplate} from '@/store/storeTemplate.js'
  import FileThumbs from '@/components/FileThumbs.svelte' 
  let case_store
  let case_store_ready
  let currentStep

  function gotFiles(files) {
    //do something with files
    console.log('files', files)
  }
  export let predmet 
  console.log('dashboard/predmet $session', $session)

$: if (predmet) case_store = storeTemplate('client_case_history', {case_uuid:predmet})

$: if ($case_store && $case_store.data && $case_store.data.case_info) {
  case_store_ready = true
  currentStep = $case_store.data.case_info.current_step
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


<div class="container-fluid" style="flex:1; overflow:auto; height:100%">
  <div class="row" style="overflow:auto; height:100%">
    <div class="col-12 col-sm-6 col-lg-8" style="overflow:auto; height:100%">
      <h2>Izabrani predmet = {predmet}</h2>
      session =<pre>{JSON.stringify($session)}</pre>
      {#if case_store_ready}
        case_status = {$case_store.data.case_info.case_status}
        <br>
        case_text = {$case_store.data.case_info.case_text}
        <br>
        current_step = {$case_store.data.case_info.current_step}
        <br>
        <hr>
        currentStep {currentStep}
        {#each $case_store.data.case_history as step}
        <h3 on:click={()=>{ currentStep = step.step_id}} style="cursor:pointer">
          <span style="background-color:yellow; padding: 0.1rem;">{step.step_id}</span>
          {step.step_label}
          <div style="transform: rotateZ({currentStep == step.step_id?'180':'0'}deg);
    transform-origin: center center;
    transition: 0.1s all;
    display: inline-block;">&#9650;
          </div>
          <img src="{step.image}" style="float:right; height:1em" alt="">
        </h3>
          {#if currentStep == step.step_id}
            {#each step.steps as item}
<!--              <div class="row" in:slide={{duration:300}}> -->
              <div class="row" >
                <div class="col-4">
                  <h5>{item.action_type}</h5>
                </div>
                <div class="col-8">
                  <h5>
                    {#if item.action_type == 'CLIENTDOCUMENT'}
                      <FileThumbs files={ [{url:item.tekst, name:item.file_name}] }></FileThumbs>
                    {:else}
                      {item.tekst}
                    {/if} 
                    <small>{new Date(item.created_date).toLocaleDateString()}  {new Date(item.created_date).toLocaleTimeString()}</small>
                  </h5>
                </div>
              </div>
<!--
              <div transition:slide={{duration:300}}>
                action_type = {item.action_type}<br>
                case_history_id = {item.case_history_id}<br>
                text1 = {item.tekst}<br>
                created_date = {new Date(item.created_date).toLocaleDateString()}  {new Date(item.created_date).toLocaleTimeString()}<br>
              </div>
              -->
            {/each}        
          {/if}
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
