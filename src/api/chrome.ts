export const KEY_APP_STORAGE = 'appStorage'
export const KEY_CONFIG = 'config'

export type ChromeRequestId = 'client-storage-command'

export interface ChromeRequest {
  id: ChromeRequestId
  data?: any
}

export async function getCurrentTab() {
  let queryOptions = { currentWindow: true, active: true }
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

export async function sendMessageActiveTab(message: ChromeRequest) {
  const tab = await getCurrentTab()
  if (!tab.id) return undefined
  const response = await chrome.tabs.sendMessage(tab.id!, message)
  return response
}

export async function sendBatchMessageActiveTab(messages: ChromeRequest[]) {
  const tab = await getCurrentTab()
  if (!tab.id) return undefined
  const responses = []
  for (const msg of messages) {
    responses.push(await chrome.tabs.sendMessage(tab.id!, msg))
  }
  return responses
}
