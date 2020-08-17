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

  <h2>Your online attorney_</h2>
  <h3>Find everything you need in one place, quick and easy attorney services done remotely</h3>
  <img src="https://st3.depositphotos.com/1177973/12547/i/950/depositphotos_125470420-stock-photo-handsome-young-lawyer.jpg" 
  alt="lawyer" class="img-fluid" >
  <h4>Services</h4>
  <a href="/companies">Companies</a><br>
  <a href="/individuals">individuals</a><br>
  <a href="/realestate">realestate</a><br>
  <a href="/taxation">taxation</a><br>

{/if}
<!--
$session.role= {JSON.stringify($session)}
<RoutifyIntro />
-->