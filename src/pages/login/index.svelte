
<script>
  import { session, tmp_user_uuid } from '../../store/loginStore.js'
  import { fetch2 } from '../../utils/fetch2.js'
  import { goto } from '@sveltech/routify'
  import { params } from '@sveltech/routify'
  import Toast from 'svelte-toast'
  import { socketPromise } from '../../components/sock.js'
  let socket 
  socketPromise.then((s)=> socket=s )
  const izitoast = new Toast()

  let obj = {
    email:null,
    password:null,
    tmp_user_uuid:tmp_user_uuid
  }
  
  if ($session.token && $session.isLogedIn){
    socketPromise.then((socket)=> {
      socket.emit('client_token', $session.token)
    })
    izitoast.success('Welcome back');
    $goto('/client/dashboard')
  }

  async function tryLogin(){
    var [resp,err] = await fetch2('api/v2/auth', obj)
    if (!resp || !resp.token) { izitoast.error('Wrong credentials'); return }
    if (socket) socket.emit('client_token', resp.token)
    izitoast.success('Welcome'); 
    $session = { ...resp.results, isLogedIn:true, token:resp.token }
    if ($params && $params.from) $goto($params.from)
    else $goto('/client/dashboard')
  }
</script>

<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-4 offset-sd-3 offset-lg-4">
        <h1 class="mb-3 text-center">Please log in</h1>
        <form class="mb-3">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              class="form-control"
              placeholder="example@email.com"
              id="email"
              required
              bind:value={obj.email}
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              required
              bind:value={obj.password}
            />
          </div>
          <button type="button" on:click={tryLogin} class="btn btn-primary btn-block">
            Login
          </button>
        </form>
        <div class="text-center">
          <p>or</p>
          <a href="/signup{$params.from?'/?from='+$params.from:''}" class="btn btn-success">Create account</a>
          <!--
          <p class="small">
            <a href="#">Have you forgotten your account details?</a>
          </p>
          -->
        </div>
      </div>
    </div>
  </div>
</div>
