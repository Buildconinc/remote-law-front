<script>
  import { isActive, url } from '@sveltech/routify'  
  import { afterUpdate } from 'svelte';
  import { session } from '@/store/loginStore.js'
  import { clickOutside} from '@/utils/clickOutside.js';
  import { beforeUrlChange } from "@sveltech/routify"
  import { chatUnreadStore, chatUnreadStoreTotal, chatUnreadStoreTotalTweened } from '@/store/chatUnreadStore.js'

  $beforeUrlChange((event, store) => {
    if (collapse_el) collapse_el.classList.add('collapse');
    return true
  })

  import { service_groups as service_groups_store} from '@/store/getStore.js'
  console.log('uHederu', $service_groups_store)
// bzveze test

  function handleClickOutside(e){
    //console.log('click outsie menu')
    collapse_el.classList.add('collapse');
  }

// Mobile menu
  let narrow;
  let windowWidth;
  handleResize();
  function handleResize() {
      windowWidth = window.innerWidth;
      if (windowWidth < 1024) {
          narrow = true
      } else {
          narrow = false
      }
  }
  let mobileNavOpen = false;
  function toggleMenu() {
      mobileNavOpen = !mobileNavOpen;
      if (mobileNavOpen) {
        document.documentElement.classList.add('u-kill-scroll');
        document.body.classList.add('u-kill-scroll');
      } else {
        document.documentElement.classList.remove('u-kill-scroll');
        document.body.classList.remove('u-kill-scroll');
      }
  }


  // Main nav
  let links = [];
  $: links = [
    ['/companies', 'Companies'],
    ['/individuals', 'Individuals'],
    ['/realestate', 'Real Estate'],
    ['/taxation', 'Taxation'],
 //   ['/client/dashboard', 'Dashboard']
  ].map(([path, name]) => {
    return {
      name,
      href: $url(path),
      active: $isActive(path)
    }
  });

  let collapse_el
  function toggle(){
    collapse_el.classList.toggle('collapse');
  }

  let is_unread_count_open=false


</script>

<svelte:window on:resize={handleResize}></svelte:window>


<nav class="navbar navbar-expand-md navbar-light bg-light" use:clickOutside on:click_outside={handleClickOutside}>
  <a class="navbar-brand" href="/">RemoteLaw </a>
  <button on:click={toggle} class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div bind:this="{collapse_el}" class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">

      {#each links as {name, href, active}}
        <li class="nav-item" class:active>
          <a {href} class="nav-link">{name}</a>
        </li>
      {/each}
    </ul>

{#if $session.isLogedIn }
    <ul class="navbar-nav ">
      <li class="nav-item" >
        <small class="nav-link">{$session.email}</small>
      </li>
<!--
      <li class="nav-item dropdown" class:show={is_unread_count_open}>
        <a on:click={()=>is_unread_count_open= !is_unread_count_open} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {$chatUnreadStoreTotal} msgs
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown" class:show={is_unread_count_open}>
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">{JSON.stringify($chatUnreadStore)}</a>
        </div>
      </li>
-->
      <li class="nav-item" class:active={$isActive('/client/dashboard')} style="position: relative">
        <a href="/client/dashboard" class="nav-link">Dashboard</a>
        {#if $chatUnreadStoreTotal}
          <span class="badge badge-pill badge-danger" style="position: absolute; top: 0; right: 0;">
          {$chatUnreadStoreTotalTweened|0}
          </span>  
        {/if}             
      </li>
      <li class="nav-item" >
        <a href="#" class="nav-link" on:click={()=>{$session.isLogedIn = false; $session.token= null; document.location = document.location}}>Logout</a>
      </li>
    </ul>
{:else }
    <ul class="navbar-nav ">
      <li class="nav-item" >
        <a href="/login" class="nav-link">Login</a>
      </li>
      <li class="nav-item" >
        <a href="/signup" class="nav-link">Sign Up</a>
      </li>
    </ul>
{/if}
  </div>
</nav>


