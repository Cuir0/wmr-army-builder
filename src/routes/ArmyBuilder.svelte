<script lang="ts">
  import type { IArmySchema } from '../types/Army';
  import { Link } from 'svelte-routing'
  import { fetchJsonData } from '../core/utils'

  const fetchArmy = async (armyName: string): Promise<IArmySchema> => {
    const response = await fetchJsonData(`armies/${armyName}.json`)

    if (response.ok) return response.json()
    throw new Error(`Error loading ${ armyName } army data...`)
  }

  export let factionFile: string
  const army: Promise<IArmySchema> = fetchArmy(factionFile)
</script>

<div class="grid justify-items-center">
  <Link to="/">Go back</Link>
  {#await army}
    <p>Loading army data...</p>
  {:then armyData}
    <div class="font-bold">{ armyData.name }</div>
    {#each armyData.units as unit}
      <div>{ unit.name }</div>
    {/each}
  {:catch error}
    <p>{ error.message }</p>
  {/await}
</div>