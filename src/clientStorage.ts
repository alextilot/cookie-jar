export interface Item {
  key: string
  value: string
}

export type StorageType = 'cookie' | 'local' | 'session'
export const StorageTypeList = ['cookie', 'local', 'session'] as const

export type StorageAction = 'set' | 'get' | 'remove'
export const StorageActionList = ['set', 'get', 'remove'] as const

export interface StorageItem extends Item {
  type: StorageType
  action: StorageAction
}

interface ClientStorage {
  set(item: Item): void
  get(item: Item): string | null
  remove(item: Item): void
}

const Cookie: ClientStorage = {
  set(item: Item) {
    document.cookie = `${item.key}=${item.value};path=/`
  },
  get(item: Item): string | null {
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
    return null
  },
  remove(item: Item) {
    document.cookie = `${item.key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  },
}

const Local: ClientStorage = {
  set(item: Item) {
    localStorage.setItem(item.key, item.value)
  },
  get(item: Item): string | null {
    return localStorage.getItem(item.key)
  },
  remove(item: Item) {
    localStorage.removeItem(item.key)
  },
}

const Session: ClientStorage = {
  set(item: Item) {
    sessionStorage.setItem(item.key, item.value)
  },
  get(item: Item): string | null {
    return sessionStorage.getItem(item.key)
  },
  remove(item: Item) {
    sessionStorage.removeItem(item.key)
  },
}

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here")
}

function storageStrategy(item: StorageItem) {
  switch (item.type) {
    case 'cookie':
      return Cookie
    case 'local':
      return Local
    case 'session':
      return Session
  }
  return assertUnreachable(item.type)
}

export function action(item: StorageItem) {
  const storage = storageStrategy(item)
  switch (item.action) {
    case 'set':
      return storage.set(item)
    case 'get':
      return storage.get(item)
    case 'remove':
      return storage.remove(item)
  }
  return assertUnreachable(item.action)
}
