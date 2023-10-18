console.info('chrome-ext template-svelte-ts content script')
import { action } from '@/appStorage'
import { Request } from '@/chromeAPI'

chrome.runtime.onMessage.addListener((request: Request, sender, sendResponse) => {
  if (request.id === 'storage-action') {
    sendResponse(action(request.data))
  }
})

export {}
