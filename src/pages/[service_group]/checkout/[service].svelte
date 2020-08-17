<script>
  import { service_groups as service_groups_store} from '@/store/getStore.js'
  import { session } from '@/store/loginStore.js'
  import { params, goto } from '@sveltech/routify'
  export let service 
</script>



<div class="container-fluid" style="flex:1; overflow:auto">
  <h2 style="text-transform: capitalize;">{$params.service_group}/ checkout</h2>
  <p>izabrani servis: <b>{service}</b></p>
  <div class="row">

{#if $session.isLogedIn }
Ulogovan user, molimo Vas uplatite naznaceni iznos na paypal <a href="https://www.paypal.me/vujovicigor/29usd" target="_blank">https://www.paypal.me/vujovicigor/29usd</a>
{:else}
Niste ulogovani!<br>
Napravite nalog <button class="btn btn-primary" on:click={()=>$goto('/signup/?from=/{$params.service_group}/checkout/'+service)}>Signup</button>
<br> ili se ulogujte na <button class="btn btn-primary" on:click={()=>$goto('/login/?from=/{$params.service_group}/checkout/'+service)}>Login</button>
{/if}



  </div>    
</div>