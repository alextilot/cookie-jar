<script lang="ts">
  import { action } from '@/appStorage'
  import ItemInput from '@/components/ItemInput.svelte'

  function buildNestObj(obj: any, keys: string[], value: any) {
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
      data = buildNestObj(data, keys.split('.'), value)
    }
    console.log(data)
    for (const key of Object.keys(data)) {
      console.log(data[key])
      const item = {
        type: data[key].storage,
        action: data[key].action,
        key: data[key].key,
        value: data[key].value,
      }
      action(item)
    }
  }
</script>

<h2>Storage</h2>
<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-2">
  <ItemInput name={'1'} />
  <button class="rounded-lg px-2 text-center font-semibold uppercase bg-blue-400" type="submit"
    >Apply</button
  >
</form>
