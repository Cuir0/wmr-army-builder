<script lang="ts">
  import type { IArmySchema } from '$root/src/types/Schema'
  import { Link } from 'svelte-routing'
  import { fetchJsonData } from '../utils'

  import ArmySchemaList from '$components/ArmySchemaList.svelte'
  import ArmyBuilderList from '$components/ArmyBuilderList.svelte'

  export let factionFile: string

  const army: Promise<IArmySchema> = fetchJsonData(
    `armies/${ factionFile }.json`, 
    `Error loading ${ factionFile } army data...`
  )
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