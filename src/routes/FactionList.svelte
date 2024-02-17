<script lang="ts">
  import type { IFaction } from '$types/Schema'
  import { fetchJsonData } from '../utils'
  import FactionItem from '$components/FactionItem.svelte'
  
  const factions: Promise<IFaction[]> = fetchJsonData(
    '/factions.json', 
    'Error loading faction list data...'
  )
</script>

<div class="flex justify-center">
  <div class="grid grid-cols-3 gap-5">
    {#await factions}
      <p>Loading factions data...</p>
    {:then factions}
      {#each factions as faction}
        <FactionItem {...faction} />
      {/each}
    {:catch error}
      <p>{ error.message }</p>
    {/await}
  </div>
</div>