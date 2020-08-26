<script>
  import { session } from '@/store/loginStore.js'
  import { fetch2 } from '@/utils/fetch2.js'
  import Toast from 'svelte-toast'
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const izitoast = new Toast()
  let inProgress = false

  async function requestPayment(){
    let amount = prompt('Please enter amount in USD')
    if (!amount) return
    // todo check is number
    inProgress = true
    let [res, err] = await fetch2('api/v2/lawyer_request_payment_save', {case_uuid:case_store.case_info.case_uuid, step:step, tekst:amount})
    //console.log(res,err)
    if (res && res.results) {
      izitoast.success('Sacuvano')
      //dispatch("refresh", true); // parent event
    }
    else {
      izitoast.error( (err && err.message)?err.message:'Greska')
    }      
    dispatch("refresh", true); // parent event
    inProgress = false
  }

  export let step = 1
  export let case_store = {}
  $: alreadyRequested = case_store.payment[step-1].paymentrequest
</script>

<div class="col-4">
  <h5></h5>
</div>
<div class="col-8">
  <h5>
    {#if !alreadyRequested}
      <button on:click={requestPayment} disabled = {inProgress} class="btn btn-primary">Request payment</button>
    {/if}
  </h5>
</div>

