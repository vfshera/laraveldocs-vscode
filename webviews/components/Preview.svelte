<script lang="ts">
  import { onMount } from "svelte";
  import type { IDocContents } from "../types";
  // import { marked } from "marked";

  let docFile: IDocContents;

  onMount(() => {
    window.addEventListener("message", (ev) => {
      docFile = ev.data.value;
    });
    ldvscode.postMessage({ command: "get-doc-path", value: "Get Doc Path!" });
  });

  $: fileContents = docFile?.contents;

  $: docHtml = fileContents || "<h1>Getting Docs...</h1>";
  // $: docHtml = DOMPurify.sanitize(
  //   marked(fileContents || "# Loading Docs...", {
  //     highlight: (code, lang) => {
  //       const language = highlightjs.getLanguage(lang) ? lang : "php";
  //       return highlightjs.highlight(code, { language }).value;
  //     },
  //   })
  // );
</script>

<main>
  <div class="documentation">
    {@html docHtml}
  </div>
</main>

<style>
  .documentation {
  }
</style>
