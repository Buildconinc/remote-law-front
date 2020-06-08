<script>
  import Modal from '@/components/Modal.svelte'
  import Toast from 'svelte-toast'
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { fetch2 } from '@/utils/fetch2.js'

  const izitoast = new Toast()
  let data = { email:null, name_first:null, name_last:null }
  let inProgress

  function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
  async function createAccount(){
    if (!data.email || !data.name_first || !data.name_last) { izitoast.error('Popunite sva polja!'); return} 
    if (!validateEmail(data.email)) { izitoast.error('Neispravan email'); return} 
    inProgress = true
    let [res, err] = await fetch2('api/v2/sa_create_lawyer_account_save', data)
    //console.log(res,err)
    if (res && res.results) {
      izitoast.success('Napravio')
      dispatch("close", true);      
    }
    else {
      izitoast.error( (err && err.message)?err.message:'Greska')
    }      
    inProgress = false
  }
</script>

<Modal on:close max_width='40em' height='30em'>
  <h2 slot='header'>
    Pravljenje novog naloga za advokata
  </h2>

  <div class="form-group">
    <label for="exampleInputEmail1">Email adresa</label>
    <input bind:value={data.email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">Pozivni email ce biti poslat na ovu adresu</small>
  </div>
  <div class="form-group">
    <label for="t1">Ime</label>
    <input bind:value={data.name_first} type="text" class="form-control" id="t1" placeholder="First name">
  </div>
  <div class="form-group">
    <label for="t2">Prezime</label>
    <input bind:value={data.name_last} type="text" class="form-control" id="t2" placeholder="Last name">
  </div>

  <button disabled={inProgress} class="btn btn-primary" on:click={createAccount}>Napravi nalog</button>
  
<!--
  <h2 slot='footer'>
    <button class="btn" on:click={()=>{ showCreateProfileModal=false }}>Cancel</button>
    <button class="btn btn-primary" >Create</button>
  </h2>    
  -->
</Modal>