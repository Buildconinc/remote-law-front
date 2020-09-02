<script>
  import { slide } from 'svelte/transition';
  import { session } from '@/store/loginStore.js'
  import FileUpload from '@/components/FileUpload.svelte';
  import Chat from '@/components/Chat.svelte'
  import {storeTemplate} from '@/store/storeTemplate.js'
  import { fetch2 } from '@/utils/fetch2.js'

    //dynamic components
  import CLIENTDOCUMENT from '@/components/dynamic/CLIENTDOCUMENT.svelte' 
  import LAWYERDOCUMENT from '@/components/dynamic/LAWYERDOCUMENT.svelte' 
  import PAYMENTREQUEST from '@/components/dynamic/PAYMENTREQUEST.svelte' 
  import PAYMENTCONFIRMED from '@/components/dynamic/PAYMENTCONFIRMED.svelte' 
  import OTHER from '@/components/dynamic/OTHER.svelte' 
  import RequestPaymentButton from '@/components/dynamic/RequestPaymentButton.svelte'
  import NextStepButton from '@/components/dynamic/NextStepButton.svelte'
  const components = { 'CLIENTDOCUMENT':CLIENTDOCUMENT, 'LAWYERDOCUMENT':LAWYERDOCUMENT, 'PAYMENTREQUEST':PAYMENTREQUEST, 'PAYMENTCONFIRMED':PAYMENTCONFIRMED }

  let case_store
  let case_store_ready
  let currentStep

  function gotFiles(files) {
    //do something with files
    console.log('files', files)
  }

  async function uploaded(event) {
    let { name, url } = event.detail
    console.log('uploaded', url, name)
    let [res, err] = await fetch2('api/v2/lawyer_assign_file_to_case_save', { name, url, case_uuid:predmet, step:$case_store.data.case_info.current_step })
    //console.log(res,err)
    if (res && res.results) {
      case_store.refresh()
      //izitoast.success('Napravio')
      //dispatch("close", true);      
    }
    else {
      //izitoast.error( (err && err.message)?err.message:'Greska')
    }      

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
              <div class="row" transition:slide={{duration:100}}>
                <svelte:component on:refresh={()=>{case_store.refresh()}}
                this={components[item.action_type] || OTHER} {item} case_store={$case_store.data} />
              </div>
            {/each}      

            <RequestPaymentButton on:refresh={()=>{case_store.refresh()}} step={currentStep} case_store={$case_store.data} />  
            <NextStepButton on:refresh={()=>{case_store.refresh()}} step={currentStep} case_store={$case_store.data} />
            <FileUpload on:input={gotFiles} on:uploaded={uploaded} fileCategory='DOCUMENT'>
              <div class="dropzone">
                Upload file here.<br>
                DROPZONE
              </div>
            </FileUpload>            
          {/if}
        {/each}
      {/if}

    </div>
    <div class="col-12 col-sm-6 col-lg-4" style="height:100%">
      <Chat {predmet}></Chat>
    </div>

  </div>
</div>
