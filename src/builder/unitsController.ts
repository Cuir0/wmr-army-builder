import type { IBaseUnit, IBuilderUnit } from '$types/schema'
import type { Writable } from 'svelte/store'
import type { IBuilderState } from './store'

import * as Validator from './validator'

const removeUnitItems =
(state: IBuilderState, unit: IBuilderUnit): number => {
  const itemsCost = unit.equippedItems.reduce((sum, mi) => (state.validation.magicItems[mi.name]--, sum + mi.points), 0)
  const upgradeCost = unit.equippedUpgrades.reduce((sum, upg) => (state.validation.armyUpgrades[upg.name]--, sum + upg.pointsModify), 0)

  return itemsCost + upgradeCost
}

const createNewBuilderUnit =
(unitData: IBaseUnit, unitCount: number): IBuilderUnit => {
  return {
    ...unitData,
    count: unitCount,
    errors: [],
    equippedItems: [],
    equippedUpgrades: [],
    additionalStands: []
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

    const prevArmyCost = s.armyCost
    s.armyCost += unit.points * count

    Validator.validateUnit(unitBuffer, s.armyCost)
    Validator.validateArmy(s, prevArmyCost)
    return s
  })
}

export const removeUnit =
(state: Writable<IBuilderState>, unit: IBaseUnit, count: number) => {
  state.update(s => {
    const unitIdx = s.units.findIndex(builderUnit => unit.id === builderUnit.id)
    const isDeleted = s.units[unitIdx].count - count <= 0
    const prevArmyCost = s.armyCost

    if (isDeleted) {
      const deletedUnit = s.units.splice(unitIdx, 1)[0]
      const removedItemsCost = removeUnitItems(s, deletedUnit)
      s.armyCost -= deletedUnit.count * deletedUnit.points + removedItemsCost
    } else {
      const builderUnit = s.units[unitIdx]
      builderUnit.count -= count
      s.armyCost -= unit.points * count
      Validator.validateUnit(builderUnit, s.armyCost)
    }

    Validator.validateArmy(s, prevArmyCost)
    return s
  })
}

export const addStandToUnit =
(state: Writable<IBuilderState>, unit: IBaseUnit, stand: IBaseUnit) => {
  state.update(s => {
    const builderUnit = s.units.find(u => u.id === unit.id)
    if (!builderUnit) return s

    const unitStand = builderUnit.additionalStands.find(s => s.id === stand.id)
    const prevArmyCost = s.armyCost
    s.armyCost += stand.points

    if (unitStand) {
      unitStand.count += 1
    } else {
      builderUnit.additionalStands.push({ ...stand, count: 1 })
    }

    //Validator.validateUnit(builderUnit, s.armyCost)
    //Validator.validateArmy(s, prevArmyCost)
    return s
  })
}

export const removeStandFromUnit =
(state: Writable<IBuilderState>, unit: IBaseUnit, standIdx: number) => {
  state.update(s => {
    const builderUnit = s.units.find(u => u.id === unit.id)
    if (!builderUnit) return s

    const unitStand = builderUnit.additionalStands[standIdx]
    const isDeleted = unitStand.count - 1 <= 0

    const prevArmyCost = s.armyCost
    s.armyCost -= unitStand.points

    if (isDeleted) {
      builderUnit.additionalStands.splice(standIdx, 1)
    } else {
      unitStand.count -= 1
    }

    //Validator.validateUnit(builderUnit, s.armyCost)
    //Validator.validateArmy(s, prevArmyCost)
    return s
  })
}