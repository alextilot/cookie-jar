console.info('chrome-ext template-svelte-ts content script')
import { action } from '@/appStorage'
export {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  if (request === 'storage-item') {
  }
  sendResponse(user)
})

chrome.runtime.sendMessage('storage-item', (response) => {
  // 3. Got an asynchronous response with the data from the service worker
  console.log('received user data', response)
  initializeUI(response)
})
