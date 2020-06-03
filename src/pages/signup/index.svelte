<script>
  import { session } from '@/store/loginStore.js'
  import { fetch2 } from '@/utils/fetch2.js'
  import { params, goto } from '@sveltech/routify'
  import Toast from 'svelte-toast'
  const izitoast = new Toast()

  let obj = {
    email:null,
    password:null,
    name_first:null,
    name_last:null
  }

  //this.focusFirstElement();
 // if (localStorage.getItem('token')){
  if ($session.token){
      //socket.emit('client_token', localStorage.getItem('token'))
      izitoast.success('Welcome back');
      $session.isLogedIn = true
      //G.selectedModule = 'Customers'            
  }

  async function createAccount(){
    if (!obj.email) {
      izitoast.info( 'email missing');
      return
    }
    if (!obj.name_first || !obj.name_last) {
      izitoast.info( 'name missing');
      return
    }
    if (!obj.password ) {
      izitoast.info( 'password missing');
      return
    }
    console.log('createAccount')
    var [resp,err] = await fetch2('api/v2/signup', obj)
    if (resp && resp.token) {
        //localStorage.setItem('token', resp.token);
        console.log('token ok')
        //socket.emit('client_token', resp.token)
        //izitoast.success({ message: 'You are in'}); 
        $session = { ...resp.results, isLogedIn:true, token:resp.token }
        console.log('session iz ajaxa', $session)
        if ($params && $params.from) $goto($params.from)
        else $goto('/client/dashboard')
        return
    }   
    if (resp && resp.results && resp.results.status=='exist') { 
      izitoast.info( 'User already exists.'); 
      return  
    }
    if (resp && resp.results && resp.results.status=='ok') { 
      izitoast.success( 'Thank you.');
      $goto('/login') 
      return  
    }
    izitoast.error( 'Error');                

  }

</script>
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <div class="row">
      <div
        class="col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4"
      >
        <h1 class="mb-3 text-center">Create a new account</h1>
        <!--
        <p class="lead">
          It's free and you don't have to share your address.
        </p>
        -->
        <form class="mb-3">
          <div class="row">
            <div class="form-group col-12 col-sm-6">
              <label for="firstName">First name:</label>
              <input
                type="text"
                class="form-control"
                placeholder="First name"
                id="firstName"
                bind:value={obj.name_first}
              />
            </div>
            <div class="form-group col-12 col-sm-6">
              <label for="lastName">Last name:</label>
              <input
                type="text"
                class="form-control"
                placeholder="Last name"
                id="lastName"
                bind:value={obj.name_last}
              />
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              class="form-control"
              placeholder="example@example.com"
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
          <!--
          <label>Birthday:</label>
          <div class="row no-gutters">
            <div class="form-group col-4">
              <label for="birthdayDay" class="sr-only">Birthday day</label>
              <select class="form-control" id="birthdayDay">
                <option value="">Day</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
            </div>
            <div class="form-group col-4">
              <label for="birthdayMonth" class="sr-only"
                >Birthday month</label
              >
              <select class="form-control" id="birthdayMonth">
                <option value="">Month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>
            <div class="form-group col-4">
              <label for="birthdayYear" class="sr-only"
                >Birthday year</label
              >
              <select class="form-control" id="birthdayYear">
                <option value="1980">1980</option>
                <option value="1981">1981</option>
                <option value="1982">1982</option>
                <option value="1983">1983</option>
                <option value="1984">1984</option>
                <option value="1985">1985</option>
                <option value="1986">1986</option>
                <option value="1987">1987</option>
                <option value="1988">1988</option>
                <option value="1989">1989</option>
                <option value="1990">1990</option>
                <option value="1991">1991</option>
                <option value="1992">1992</option>
                <option value="1993">1993</option>
                <option value="1994">1994</option>
                <option value="1995">1995</option>
                <option value="1996">1996</option>
                <option value="1997">1997</option>
                <option value="1998">1998</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
              </select>
            </div>
          </div>
-->
          <button type="button" on:click={createAccount} class="btn btn-primary btn-block mb-3">
            Create account
          </button>
          <div class="alert alert-info small" role="alert">
            By clicking above you agree to our
            <a href="/thankyou" class="alert-link">Terms &amp; Conditions</a> and
            our <a href="/thankyou" class="alert-link">Privacy Policy</a>.
          </div>
          <div class="text-center">
            <p>or</p>
            <a href="/login" class="btn btn-success">Login</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
