<script lang="ts">
  import type { IArmySchema, IBaseUnit } from '$types/Schema'
  import { getUnitBoundsString } from '$root/src/utils'
  import BuilderStore from '$builder/store'

  export let armySchema: IArmySchema
  const headers = ['Name', 'Type', 'Points', 'Min/Max']

  const addUnit = (unitData: IBaseUnit) => BuilderStore.addUnit(unitData)
</script>

<table class="w-1/3 divide-y divide-gray-200 text-center whitespace-nowrap">
  <thead class="bg-gray-100">
    <tr class="select-none">
      {#each headers as header}<th class="px-3">{ header }</th>{/each}
    </tr>
  </thead>
  <tbody>
    {#each armySchema.units as unit}
      <tr on:click={() => addUnit(unit)} class="px-3 hover:bg-gray-200 cursor-pointer select-none">
        <td>{ unit.name }</td>
        <td>{ unit.type }</td>
        <td>{ unit.points }</td>
        <td>{ getUnitBoundsString(unit) }</td>
      </tr>
    {/each}
  </tbody>
</table>