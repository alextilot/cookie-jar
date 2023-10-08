<script lang="ts">
  import FilterButton from '@components/FilterButton.svelte'
  import '../tailwind.css'

  const crx = 'create-chrome-ext'
  const value = 'chrome-local-storage'
  chrome.storage.local.set({ key: value }).then(() => {
    console.log('Value is set')
  })

  chrome.storage.local.get(['key']).then((result) => {
    console.log('Value currently is ' + result.key)
  })
  let name = 'world'
</script>

<main class="bg-slate-50">
  <h3 class="p-4">Popup Page!</h3>

  <h6>v 0.0.0</h6>
  <ul>
    <FilterButton />
  </ul>

  <a href="https://www.npmjs.com/package/create-chrome-ext" target="_blank">Power by {crx}</a>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(body) {
    min-width: 20rem;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h3 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 200;
    line-height: 1.2rem;
    margin: 2rem auto;
  }

  h6 {
    font-size: 0.5rem;
    color: #333333;
    margin: 0.5rem;
  }

  a {
    font-size: 0.5rem;
    margin: 0.5rem;
    color: #cccccc;
    text-decoration: none;
  }

  @media (min-width: 480px) {
    h3 {
      max-width: none;
    }
  }
</style>
