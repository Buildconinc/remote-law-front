<script>
  import { service_groups as service_groups_store} from '../../store/getStore.js'
  let services = []
  $: if ($service_groups_store.data && $service_groups_store.data[1]) services = $service_groups_store.data[1].services
</script>

<div class="container-fluid" style="flex:1; overflow:auto">
  <div class="row">
    <!--Grid column-->
    {#each services as {uuid, label}}
    <div class="col-md-2 mb-4">
      <div class="card">
        <img class="card-img-top" src="/310-800x400.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{label}</h5>
          <p class="card-text">blabla.</p>
          <a href="/individuals/{uuid}" class="btn btn-primary">Select</a>
        </div>      
      </div>
    </div>
    {/each}    



  </div>    
</div>