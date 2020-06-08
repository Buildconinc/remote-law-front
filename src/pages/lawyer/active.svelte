<script>
  import { lawyer_cases_active_list } from '@/store/getStore.js'
</script>

<div class="container-fluid" style="flex:1; overflow:auto; height:100%">
  <!-- Lista predmeta -->
  <div class="row">
    {#each $lawyer_cases_active_list.data as item}
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
            <img height="40" width="40" class="img rounded-circle" src="{item.client_profile_photo}" alt="{item.client_name_first}  {item.client_name_last}">
            {item.client_name_first} {item.client_name_last}</h5>
            <p class="card-text">{item.service_group_label} / {item.service_label}</p>
            <p class="card-text">Step {item.current_step} / {item.latest_action_type} {item.latest_text}</p>
          </div>
        </div>
      </div>
    {:else}
      <div class="col-12">
        <div style="text-align:center"><small>No items found</small></div>
      </div>    
    {/each}
  </div>
</div>