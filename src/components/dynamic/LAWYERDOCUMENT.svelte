<script>
  import FileThumbs from '@/components/FileThumbs.svelte' 
  import { session } from '@/store/loginStore.js'
  export let item = {}
</script>

<div class="col-4">
  <h5 style="text-transform: capitalize;">{String(item.action_type).toLowerCase()}</h5>
</div>
<div class="col-8">
  <h5 title="Created {new Date(item.created_date).toLocaleDateString()} {new Date(item.created_date).toLocaleTimeString()}">
    <FileThumbs files={ [{url:item.tekst, name:item.file_name}] }></FileThumbs>
  </h5>
</div>
