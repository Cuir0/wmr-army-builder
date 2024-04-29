<script lang="ts">
  import type { IBuilderUnit } from '$types/schema'
  import BuilderStore from '$builder/store'

  export let unit: IBuilderUnit
</script>

{#each unit.equippedItems as equippedItem, idx}
  <div class="flex flex-row-reverse gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.unequipItem(unit, idx)}
  >
    <div>{ equippedItem.name }</div>
    <div>{ equippedItem.type }</div>
    <div>{ equippedItem.points }</div>
  </div>
{/each}

{#each unit.equippedUpgrades as equippedUpgrades, idx}
  <div class="flex flex-row-reverse gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.unequipUpgrade(unit, idx)}
  >
    <div>{ equippedUpgrades.name }</div>
    <div>{ equippedUpgrades.type }</div>
    <div>{ equippedUpgrades.pointsModify }</div>
  </div>
{/each}