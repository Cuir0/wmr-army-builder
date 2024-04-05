<script lang="ts">
  import type { IFaction } from '$types/Schema'
  import { fetchJsonData } from '../utils'
  import FactionList from '$components/FactionList.svelte'
  
  const loadFactions = (): Promise<IFaction[]> =>
    fetchJsonData<IFaction[]>('/factions.json')
      .then(data => data)
      .catch((err) => { throw new Error(`Error loading faction list (${err})`) })
</script>

<div class="flex justify-center">
  <div class="grid grid-cols-3 gap-5">
    {#await loadFactions()}
      <p>Loading factions data...</p>
    {:then factions}
      <FactionList {factions} />
    {:catch error}
      <p>{ error.message }</p>
    {/await}
  </div>
</div>