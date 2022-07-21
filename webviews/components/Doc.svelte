<script lang="ts">
  import type { IDoc, IDocFile } from "../types";
  export let doc: IDoc;
  export let docVersions: string[];
  export let setIndex: (i: string) => void;

  function openDoc(file: IDocFile) {
    ldvscode.postMessage({ command: "open-doc", value: file });
  }
</script>

<div class="doc">
  <header>
    <h1>Laravel</h1>
    <select name="doc-select" on:change={(e) => setIndex(e.target.value)}>
      {#each docVersions as version, i}
        <option value={i}>{version}</option>
      {/each}
    </select>
  </header>

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
  header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  header h1 {
    color: orangered;
  }
  header select {
    color: orangered;
    background-color: transparent;
    padding: 0 5px;
    font-size: 22px;
    outline: none;
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
