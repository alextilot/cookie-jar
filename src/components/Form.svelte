<script lang="ts">
  import ItemInput from '@/components/ItemInput.svelte'

  function build(obj: any, keys: string[], value: any) {
    console.log({ obj, keys, value })
    const next = keys.shift() as string
    //need to check if prop exists! duh
    if (keys.length === 0) {
      obj[next] = value
      return obj
    }

    if (keys.length === 1) {
      obj[next] = { [keys[0]]: value }
      return obj
    }

    obj[next] = {}

    return build(obj.next, keys, value)
  }
  function handleSubmit(e: any) {
    const formData = new FormData(e.target)

    const data: any = {}
    for (const field of formData) {
      const [keys, value] = field
      build(data, keys.split('.'), value)
    }
    console.log(data)
  }
</script>

<h2>Storage</h2>
<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-2">
  <ItemInput name={'1'} />
  <button class="rounded-lg px-2 text-center font-semibold uppercase bg-blue-400" type="submit"
    >Apply</button
  >
</form>
