<script lang="ts">
  import type { IBaseUnit, IBuilderUnit } from '$types/Schema'
  import BuilderStore from '$builder/store'

  let isPopoverVisible = false
  const togglePopover = () => isPopoverVisible = !isPopoverVisible

  export let unit: IBuilderUnit
  const removeUnit = (unitData: IBaseUnit) => BuilderStore.removeUnit(unitData)
</script>

<tr on:click={() => removeUnit(unit)} on:mouseenter={togglePopover} on:mouseleave={togglePopover}
  class="relative px-3 cursor-pointer select-none
  {unit.errors.length > 0 ? 'bg-rose-200  hover:bg-rose-300' : 'bg-slate-50 hover:bg-gray-200'}"
>
  <td>{ unit.count }</td>
  <td>{ unit.name }</td>
  <td>{ unit.type }</td>
  <td>{ unit.points * unit.count }</td>
  <td>{ unit.min || '-' }/{ unit.max || '-' }</td>
  {#if isPopoverVisible && unit.errors.length > 0}
    <div class="absolute rounded px-2 py-1 bg-rose-400 z-50 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {#each unit.errors as error}<div>{ error }</div>{/each}
    </div>
  {/if}
</tr>