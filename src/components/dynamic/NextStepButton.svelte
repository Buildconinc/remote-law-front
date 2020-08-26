<script>
  import { session } from '@/store/loginStore.js'
  import { fetch2 } from '@/utils/fetch2.js'
  import Toast from 'svelte-toast'
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const izitoast = new Toast()
  let inProgress = false

  async function nextStep(){
    inProgress = true
    let [res, err] = await fetch2('api/v2/lawyer_case_step_save', { case_uuid:case_store.case_info.case_uuid, step:step+1 })
    if (res && res.results) {
      izitoast.success('Saved')
      dispatch("refresh", true); // parent event
    }
    else 
      izitoast.error( (err && err.message)?err.message:'Greska')
          
    inProgress = false
  }

  export let step = 1
  export let case_store = {}
  //$: alreadyRequested = case_store.payment[step-1].paymentrequest
</script>

<div class="col-4">
  <h5></h5>
</div>
<div class="col-8">
  <h5>
    {#if step<4}
      <button on:click={nextStep} disabled = {inProgress} class="btn btn-primary">Next step</button>
    {/if}
  </h5>
</div>

