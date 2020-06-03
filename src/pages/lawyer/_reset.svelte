<script>
  import { afterUpdate } from 'svelte';
  import { isActive, url, context } from '@sveltech/routify';
  import Header from '@/components/HeaderLawyer.svelte';
  import { params } from '@sveltech/routify'

$: console.log('params iz reset lojer layouta', $params)

  afterUpdate(() => {
      window.scrollTo(0, 0);
  });


</script>


<Header />
<slot />

