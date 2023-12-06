<script lang="ts">
  import { StorageAction, StorageActionList, StorageType, StorageTypeList } from '@/clientStorage'
  export let name: string

  export let apply = false
  export let action: StorageAction | null = 'set'
  export let storage: StorageType | null = 'cookie'
  export let key = ''
  export let value = ''
</script>

<div class="flex w-full gap-1">
  <input name={`${name}.apply`} type="checkbox" bind:checked={apply} />
  <select name={`${name}.action`} bind:value={action}>
    {#each StorageActionList as opt}
      <option value={opt}>
        {opt}
      </option>
    {/each}
  </select>
  <select name={`${name}.storage`} bind:value={storage}>
    {#each StorageTypeList as opt}
      <option value={opt}>
        {opt}
      </option>
    {/each}
  </select>
  <input name={`${name}.key`} type="text" bind:value={key} />
  <input name={`${name}.value`} type="text" bind:value />
</div>
