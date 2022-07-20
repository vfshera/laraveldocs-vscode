<script lang="ts">
  import { onMount } from "svelte";
  import type { IDocFile } from "../types";

  let docFile: IDocFile;

  onMount(() => {
    window.addEventListener("message", (ev) => {
      docFile = ev.data.value;
    });
    ldvscode.postMessage({ command: "get-doc-path", value: "Get Doc Path!" });
  });

  $: docHtml = marked.parse(
    "# Marked in the browser\n\nRendered by **marked**."
  );
</script>

<main>
  <div class="documentation">
    {@html docHtml}
  </div>
</main>

<style>
</style>
