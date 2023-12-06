import { ChromeRequest, KEY_APP_STORAGE, KEY_CONFIG, sendBatchMessageActiveTab } from '@/api/chrome'
import { ICON_COOKIE_JAR_EMPTY, ICON_COOKIE_JAR_FULL } from '@/config/settings'

console.info('chrome-ext template-svelte-ts background script')

function setIcon(on: boolean) {
  const data = on ? ICON_COOKIE_JAR_FULL : ICON_COOKIE_JAR_EMPTY
  chrome.action.setIcon({ path: data })
}

function setAppStorage(data: any) {
  const requests = Object.keys(data).map(
    (key) =>
      ({
        id: 'client-storage-command',
        data: data[key],
      } as ChromeRequest),
  )
  sendBatchMessageActiveTab(requests).then((data) => console.log(data))
}

//Initialize Application state from local storage.
function syncState() {
  console.log('syncState')
  chrome.storage.local.get([KEY_APP_STORAGE, KEY_CONFIG]).then((result) => {
    const { isActive } = result[KEY_CONFIG]
    setIcon(isActive)

    const appStorage = result[KEY_APP_STORAGE]
    setAppStorage(appStorage)
  })
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  syncState()
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

chrome.tabs.onUpdated.addListener(function (tabId, info) {
  if (info.status === 'complete' || info.status === 'loading') {
    console.log('info.status -', info.status)
    syncState()
  }
})

syncState()
export {}
