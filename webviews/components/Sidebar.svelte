<script lang="ts">
  import { onMount } from "svelte";
  import type { IDoc } from "../types";
  import Doc from "./Doc.svelte";
  let docs: IDoc[] = [];

  onMount(() => {
    window.addEventListener("message", (ev) => {
      docs = ev.data.value.reverse();
    });
    ldvscode.postMessage({ command: "docs-list", value: "Sidebar Ready!" });
  });
  let docIndex: number = 0;

  function setIndex(index) {
    docIndex = index;
  }
  $: docVersions = docs?.map((d) => d.version);
  $: doc = docs.find((d) => d.version === docVersions[docIndex]) || {
    version: "",
    files: [],
  };
</script>

<main>
  {#if typeof doc === "object"}
    <Doc {doc} {docVersions} {setIndex} />
  {/if}
</main>

<style>
</style>
