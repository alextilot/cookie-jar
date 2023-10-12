<script lang="ts">
  interface Option {
    id: number
    text: string
  }
  const storages: Option[] = [
    {
      id: 1,
      text: 'cookie',
    },
    {
      id: 2,
      text: 'local',
    },
    {
      id: 3,
      text: 'session',
    },
  ]
  const actions: Option[] = [
    {
      id: 1,
      text: 'get',
    },
    {
      id: 2,
      text: 'set',
    },
    {
      id: 3,
      text: 'remove',
    },
  ]
  export let name: string

  let storage: string | null
  let action: string | null

  let key = ''
  let value = ''
</script>

<div class="flex w-full gap-1">
  <select name={`${name}.action`} bind:value={action}>
    {#each actions as opt}
      <option value={opt.text}>
        {opt.text}
      </option>
    {/each}
  </select>
  <select name={`${name}.storage`} bind:value={storage}>
    {#each storages as opt}
      <option value={opt.text}>
        {opt.text}
      </option>
    {/each}
  </select>
  <input name={`${name}.key`} type="text" bind:value={key} />
  <input name={`${name}.value`} type="text" bind:value />
</div>
