<script lang="ts">
  import type { IBaseUnit, IMagicItem, IUpgrade } from '$types/schema'
  import { getUnitBoundsString } from '$root/src/utils'
  import { getItemCostForUnit } from '$root/src/utils'
  import BuilderStore from '$builder/store'

  const getUnitEquipableItems = (unit: IBaseUnit, magicItems: Readonly<IMagicItem[]>): IMagicItem[] => 
    magicItems.filter(mi => mi.allowedUnits.includes(unit.type) || unit.magicItemRef?.includes(mi.id))

  const getUnitUpgrades = (unit: IBaseUnit, upgrades?: Readonly<IUpgrade[]>): IUpgrade[] => 
    upgrades?.filter(upg => unit.upgradeRef?.includes(upg.id)) ?? []

  const getUnitStands = (unit: IBaseUnit, unitStands?: Readonly<IBaseUnit[]>) =>
    unitStands?.filter(aug => unit.standsRef?.includes(aug.id)) ?? []

  export let unit: IBaseUnit
</script>

{#each getUnitStands(unit, $BuilderStore.lookup.stands) as stand}
  <div class="flex gap-x-4 select-none cursor-pointer hover:bg-gray-200"
  on:click={() => BuilderStore.addStandToUnit(unit, stand)}
  >
    <div>{ stand.name }</div>
    <div>{ stand.type }</div>
    <div>{ stand.points }</div>
    <div>{ getUnitBoundsString(stand) }</div>
  </div>
{/each}

{#each getUnitEquipableItems(unit, $BuilderStore.lookup.magicItems) as item}
  <div class="flex gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.equipItem(unit, item)}
  >
    <div>{ item.name }</div>
    <div>{ item.type }</div>
    <div>{ getItemCostForUnit(unit, item) }</div>
  </div>
{/each}

{#each getUnitUpgrades(unit, $BuilderStore.lookup.upgrades) as upgrade}
  <div class="flex gap-x-4 select-none cursor-pointer hover:bg-gray-200"
       on:click={() => BuilderStore.equipUpgrade(unit, upgrade)}
  >
    <div>{ upgrade.name }</div>
    <div>{ upgrade.type }</div>
    <div>{ upgrade.pointsModify }</div>
  </div>
{/each}