<script>
  import { name, greeting } from '../../components/chatStore.js';
  import { isActive, url, context } from '@sveltech/routify';
</script>
<div class="container" style="flex:1; overflow:auto">

  <h1>{$greeting}</h1>
  <input bind:value={$name}>
  <pre>
  <code>isActive={ JSON.stringify(isActive) }
  url={url}
  context = {JSON.stringify(context)}
  </code>
  </pre>
</div>