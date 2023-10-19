console.info('chrome-ext template-svelte-ts background script')
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${JSON.stringify(oldValue, null, 2)}", new value is "${JSON.stringify(
        newValue,
        null,
        2,
      )}".`,
    )
  }
})
export {}
