<script>
  //https://github.com/vipero07/svelte-file-upload-component
  function getFilesFromDropEvent({ dataTransfer: { files, items } }) {
    return files.length
      ? [...files]
      : items
          .filter(({ kind }) => kind === "file")
          .map(({ getAsFile }) => getAsFile());
  }

  function getFilesFromInputEvent({ target }) {
    const files = target.files ? [...target.files] : [];
    target.value = "";
    return files;
  }

  import { createEventDispatcher } from "svelte";
  export let multiple = false;
  let dragging = false;
  const dispatch = createEventDispatcher();
  function startDragging() {
    dragging = true;
  }
  function stopDragging() {
    dragging = false;
  }
  const onFile = getFilesFunction => event => {
    stopDragging();
    const files = getFilesFunction(event);
    if (files.length) {
      dispatch("input", { files: multiple ? files : files[0] });
      uploadFile( multiple ? files : files[0] )
    }
  };



  ///// Igor
  import Toast from 'svelte-toast'
  const izitoast = new Toast()
  import { session, tmp_user_uuid } from '@/store/loginStore.js'
  let token = null;
  session.subscribe($session=>{
    token = $session?$session.token:null
  })

  export let progress = 0
  export let state = null
  export let URL = 'https://remotelaw.ga/api/v2/fileupload' 
  export let fileCategory = null
  let file_ref

  function uploadFile(file){
    file_ref = file
    //var file = file1.files[0];
//    let [res, err] = await fetch2('api/v2/'+ ($session.isLogedIn?'':'public_') +'client_case_save', {service_uuid:service, case_text:case_text, tmp_user_uuid:tmp_user_uuid})
    
    var formdata = new FormData();
    formdata.append("file", file);
    if (fileCategory) formdata.append('fileCategory', fileCategory);
    if (!$session.isLogedIn) formdata.append('tmp_user', tmp_user_uuid);

    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", URL+($session.isLogedIn?'':'_public')); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
    ajax.setRequestHeader('Authorization', 'Bearer ' + token);
    ajax.send(formdata);
    state = 'uploading'
  }

  function progressHandler(event) {
    var percent = Math.round( (event.loaded / event.total) * 100);
    console.log('UploadProgress % ',Math.round(percent))
    progress =  percent==100?0:percent;
    dispatch("progress", progress);
  }

  function completeHandler(event) {
    console.log('event.target.responseText', event.target.responseText)
    var resp = {}
    try {
      resp = JSON.parse(event.target.responseText)
    }
    catch (err){
      izitoast.error( 'Upload completed but bad response received '+event.target.responseText);
    }
    
    izitoast.success('Upload finished');
    dispatch("uploaded", { url:resp.results, name:file_ref.name });
    progress = 0 //clear progress bar after successful upload
    dispatch("progress", progress);
    state = 'done'
  }

  function errorHandler(event) {
    izitoast.error('Upload Failed');
    state = 'error'
  }

  function abortHandler(event) {
    izitoast.error('Upload Aborted');
    state = 'error'
  }

</script>

<style>
  input {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
  label:hover {
    cursor: pointer;
  }
</style>

<label {...$$restProps}
  class:dragging
  on:drop|preventDefault={onFile(getFilesFromDropEvent)}
  on:dragover|preventDefault={startDragging}
  on:dragleave|preventDefault={stopDragging}>
  <slot {dragging}>
    <div>
      Drag &amp; Drop your file(s) or
      <strong>browse.</strong>
    </div>
  </slot>
  <input type="file" {multiple} on:input={onFile(getFilesFromInputEvent)} />
</label>