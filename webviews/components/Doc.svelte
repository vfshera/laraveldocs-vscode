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
    <select
      name="doc-select"
      on:change={({ target: { value } }) => setIndex(value)}
    >
      {#each docVersions as version, i}
        <option value={i}>{version}</option>
      {/each}
    </select>
  </header>

  <hr />
  <div class="doc-topic">
    {#each doc.files as docFile}
      <div class="doc-type" on:click={() => openDoc(docFile)}>
        <span>#</span>
        {docFile.title}
      </div>
    {/each}
  </div>
</div>

<style>
  header {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  header h1 {
    color: #f9322c;
  }
  header select {
    color: #f9322c;
    background-color: transparent;
    padding: 0;
    font-size: 2em;
    outline: none;
    border: none;
    padding: 0 5px;
  }
  .doc-type {
    list-style: none;
    cursor: pointer;
    padding: 5px;
    font-size: 16px;
  }
  .doc-type span {
    color: #f9322c;
    font-weight: 100;
  }
  .doc-type:hover {
    color: #f9322c;
    background-color: #11111111;
  }

  hr {
    height: 1px;
  }
</style>
