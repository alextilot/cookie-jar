<script lang="ts">
  import '../style/tailwind.css'
  import Form from '@/components/Form.svelte'
  import { KEY_CONFIG } from '@/api/chrome'

  let isActive = false

  chrome.storage.local.get([KEY_CONFIG]).then((result) => {
    isActive = result[KEY_CONFIG]?.isActive
  })

  function handleToggle() {
    isActive = !isActive
    chrome.storage.local.get([KEY_CONFIG]).then((result) => {
      const data = { ...result[KEY_CONFIG], isActive: isActive }
      chrome.storage.local.set({ [KEY_CONFIG]: data })
    })
  }
</script>

<main class="bg-slate-400">
  <button
    class={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
    on:click={() => handleToggle()}
  >
    {#if isActive}
      On
    {:else}
      Off
    {/if}
  </button>
  <Form />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(body) {
    min-width: 40rem;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
