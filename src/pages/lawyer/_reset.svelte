<script>
  import { afterUpdate } from 'svelte';
  import { goto } from '@sveltech/routify'  
  import HeaderLawyer from '@/components/HeaderLawyer.svelte';
  //import { params } from '@sveltech/routify'
  import Login from '@/components/Login.svelte'
  import { session } from '@/store/loginStore.js'

//$: console.log('params iz reset lojer layouta', $params)

  afterUpdate(() => {
      window.scrollTo(0, 0);
  });
</script>

{#if $session && $session.isLogedIn }
  {#if ['LAWYER', 'SA'].includes( $session.rola) }
    <HeaderLawyer />
    <slot />
    {:else}
    {$goto('/client/dashboard')}
  {/if}
{:else}
  <Login></Login>
{/if}
<!-- {JSON.stringify($session)} -->