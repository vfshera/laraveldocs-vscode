<script lang="ts">
  import { onMount } from "svelte";
  import type { IDoc } from "../types";
  import Doc from "./Doc.svelte";
  let docs: IDoc[] = [];

  onMount(() => {
    window.addEventListener("message", (ev) => {
      docs = ev.data.value;
    });
    ldvscode.postMessage({ command: "docs-list", value: "Sidebar Ready!" });
  });
</script>

<main>
  {#each docs as doc}
    <Doc {doc} />
  {/each}
</main>

<style>
</style>
