export interface ChromeRequest {
  id: string
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
  console.log(tab)
  // if (!tab.id) return
  const response = await chrome.tabs.sendMessage(tab.id!, message)
  return response
}
