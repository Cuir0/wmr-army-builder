<script lang="ts">
  import type { IArmySchema } from '../types/Army';
  import { Link } from 'svelte-routing'
  import { fetchJsonData } from '../utils'
  import ArmySchema from '../components/ArmySchema.svelte';

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
    <ArmySchema armySchema={armyData} />
  {:catch error}
    <p>{ error.message }</p>
  {/await}
</div>