<script lang="ts">
  import type { IDoc } from "../types";
  export let doc: IDoc;
</script>

<div class="doc">
  <h1>Laravel {doc.version}</h1>
  <hr />
  <ul>
    {#each doc.files as file}
      <li class="doc-type">
        <span>#</span>
        {file.title}
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
