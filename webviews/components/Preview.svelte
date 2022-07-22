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

  marked.setOptions({
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : "php";
      return hljs.highlight(code, { language }).value;
    },
  });

  $: fileContents = docFile?.contents;
  $: docHtml = DOMPurify.sanitize(
    marked.parse(fileContents || "# Loading Docs...")
  );
</script>

<main>
  <div class="documentation">
    {@html docHtml}
  </div>
</main>

<style>
</style>
