<script>
  import { session } from '@/store/loginStore.js'
  import {goto} from '@sveltech/routify'
  $: if ($session.isLogedIn) {
      if ( $session.rola=='LAWYER'){
        console.log('redir from root to lawyer route')
        $goto('/lawyer/active')
      }
      if ( $session.rola=='SA'){
        console.log('redir from root to sa route')
        $goto('/sa/active')
      }
  }

 //   import RoutifyIntro from './example/_components/RoutifyIntro.svelte'
</script>
{#if !$session.isLogedIn || $session.rola=='CLIENT'}

  <div class="w-90">

    <div class="home-1 d-flex flex-column justify-content-between">
      <h3 class="p-5">Remote Law_</h3>
      <h1 class="display-4 font-weight-bold p-5">Your online attorney_</h1>
      <h3 class="p-5 w-50 mb-5">
        Find everything you need in one place, <br class="d-none d-xl-inline">
        quick and easy attorney services  <br class="d-none d-xl-inline">
        done remotely
      </h3>
      <!--<img src="/images/home-1.png" 
      alt="lawyer" class="img-fluid" >-->
    </div>
  <!--
    <a href="/companies">Companies</a><br>
    <a href="/individuals">individuals</a><br>
    <a href="/realestate">realestate</a><br>
    <a href="/taxation">taxation</a><br>-->

    <div class="home-2 p-5">
      <h4>Services</h4>
      <div class="row">

      <div class="col-sm-3 px-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top image-on w-50 mx-auto py-5" src="/images/Companies.svg" alt="Companies">
          <div class="card-body">
            <a href="/companies" class="stretched-link">
             <h5 class="card-title"><span>Companies_</span></h5>
            </a>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>            
          </div>
        </div>
      </div>

      <div class="col-sm-3 px-3">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top w-50 mx-auto py-5" src="/images/Individuals.svg" alt="Individuals">
          <div class="card-body">
            <a href="/individuals" class="stretched-link">
             <h5 class="card-title"><span>Individuals_</span></h5>
            </a>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>

      <div class="col-sm-3 px-3">      
        <div class="card" style="width: 18rem;">
          <img class="card-img-top w-50 mx-auto py-5" src="/images/Real-Estate.svg" alt="Realestate">
          <div class="card-body">
            <a href="/realestate" class="stretched-link">
             <h5 class="card-title"><span>Realestate_</span></h5>
            </a>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>

      <div class="col-sm-3 px-3">         
        <div class="card" style="width: 18rem;">
          <img class="card-img-top w-50 mx-auto py-5" src="/images/Taxation.svg" alt="Taxation">
          <div class="card-body">
            <a href="/taxation" class="stretched-link">
             <h5 class="card-title"><span>Taxation_</span></h5>
            </a>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
        
      </div>
    </div>
  </div>

{/if}
<!--
$session.role= {JSON.stringify($session)}
<RoutifyIntro />
-->

<style>
  .home-1{
    background-image: url(/images/cover.jpg);
    background-repeat: no-repeat;
    background-size: 100%;
    width:100%;
    height:100vh;
  }
  .w-90 {
    width: 90%;
    margin: auto;
  }
  .card {
    border: dashed 2px #e7e7e7;
  }
  .card:hover {
    border: solid 2px #fcf3bf;  
  }
  .card-title {
    background-color: #fcf3bf;
    line-height: 50px;
  }
  .card-title > span {
    vertical-align: top;
    line-height: normal;
  }
  .home-2 {
    background-color: #fafafa;
  }
</style>