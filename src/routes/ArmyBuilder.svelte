<script lang="ts">
  import type { IArmySchema } from '$root/src/types/Schema'
  import { Link } from 'svelte-routing'
  import { fetchJsonData } from '../utils'

  import ArmySchemaList from '$components/ArmySchemaList.svelte'
  import ArmyBuilderList from '$components/ArmyBuilderList.svelte'
  import BuilderStore from '../builder/store';

  export let factionFile: string

  const loadArmySchema = async (): Promise<IArmySchema> => {
    try {
      const armySchema: IArmySchema = await fetchJsonData(`armies/${ factionFile }.json`)

      if (BuilderStore.getArmyName() !== armySchema.name) {
        BuilderStore.initNewArmy(armySchema.name)
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
    <ArmySchemaList armySchema={armyData} />
    <div class="text-center font-semibold">
      <Link to="/">Return to homepage</Link>
      <div>{ armyData.name }</div>
      <div>Army points: { $BuilderStore.armyCost }/{ $BuilderStore.armyCostLimit }</div>
    </div>
    <ArmyBuilderList />
  </section>
{:catch error}
  <Link to="/">Return to homepage</Link>
  <p>{ error.message }</p>
{/await}