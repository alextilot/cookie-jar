console.info('chrome-ext template-svelte-ts content script')
import { handleRequest } from '@/clientStorage'
import { ChromeRequest } from '@/api/chrome'

chrome.runtime.onMessage.addListener((request: ChromeRequest, sender, sendResponse) => {
  if (request.id === 'client-storage-command') {
    const response = handleRequest(request.data)
    console.log('Client Storage', { response })
    sendResponse(response)
  }
})

export {}
