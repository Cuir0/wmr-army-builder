<script lang="ts">
  import type { IBuilderUnit } from '$types/Schema'
  import { getUnitBoundsString } from '$root/src/utils'
  import BuilderStore from '$builder/store'
  
  import UnitErrors from './UnitErrors.svelte';
  import SchemaItems from './SchemaItems.svelte';
  import UnitEquipment from './UnitEquipment.svelte';

  // Display unit error list on hover
  let isErrorListVisible = false
  const toggleErrorList = () => isErrorListVisible = !isErrorListVisible

  // Display schema magicItems/upgrades list
  let isItemListVisible = false
  const toggleItemList = (ev: MouseEvent) => {
    ev.preventDefault()
    isItemListVisible = !isItemListVisible
  }

  export let unit: IBuilderUnit
</script>

<div
  on:click={() => BuilderStore.removeUnit(unit)} 
  on:mouseenter={toggleErrorList} 
  on:mouseleave={toggleErrorList}
  on:contextmenu={toggleItemList}
  class="relative cursor-pointer select-none w-100 flex
    {unit.errors.length > 0 ? 'bg-rose-200  hover:bg-rose-300' : 'bg-slate-50 hover:bg-gray-200'}"
>
  <div class="w-1/5">{ unit.count }</div>
  <div class="w-1/5">{ unit.name }</div>
  <div class="w-1/5">{ unit.type }</div>
  <div class="w-1/5">{ unit.points * unit.count }</div>
  <div class="w-1/5">{ getUnitBoundsString(unit) }</div>
  <UnitErrors {isErrorListVisible} {unit} />
</div>

<UnitEquipment {unit} />

{#if isItemListVisible}
  <SchemaItems {unit} />
{/if}