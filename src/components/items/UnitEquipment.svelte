<script lang="ts">
  import type { IBuilderUnit } from '$types/schema'
  import BuilderStore from '$builder/store'

  export let unit: IBuilderUnit
</script>

{#each unit.additionalStands as addedStand, idx}
  <div class="flex flex-row-reverse gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.removeStandFromUnit(unit, idx)}
  >
    <div>{ addedStand.count }</div>
    <div>{ addedStand.name }</div>
    <div>{ addedStand.type }</div>
    <div>{ addedStand.points }</div>
  </div>
{/each}

{#each unit.equippedItems as equippedItem, idx}
  <div class="flex flex-row-reverse gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.unequipItem(unit, idx)}
  >
    <div>{ equippedItem.name }</div>
    <div>{ equippedItem.type }</div>
    <div>{ equippedItem.points }</div>
  </div>
{/each}

{#each unit.equippedUpgrades as equippedUpgrade, idx}
  <div class="flex flex-row-reverse gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.unequipUpgrade(unit, idx)}
  >
    <div>{ equippedUpgrade.name }</div>
    <div>{ equippedUpgrade.type }</div>
    <div>{ equippedUpgrade.pointsModify }</div>
  </div>
{/each}