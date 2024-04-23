import type { IBaseUnit, IBuilderUnit } from '$types/Schema'
import type { Writable } from 'svelte/store'
import type { IBuilderState } from './store'

import * as Validator from './validator'

const removeUnitItems =
(state: IBuilderState, unit: IBuilderUnit): number => {
  const itemsCost = unit.equippedItems.reduce((sum, mi) => (state.validation.magicItems[mi.name]--, sum + mi.points), 0)
  const upgradeCost = unit.equippedUpgrades.reduce((sum, upg) => (state.validation.armyUpgrades[upg.name]--, sum + upg.points), 0)

  return itemsCost + upgradeCost
}

const createNewBuilderUnit =
(unitData: IBaseUnit, unitCount: number): IBuilderUnit => {
  return {
    ...unitData,
    count: unitCount,
    errors: [],
    equippedItems: [],
    equippedUpgrades: []
  }
}

export const addUnit =
(state: Writable<IBuilderState>, unit: IBaseUnit, count: number) => {
  state.update(s => {
    const unitIdx = s.units.findIndex(builderUnit => unit.id === builderUnit.id)
    const isNewUnit = unitIdx === -1
    
    let unitBuffer: IBuilderUnit
    
    if (isNewUnit) {
      unitBuffer = createNewBuilderUnit(unit, count)
      s.units.push(unitBuffer)
    } else {
      unitBuffer = s.units[unitIdx]
      unitBuffer.count += count
    }

    s.armyCost += unit.points * count
    Validator.validateUnit(unitBuffer)
    Validator.validateArmy(s)
    return s
  })
}

export const removeUnit =
(state: Writable<IBuilderState>, unit: IBaseUnit, count: number) => {
  state.update(s => {
    const unitIdx = s.units.findIndex(builderUnit => unit.id === builderUnit.id)
    const isDeleted = s.units[unitIdx].count - count <= 0

    if (isDeleted) {
      const deletedUnit = s.units.splice(unitIdx, 1)[0]
      const itemsPointsCount = removeUnitItems(s, deletedUnit)
      s.armyCost -= deletedUnit.count * deletedUnit.points + itemsPointsCount
    } else {
      const builderUnit = s.units[unitIdx]
      builderUnit.count -= count
      s.armyCost -= unit.points * count
      Validator.validateUnit(s.units[unitIdx])
    }

    Validator.validateArmy(s)
    return s
  })
}