<script lang="ts">
  import type { IFaction } from '$types/Schema'
  import { fetchJsonData } from '../utils'
  import BuilderStore from '../builder/store';
  import FactionItem from '$components/FactionItem.svelte'
  
  const loadFactions = async (): Promise<IFaction[]> => {
    try {
      return await fetchJsonData('/factions.json') as IFaction[]
    } catch (err) {
      throw new Error(`Error loading faction list (${ err })`)
    }
  }
</script>

<div class="flex justify-center">
  <div class="grid grid-cols-3 gap-5">
    {#await loadFactions()}
      <p>Loading factions data...</p>
    {:then factions}
      {#each factions as faction}
        <FactionItem selected={BuilderStore.getArmyName() === faction.name} {...faction} />
      {/each}
    {:catch error}
      <p>{ error.message }</p>
    {/await}
  </div>
</div>