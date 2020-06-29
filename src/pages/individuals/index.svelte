<script>
  import { service_groups as service_groups_store} from '@/store/getStore.js'
//  import { ready } from '@sveltech/routify'
  let services = []
  $: if ($service_groups_store.data && $service_groups_store.data[1]) {
    services = $service_groups_store.data[1].services;
   // $ready()
  }
</script>

<div class="container-fluid" style="flex:1; overflow:auto">
  <div class="row">
    <!--Grid column-->
    {#each services as {uuid, label}}
    <div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
      <div class="card" style="height:100%">
        <img class="card-img-top" src="/310-800x400.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{label}</h5>
          <p class="card-text">{label}.</p>
        </div>  
        <div class="card-footer" style="border-top: none;">
          <a href="/individuals/{uuid}" class="btn btn-primary stretched-link">Select</a>
        </div>              
      </div>
    </div>
    {/each}    



  </div>    
</div>