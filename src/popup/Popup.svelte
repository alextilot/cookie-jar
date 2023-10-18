<script lang="ts">
  import Form from '@/components/Form.svelte'
  import '../tailwind.css'
  // ;(async function () {
  //   console.log('Query for local storage')
  //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  //   if (!tab.id) return
  //   // Execute script in the current tab
  //   const fromPageLocalStore = await chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     func: () => {
  //       return JSON.stringify(localStorage)
  //     },
  //   })
  //   console.log({ tab, fromPageLocalStore })
  //   const localStorageItems = JSON.parse(fromPageLocalStore[0].result)
  //   console.log('localStorage', localStorageItems)
  // })()

  const crx = 'create-chrome-ext'
  const value = 'chrome-local-storage'
  chrome.storage.local.set({ key: value }).then(() => {
    console.log('Value is set')
  })

  chrome.storage.local.get(['key']).then((result) => {
    console.log('Value currently is ' + result.key)
  })
</script>

<main class="bg-slate-400">
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
