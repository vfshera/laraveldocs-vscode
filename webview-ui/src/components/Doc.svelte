<script lang="ts">
  import type { IDoc, IDocFile } from "../types";
  export let doc: IDoc;
  export let docVersions: string[];
  export let setIndex: (i: number) => void;

  function openDoc(file: IDocFile) {
    ldvscode.postMessage({ command: "open-doc", value: file });
  }
</script>

<div class="doc">
  <header>
    <h1>Laravel</h1>
    {#if docVersions.length > 1}
      <select
        name="doc-select"
        on:change={(event) => {
          const i = parseInt(event.currentTarget.value);
          setIndex(i);
        }}
      >
        {#each docVersions as version, i}
          <option value={i}>{version}</option>
        {/each}
      </select>
    {:else}
      <span class="doc-version">
        {docVersions[0]}
      </span>
    {/if}
  </header>

  <div class="doc-topic">
    {#each doc.files as docFile}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
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
    font-size: 24px;
  }
  header select {
    color: #f9322c;
    background-color: transparent;
    padding: 0;
    font-size: 1.9rem;
    outline: none;
    border: none;
    padding: 0 5px;
  }
  header select option,
  .doc-version {
    color: #f9322c;
    background-color: inherit;
    padding: 0;
    font-size: 1.5rem;
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
</style>
