<script lang="ts">
let docs = [];

import { onMount } from "svelte";


  onMount(() =>{
    window.addEventListener("message",(ev) =>{
      docs = ev.data.value
    })
    ldvscode.postMessage({ command: 'docs-list',value: "Sidebar Ready!"})
  })
</script>
<main>
  
  {#each docs as doc}
    <div class="doc">
      <p>Laravel {doc.v}</p>
      <ul>
        {#each doc.files as file}
        <li>{file}</li>
        {/each}
      </ul>
    </div>
  {/each}
  <!-- <button on:click={() => {
    ldvscode.postMessage({ command: 'onInfo',value: "Sidebar Information"})
  }}>Hey</button> -->
</main>
<style>
  h1{
    color: orangered;
  }
</style>