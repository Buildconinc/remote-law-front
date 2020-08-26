<script>
  import { session } from '@/store/loginStore.js'
  import {goto} from '@sveltech/routify'
  import hoverImgSrc from '@/utils/hoverImgSrc.js'
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

  <div class="w-75 mx-auto">

    <div class="home-1">
      <div class="d-flex flex-column justify-content-between" style="height:70%;">
        <h3 class="p-5">Remote Law_</h3>
        <h1 class="display-4 font-weight-bold p-5">Your online <br> attorney_</h1>
        <h3 class="p-5 w-50 mb-5">
          Find everything you need in one place, <br class="d-none d-xl-inline">
          quick and easy attorney services  <br class="d-none d-xl-inline">
          done remotely
        </h3>
        <!--<img src="/images/home-1.png" 
        alt="lawyer" class="img-fluid" >-->
      </div>
    </div>
    <!--
    <a href="/companies">Companies</a><br>
    <a href="/individuals">individuals</a><br>
    <a href="/realestate">realestate</a><br>
    <a href="/taxation">taxation</a><br>-->

    <div class="home-2 p-5">
      <h2 class="my-5 pb-5">Services_</h2>
      <div class="row">

        <div class="col-sm-3 px-3">
          <div class="card" style="">
            <img class="card-img-top home image-on w-50 mx-auto py-5" src="/images/Companies.svg" alt="Companies"  use:hoverImgSrc={'/images/Companies-active.svg'}>
            <div class="card-body">
              <a href="/companies" class="">
              <h5 class="card-title"><span>Companies_</span></h5>
              </a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>            
            </div>
          </div>
        </div>

        <div class="col-sm-3 px-3">
          <div class="card" style="">
            <img class="card-img-top w-50 mx-auto py-5" src="/images/Individuals.svg" alt="Individuals"  use:hoverImgSrc={'/images/Individuals active.svg'}>
            <div class="card-body">
              <a href="/individuals" class="">
              <h5 class="card-title"><span>Individuals_</span></h5>
              </a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>

        <div class="col-sm-3 px-3">      
          <div class="card" style="">
            <img class="card-img-top w-50 mx-auto py-5" src="/images/Real-Estate.svg" alt="Realestate"  use:hoverImgSrc={'/images/Real-Estate active.svg'}>
            <div class="card-body">
              <a href="/realestate" class="">
              <h5 class="card-title"><span>Realestate_</span></h5>
              </a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>

        <div class="col-sm-3 px-3">         
          <div class="card" style="">
            <img class="card-img-top w-50 mx-auto py-5" src="/images/Taxation.svg" alt="Taxation"  use:hoverImgSrc={'/images/Taxation active.svg'}>
            <div class="card-body">
              <a href="/taxation" class="">
              <h5 class="card-title"><span>Taxation_</span></h5>
              </a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <div class="home-3 p-5">
      <h2 class="my-5 pb-5">About_</h2>
      <div class="row">
        <div class="col-6 d-flex flex-column justify-content-between">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <h4 class="font-weight-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.         
          </h4>
        </div>
        <div class="col-6">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>    
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>  
        </div>
      </div>
    </div>

    <div class="home-4">
      <div class="row mx-0">
        <div class="col-6 d-flex justify-content-between p-5">    
          <div>
            <p>Remote Law_</p>
            <p></p>
          </div>
          <div  class="d-flex flex-column justify-content-between" style="height:100%;">
            <a href="" class="d-block">About</a>
            <a href="" class="d-block">Faq</a>
            <a href="" class="d-block">Contact</a>
          </div>
        </div>
        <div class="col-6 bg-yellow">    

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
    min-height:70vh;
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
  .home-3 {
    background-color: #252889;
    min-height:70vh;
    color:white;
  }
  .home-4 {
    min-height:20vh;
  }
  .bg-yellow {
    background-color: #fcf3bf; 
    height: 20vh;
  }
</style>

