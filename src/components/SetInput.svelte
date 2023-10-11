<script lang="ts">
  interface Option {
    id: number
    text: string
  }
  let options: Option[] = [
    {
      id: 1,
      text: `Cookie`,
    },
    {
      id: 2,
      text: `Local`,
    },
    {
      id: 3,
      text: `Session`,
    },
  ]

  let storageType: Option | null

  let storageKey = ''
  let storageValue = ''

  function handleSubmit() {
    alert(`answered question ${storageType?.id} (${storageType?.text}) with "${storageKey}"`)
  }
</script>

<h2>Storage</h2>
<div class="flex w-full">
  <form on:submit|preventDefault={handleSubmit}>
    <select bind:value={storageType}>
      {#each options as option}
        <option value={option}>
          {option.text}
        </option>
      {/each}
    </select>

    <input bind:value={storageKey} />
    <input bind:value={storageValue} />
    <button class="rounded-lg px-2 text-center font-semibold uppercase bg-blue-400" type="submit"
      >Save</button
    >
  </form>
</div>
