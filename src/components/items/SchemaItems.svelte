<script lang="ts">
  import type { IBaseUnit, IMagicItem, IUpgrade } from '$types/schema'
  import { getItemCostForUnit } from '$root/src/utils'
  import BuilderStore from '$builder/store'

  const getUnitEquipableItems = (magicItems: Readonly<IMagicItem[]>, unit: IBaseUnit): IMagicItem[] => 
    magicItems.filter(mi => mi.allowedUnits.includes(unit.type) || unit.magicItemRef?.includes(mi.id))

  const getUnitUpgrades = (upgrades: Readonly<IUpgrade[]>, unit: IBaseUnit): IUpgrade[] => 
    upgrades.filter(upg => unit.upgradeRef?.includes(upg.id))

  export let unit: IBaseUnit
</script>

{#each getUnitEquipableItems($BuilderStore.lookup.magicItems, unit) as item}
  <div class="flex gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.equipItem(unit, item)}
  >
    <div>{ item.name }</div>
    <div>{ item.type }</div>
    <div>{ getItemCostForUnit(unit, item) }</div>
  </div>
{/each}

{#each getUnitUpgrades($BuilderStore.lookup.upgrades, unit) as upgrade}
  <div class="flex gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.equipUpgrade(unit, upgrade)}
  >
    <div>{ upgrade.name }</div>
    <div>{ upgrade.type }</div>
    <div>{ upgrade.pointsModify }</div>
  </div>
{/each}