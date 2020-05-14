<script>
  import { afterUpdate } from 'svelte';
  import { isActive, url, context } from '@sveltech/routify';
  import Header from '../../components/Header.svelte';
  import { params } from '@sveltech/routify'

$: console.log('params iz reset layouta', $params)

  afterUpdate(() => {
      window.scrollTo(0, 0);
  });


</script>


<Header />
<slot />

