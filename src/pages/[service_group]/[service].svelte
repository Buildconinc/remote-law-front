<script>
  import { service_groups as service_groups_store} from '@/store/getStore.js'
  import { goto } from '@sveltech/routify'
    
  let services = []
  import { params } from '@sveltech/routify'
  $: if ($service_groups_store.data && $service_groups_store.data[$params.service_group]) 
    services = $service_groups_store.data[$params.service_group].services

  export let service 
</script>

<div class="container-fluid" style="flex:1; overflow:auto">
  <h2>{$params.service_group}</h2>
  <p>izabrani servis: <b>{service}</b></p>
  <div class="row">
    <!--Grid column-->
    <div class="col-md-6 mb-4">
      <ul class="list-group">
        {#each services as {uuid, label}}
          <a href="javascript:void(0)" class="list-group-item list-group-item-action" class:active={service==uuid} 
            on:click={()=>{ $goto('/'+$params.service_group+'/'+uuid) }}>{label}</a>
        {/each}
      </ul>
    </div>

    <!--Grid column-->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title"> $29 price</h5>
          <p class="card-text">blabalbalba.</p>
          <a href="/{$params.service_group}/beforecheckout/{service}" class="btn btn-primary">SEND YOUR REQUEST</a>
        </div>      
      </div>
    </div>


  </div>    
</div>