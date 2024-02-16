<script lang="ts">
  import type { IArmySchema } from '$types/Army'
  import { Link } from 'svelte-routing'
  import { fetchJsonData } from '../utils'
  import ArmySchemaList from '$components/ArmySchemaList.svelte'
  import ArmyBuilderList from '$components/ArmyBuilderList.svelte'

  export let factionFile: string

  const fetchArmy = async (armyName: string): Promise<IArmySchema> => {
    const response = await fetchJsonData(`armies/${armyName}.json`)

    if (response.ok) return response.json()
    throw new Error(`Error loading ${ armyName } army data...`)
  }

  const army: Promise<IArmySchema> = fetchArmy(factionFile)
</script>

<div>
  <Link to="/">Go back</Link>
  {#await army}
    <p>Loading army data...</p>
  {:then armyData}
    <div class="font-bold">{ armyData.name }</div>
    <section class="flex justify-evenly items-start">
      <ArmySchemaList armySchema={armyData} />
      <ArmyBuilderList />
    </section>
  {:catch error}
    <p>{ error.message }</p>
  {/await}
</div>