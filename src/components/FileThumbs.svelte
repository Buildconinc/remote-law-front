<script>
export let files = [
    {url:'bjkhb', name:'nj.pdf'},
  ]

function get_img(file){
  if (!file || !file.name) return null
  let arr = file.name.split('.');
  let ext = arr.pop()
  if ( ['pdf', 'zip', 'xls', 'xlsx', 'avi', 'css', 'doc', 'docx', 'eps', 'html', 'ini', 'mp3'
  , 'ppt', 'pptx', 'psd', 'pst', 'rar', 'readme'].includes(ext) )
    return `/icons/${ext}.ico`
  return file.url
}
</script>
<div>
  {#each files as file}
    <div class="thumb">
      <img src="{get_img(file)}" class="rounded img-thumbnail" alt="?">
      <span>{file.name}</span>
    </div>
  {/each}
</div>

<style>
img {
  display: inline-block;
  width:42px;
  height:42px;
  object-fit: contain;
}
.thumb {
  margin-right: 1rem;
  margin-bottom: 1rem;
  display: inline-block;
}
</style>
