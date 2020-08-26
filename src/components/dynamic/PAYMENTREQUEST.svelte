<script>
  import { session } from '@/store/loginStore.js'
  import { fetch2 } from '@/utils/fetch2.js'
  import Toast from 'svelte-toast'
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const izitoast = new Toast()
  let inProgress = false

  async function confirmPayment(){
    inProgress = true
    let [res, err] = await fetch2('api/v2/lawyer_confirm_payment_save', {case_uuid:item.case_uuid, step:item.step, tekst:item.tekst})
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

  export let item = {}
  export let case_store = {}
  $: console.log('case_store....', case_store)
  $: placeno = case_store && case_store.payment && case_store.payment[item.step-1] &&
  case_store.payment[item.step-1].paymentrequest && case_store.payment[item.step-1].paymentconfirmed
</script>

<div class="col-4">
  <h5 style="text-transform: capitalize;">{String(item.action_type).toLowerCase()}</h5>
</div>
<div class="col-8">
  <h5 title="Created {new Date(item.created_date).toLocaleDateString()} {new Date(item.created_date).toLocaleTimeString()}">
    {#if $session.rola == 'CLIENT'}
      {#if !placeno}
        <a href="https:\\paypal.me\vujovicigor\{item.tekst}" target="_blank" class="btn btn-primary">Proceed to Payment (<i>${item.tekst}</i>)</a>
      {/if}
    {:else}
      Payment request (<i>${item.tekst}</i>) sent to client
      {#if !placeno}
        <button on:click={confirmPayment} disabled = {inProgress} class="btn btn-primary">Confirm payment</button>
      {/if}
    {/if}
  </h5>
</div>

