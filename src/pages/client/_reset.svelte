<script>
  import { afterUpdate } from 'svelte';
  import { goto } from '@sveltech/routify'  
  import Header from '@/components/Header.svelte';
  //import { params } from '@sveltech/routify'
  import Login from '@/components/Login.svelte'
  import { session } from '@/store/loginStore.js'

//$: console.log('params iz reset lojer layouta', $params)

  afterUpdate(() => {
      window.scrollTo(0, 0);
  });
</script>

{#if $session && $session.isLogedIn }
  {#if 'CLIENT' == $session.rola }
    <Header />
    <slot />
    {:else}
    {$goto('/lawyer/active')}
  {/if}
{:else}
  <Login></Login>
{/if}
<!-- {JSON.stringify($session)} -->