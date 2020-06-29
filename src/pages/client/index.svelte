<script>
  import Chat from '@/components/Chat.svelte'
  import { params } from '@sveltech/routify'

$: console.log('params:', $params)
</script>

<div class="container-fluid" style="flex:1; overflow:auto; height:100%">
  <div class="row" style="height:100%">
    <div class="col-12 col-sm-6 col-lg-8" >
      <h1>Clijent ruta ok</h1>
      To see an drugi, go to <a href="/client/drugi">/client/drugi</a>
    </div>
    <div class="col-12 col-sm-6 col-lg-4" style="height:100%">
      <Chat></Chat>
    </div>
  </div>
</div>