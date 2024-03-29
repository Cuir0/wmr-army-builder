<script lang="ts">
  import type { IBaseUnit, IBuilderUnit } from '$types/Schema'
  import { getUnitBoundsString } from '$root/src/utils'
  import BuilderStore from '$builder/store'

  let isPopoverVisible = false
  const togglePopover = () => isPopoverVisible = !isPopoverVisible

  export let unit: IBuilderUnit
  const removeUnit = (unitData: IBaseUnit) => BuilderStore.removeUnit(unitData)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click={() => removeUnit(unit)} 
  on:mouseenter={togglePopover} 
  on:mouseleave={togglePopover}
  class="relative cursor-pointer select-none w-100 flex
    {unit.errors.length > 0 ? 'bg-rose-200  hover:bg-rose-300' : 'bg-slate-50 hover:bg-gray-200'}"
>
  <div class="w-1/5">{ unit.count }</div>
  <div class="w-1/5">{ unit.name }</div>
  <div class="w-1/5">{ unit.type }</div>
  <div class="w-1/5">{ unit.points * unit.count }</div>
  <div class="w-1/5">{ getUnitBoundsString(unit) }</div>
  {#if isPopoverVisible && unit.errors.length > 0}
    <div class="absolute rounded px-2 py-1 bg-rose-400 z-50 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {#each unit.errors as error}<div>{ error }</div>{/each}
    </div>
  {/if}
</div>