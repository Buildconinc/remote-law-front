<script>
  import { params } from '@sveltech/routify'
  import { service_groups as service_groups_store} from '@/store/getStore.js'
//  import { ready } from '@sveltech/routify'
  let services = []
  $: if ($service_groups_store.data && $service_groups_store.data[$params.service_group]) {
      services = $service_groups_store.data[$params.service_group].services
    //services = $service_groups_store.data[1].services;
    //$service_groups_store.data.forEach(element => {
    //  if (element.label.toLowerCase() == $params.service_group)
    //    services = element.services;
    //});
   // $ready()
   console.log('services=', services)
  }
</script>

<div class="container-fluid" style="flex:1; overflow:auto">
  <div class="row">
    <!--Grid column-->
    {#each services as {uuid, label, image}}
    <div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
      <div class="card" style="height:100%">
        <img class="card-img-top" src="{image}" alt="{label}">
        <div class="card-body">
         <!-- <h5 class="card-title" style="text-transform: capitalize;">{$params.service_group}</h5> -->
          <p class="card-text">{label}.</p>
        </div>  
        <div class="card-footer" style="border-top: none;">
          <a href="/{$params.service_group}/{uuid}" class="btn btn-primary stretched-link">Select</a>
        </div>              
      </div>
    </div>
    {/each}    
  </div>    
</div>