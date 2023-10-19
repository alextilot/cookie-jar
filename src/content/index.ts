console.info('chrome-ext template-svelte-ts content script')
import { action } from '@/clientStorage'
import { ChromeRequest } from '@/chromeAPI'

chrome.runtime.onMessage.addListener((request: ChromeRequest, sender, sendResponse) => {
  if (request.id === 'storage-action') {
    sendResponse(action(request.data))
  }
})

export {}
