export type TargetStorage = string
export interface StorageItem {
  type: 'cookie' | 'local' | 'session'
  action: 'set' | 'get' | 'remove'
  key: string
  value: string
}
export function CookieSet(item: StorageItem) {
  document.cookie = `${item.key}=${item.value};path=/`
}
export function CookieGet(item: StorageItem): string | undefined {
  const name = item.key + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return undefined
}

export function CookieRemove(item: StorageItem) {
  document.cookie = `${item.key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
