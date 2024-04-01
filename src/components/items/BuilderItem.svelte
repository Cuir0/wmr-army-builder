<script lang="ts">
  import type { IBaseUnit, IBuilderUnit, IMagicItem } from '$types/Schema'
  import { getItemCostForUnit, getUnitBoundsString } from '$root/src/utils'
  import BuilderStore from '$builder/store'

  let isErrorListVisible = false
  const toggleErrorList = () => isErrorListVisible = !isErrorListVisible

  let isItemListVisible = false
  const toggleItemList = (ev: MouseEvent) => {
    ev.preventDefault()
    isItemListVisible = !isItemListVisible
  }

  const getUnitEquipableItems =
    (magicItems: IMagicItem[], unit: IBaseUnit): IMagicItem[] => magicItems.filter(mi => mi.allowedUnits.includes(unit.type))

  export let unit: IBuilderUnit
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
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
  {#if isErrorListVisible && unit.errors.length > 0}
    <div class="absolute rounded px-2 py-1 bg-rose-400 z-50 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {#each unit.errors as error}<div>{ error }</div>{/each}
    </div>
  {/if}
</div>

{#each unit.equippedItems as equippedItem, idx}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="flex flex-row-reverse gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.unequipItem(unit, idx)}
  >
    <div>{ equippedItem.name }</div>
    <div>{ equippedItem.type }</div>
    <div>{ equippedItem.points }</div>
  </div>
{/each}

{#if isItemListVisible}
  {#each getUnitEquipableItems($BuilderStore.magicItems, unit) as item}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex gap-x-4 select-none cursor-pointer hover:bg-gray-200"
         on:click={() => BuilderStore.equipItem(unit, item)}
    >
      <div>{ item.name }</div>
      <div>{ item.type }</div>
      <div>{ getItemCostForUnit(unit, item) }</div>
    </div>
  {/each}
{/if}