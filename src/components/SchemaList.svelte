<script lang="ts">
  import type { IArmySchema, IBaseUnit } from '$types/Schema'
  import { getUnitBoundsString } from '$root/src/utils'
  import BuilderStore from '$builder/store'

  export let armySchema: IArmySchema

  const addUnit = (unitData: IBaseUnit) => BuilderStore.addUnit(unitData)
</script>

<div class="w-1/3 divide-y bg-gray-100 divide-gray-200 text-center select-none">
  <div class="flex font-semibold">
    <div class="w-1/4">Name</div>
    <div class="w-1/4">Type</div>
    <div class="w-1/4">Points</div>
    <div class="w-1/4">Min/Max</div>
  </div>
  {#each armySchema.units as unit}
    <div on:click={() => addUnit(unit)} class="flex hover:bg-gray-200 cursor-pointer">
      <div class="w-1/4">{ unit.name }</div>
      <div class="w-1/4">{ unit.type }</div>
      <div class="w-1/4">{ unit.points }</div>
      <div class="w-1/4">{ getUnitBoundsString(unit) }</div>
    </div>
  {/each}
</div>