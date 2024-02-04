<script lang="ts">
  import type { IFaction } from '$types/Faction'
  import { fetchJsonData } from '../core/utils'
  import FactionItem from '$components/FactionItem.svelte'

  const fetchFactionList = async (): Promise<IFaction[]> => {
    const response = await fetchJsonData('/factions.json')

    if (response.ok) return response.json()
    throw new Error('Error loading factions data...')
  }

  const factions: Promise<IFaction[]> = fetchFactionList()
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