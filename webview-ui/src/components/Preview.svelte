<script lang="ts">
  import { onMount } from "svelte";
  import type { IDocContents } from "../types";

  let docFile: IDocContents;

  onMount(() => {
    window.addEventListener("message", (ev) => {
      docFile = ev.data.value;
    });
    ldvscode.postMessage({ command: "get-doc-path", value: "Get Doc Path!" });
  });

  $: fileContents = docFile?.contents;

  $: docHtml = fileContents || "<h1>Getting Docs...</h1>";
</script>

<main>
  <div class="documentation">
    {@html docHtml}
  </div>
</main>
