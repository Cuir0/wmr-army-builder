<script lang="ts">
  import type { IArmySchema } from '$types/Schema'
  import { Link } from 'svelte-routing'
  import { fetchJsonData } from '../utils'
  import BuilderStore from '$builder/store'

  import SchemaList from '$root/src/components/SchemaList.svelte'
  import BuilderList from '$root/src/components/BuilderList.svelte'
  import BuilderInfo from '$root/src/components/BuilderInfo.svelte'

  export let factionFile: string

  const loadArmySchema = async (): Promise<IArmySchema> => {
    try {
      const armySchema: IArmySchema = await fetchJsonData(`armies/${ factionFile }.json`)

      if (BuilderStore.getState().armyName !== armySchema.name) {
        BuilderStore.initNewArmy(armySchema)
      }

      return armySchema
    } catch (err) {
      throw new Error(`Error loading ${ factionFile } army data (${ err })`)
    }
  }
</script>


{#await loadArmySchema()}
  <p>Loading army data...</p>
{:then armyData}
  <section class="flex justify-evenly items-start">
    <SchemaList armySchema={armyData} />
    <BuilderInfo armyName={armyData.name} />
    <BuilderList />
  </section>
{:catch error}
  <Link to="/">Return to homepage</Link>
  <p>{ error.message }</p>
{/await}