<script lang="ts">
  import ItemInput from '@/components/ItemInput.svelte'
  import { KEY_APP_STORAGE } from '@/api/chrome'

  let fields: any[] = []

  function updateFields(obj: any) {
    fields = Object.keys(obj).map((key) => obj[key])
  }

  chrome.storage.local.get([KEY_APP_STORAGE]).then((result) => {
    const obj = result[KEY_APP_STORAGE]
    updateFields(obj)
  })

  function buildObject(obj: any, keys: string[], value: any) {
    let pointer = obj
    let i = 0
    for (; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!(key in pointer)) {
        pointer[key] = {}
      }
      pointer = pointer[key]
    }
    pointer[keys[i]] = value
    return obj
  }

  function handleSubmit(e: any) {
    const formData = new FormData(e.target)
    let data: any = {}
    for (const field of formData) {
      const [keys, value] = field
      data = buildObject(data, keys.split('.'), value)
    }
    //Remove empty keys
    for (const key of Object.keys(data)) {
      if (!data[key].key) {
        delete data[key]
      }
    }
    chrome.storage.local.set({ [KEY_APP_STORAGE]: data })
    updateFields(data)
  }
</script>

<h2>Storage</h2>
<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-2">
  {#key fields}
    {#each fields as entry, index}
      <ItemInput
        name={index.toString()}
        apply={entry.apply}
        action={entry.action}
        storage={entry.storage}
        key={entry.key}
        value={entry.value}
      />
    {/each}
    <ItemInput name={fields.length.toString()} />
  {/key}
  <button class="btn btn-primary" type="submit">Save</button>
</form>
