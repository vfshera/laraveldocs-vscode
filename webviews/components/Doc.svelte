<script lang="ts">
  import type { IDoc, IDocFile } from "../types";
  export let doc: IDoc;

  function openDoc(file: IDocFile) {
    ldvscode.postMessage({ command: "open-doc", value: file });
  }
</script>

<div class="doc">
  <h1>Laravel {doc.version}</h1>
  <hr />
  <ul>
    {#each doc.files as docFile}
      <li class="doc-type" on:click={() => openDoc(docFile)}>
        <span>#</span>
        {docFile.title}
      </li>
    {/each}
  </ul>
</div>

<style>
  h1 {
    color: orangered;
  }
  .doc-type {
    list-style: none;
    cursor: pointer;
  }
  .doc-type span {
    color: orangered;
    font-weight: 100;
  }
  .doc-type:hover {
    color: orangered;
    background-color: #11111111;
  }

  hr {
    height: 1px;
  }
</style>
