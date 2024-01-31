<script lang="ts">
  import { fetchJsonData } from "../core/utils"
  const fetchFactionList = async (): Promise<IFaction[]> => {
    const response = await fetchJsonData('/factions.json')

    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Error loading factions data...')
    }
  }

  const factions: Promise<IFaction[]> = fetchFactionList()
</script>

<div class="flex justify-center">
  <div class="grid grid-cols-3 gap-5">
    {#await factions}
      <p>Loading factions data...</p>
    {:then factions}
      {#each factions as faction}
        <div class="px-6 py-3 text-md font-semibold 
          text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-700 
          cursor-pointer select-none"
        >
          { faction.name }
        </div>
      {/each}
    {:catch error}
      <p>{ error.message }</p>
    {/await}
  </div>
</div>