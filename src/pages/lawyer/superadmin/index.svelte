<script>
  import { isActive, url } from '@sveltech/routify'  
  import { sa_cases_active_list } from '@/store/getStore.js'
  import { sa_lawyers_list } from '@/store/getStore.js'
  import { fetch2 } from '@/utils/fetch2.js'
  import Modal from '@/components/Modal.svelte'
  import { params } from '@sveltech/routify'
  import CreateLawyerProfile from '@/components/CreateLawyerProfile.svelte'

  $: console.log('params SA', $params)

  let showModal
  let selected_case_uuid
  let selected_lawyer_uuid
  $: if (!showModal) selected_lawyer_uuid=null // reset selected_lawyer_uuid on modal close

  function assignLawyer(case_uuid){
    selected_case_uuid = case_uuid
    showModal = true
  }

  async function saveAssignedLawyer(){
    console.log('selected_lawyer_uuid', selected_lawyer_uuid)
    console.log('selected_case_uuid', selected_case_uuid)
    let [res, err] = await fetch2('api/v2/sa_assign_lawyer_save', {lawyer_uuid:selected_lawyer_uuid, case_uuid:selected_case_uuid})
    if (res && res.results && res.results.case_uuid) {
      sa_cases_active_list.refresh()
      sa_lawyers_list.refresh()
    }    
    showModal = false
  }
  let showCreateProfileModal

  
</script>
<!-- MENI -->
<div class="container-fluid" style="overflow: auto; display: flex; flex-flow: column;">


  <div class="row">
    <div class="col-sm-6">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <a class="nav-link" class:active={$params.status=='ACTIVE'} href="/lawyer/superadmin?status=ACTIVE">Aktivni predmeti</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" class:active={$params.status=='ARCHIVED'} href="/lawyer/superadmin?status=ARCHIVED">Arhivirani predmeti</a>
        </li>
      </ul>
    </div>

    <div class="col-sm-4">
      <ul class="nav nav-pills d-none d-sm-block">
        <li class="nav-item">
          <a class="nav-link" href="#">Advokati</a>
        </li>
      </ul>
    </div>

    <div class="col-sm-2">
      <button class="btn" on:click={()=>showCreateProfileModal=true}>Kreiraj profil</button>
    </div>

    
  </div>


  <div class="row" style="overflow: auto;height: 100%;">
    <div class="col-sm-6" style="overflow: auto;height: 100%;">

      <!-- Lista predmeta -->
      <div class="row">
        {#each $sa_cases_active_list.data as item}
        {#if $params.status == item.case_status}
          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                <img height="40" width="40" class="img rounded-circle" src="{item.client_profile_photo}" alt="{item.client_name_first}  {item.client_name_last}">
                {item.client_name_first} {item.client_name_last}</h5>
                <p class="card-text">{item.service_group_label} / {item.service_label}</p>
                <p>Advokat: 
                  {#if item.assigned_loyer_uuid}
                  {item.lawyer_name_first} {item.lawyer_name_last}
                  {:else}
                  <a href="javascript:void(0)" on:click={()=>assignLawyer(item.case_uuid)} style="color:yellow">Unassigned</a>
                  {/if}
                </p>
                <p class="card-text">Status: Zakucan Step 1 /Odgovor za sad</p>
                <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
              </div>
            </div>
          </div>
        {/if}
        {/each}
      </div>
    </div>

    <div class="col-sm-6" style="overflow: auto;height: 100%;display: flex; flex-flow: column;">
      <table class="table">
        <thead>
          <tr>
            <th style="width:40%" scope="col">Ime Advokata</th>
            <th style="width:30%" scope="col">Broj Aktivnih Predmeta</th>
            <th style="width:30%" scope="col">Broj Arhiviranih Predmeta</th>
          </tr>
        </thead>
      </table>

      <div style="overflow: auto;height: 100%;">
        <table class="table">
  <!--
          <thead>
            <tr>
              <th scope="col" style="position: sticky;top: -1px;background-color: white;">Ime Advokata</th>
              <th scope="col" style="position: sticky;top: -1px;background-color: white;">Broj Aktivnih Predmeta</th>
              <th scope="col" style="position: sticky;top: -1px;background-color: white;">Broj Arhiviranih Predmeta</th>
            </tr>
          </thead>
  -->
          <tbody>
            {#each $sa_lawyers_list.data as item}
              <tr>
                <td style="width:40%">
                  <img height="30" width="30" class="img rounded-circle" src="{item.profile_photo}" alt="{item.name_first}  {item.name_last}">
                  {item.name_first} {item.name_last}        
                </td>
                <td style="width:30%">{item.active_cc}</td>
                <td style="width:30%">{item.archived_cc}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>  
    </div>  
  </div>  

</div>  



{#if showModal}
  <Modal on:close={()=>showModal=false} max_width='50em' height='80vh'>
    <h2 slot='header'>
      Izaberite advokata sa liste
    </h2>

    <ul class="list-group">
      {#each $sa_lawyers_list.data as item}
        <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        class:active={item.user_uuid == selected_lawyer_uuid}
        on:click = {()=>selected_lawyer_uuid = item.user_uuid}
        >
          <span>
            <img height="40" width="40" class="img rounded-circle" src="{item.profile_photo}" alt="{item.name_first}  {item.name_last}">
            {item.name_first} {item.name_last}
          </span>
          <span class="badge badge-primary badge-pill">{item.active_cc} / {item.archived_cc}</span>
        </li>
      {/each}
    </ul>

    <h2 slot='footer'>
      <button class="btn" on:click={()=>{ showModal=false }}>Cancel</button>
      <button class="btn btn-primary" on:click={saveAssignedLawyer} disabled={!selected_lawyer_uuid}>Assign</button>
    </h2>    
  </Modal>
{/if}


{#if showCreateProfileModal}
<CreateLawyerProfile on:close={(created)=> {showCreateProfileModal=false; if (created) sa_lawyers_list.refresh()}}></CreateLawyerProfile>
{/if}