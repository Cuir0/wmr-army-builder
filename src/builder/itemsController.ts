import type { IBaseUnit, IBuilderMagicItem, IMagicItem, IUpgrade } from '$types/schema'
import type { Writable } from 'svelte/store'
import type { IBuilderState } from './store'
import { getItemCostForUnit } from '../utils'

import * as Validator from './validator'

export const equipItem =
(state: Writable<IBuilderState>, unit: IBaseUnit, itemData: IMagicItem) => {
  state.update(s => {
    const builderUnit = s.units.find(u => u.id === unit.id)
    if (!builderUnit) return s

    const newItem: IBuilderMagicItem = { 
      ...itemData,
      points: getItemCostForUnit(unit, itemData) 
    }

    builderUnit.equippedItems.push(newItem)
    s.armyCost += newItem.points

    s.validation.magicItems[newItem.name]++
    Validator.validateUnit(builderUnit)
    Validator.validateArmy(s)
    return s
  })
}

export const unequipItem =
(state: Writable<IBuilderState>, unit: IBaseUnit, itemIdx: number) => {
  state.update(s => {
    const builderUnit = s.units.find(u => u.id === unit.id)
    if (!builderUnit) return s

    const removedItem = builderUnit.equippedItems.splice(itemIdx, 1)[0]
    s.armyCost -= removedItem.points

    s.validation.magicItems[removedItem.name]--
    Validator.validateUnit(builderUnit)
    Validator.validateArmy(s)
    return s
  })
}

export const equipUpgrade =
(state: Writable<IBuilderState>, unit: IBaseUnit, upgrade: IUpgrade) => {
  state.update(s => {
    const builderUnit = s.units.find(u => u.id === unit.id)
    if (!builderUnit) return s

    builderUnit.equippedUpgrades.push(upgrade)
    s.armyCost += upgrade.pointsModify

    if (upgrade.armyMax) {
      s.validation.armyUpgrades[upgrade.name]++
    }

    Validator.validateUnit(builderUnit)
    Validator.validateArmy(s)
    return s
  })
}

export const unequipUpgrade =
(state: Writable<IBuilderState>, unit: IBaseUnit, upgradeIdx: number) => {
  state.update(s => {
    const builderUnit = s.units.find(u => u.id === unit.id)
    if (!builderUnit) return s

    const removedUpgrade = builderUnit.equippedUpgrades.splice(upgradeIdx, 1)[0]
    s.armyCost -= removedUpgrade.pointsModify

    if (removedUpgrade.armyMax) {
      s.validation.armyUpgrades[removedUpgrade.name]--
    }

    Validator.validateUnit(builderUnit)
    Validator.validateArmy(s)
    return s
  })
}