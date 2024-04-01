import type { Writable } from 'svelte/store'
import type { IArmySchema, IBaseUnit, IBuilderUnit, IMagicItem } from '$types/Schema'
import type { IBuilderState } from './store'

import * as Validator from './validator'

const setRequiredUnits = 
(state: Writable<IBuilderState>, armySchema: IArmySchema) => {
  armySchema.units.forEach(schemaUnit => {
    if (schemaUnit.min) {
      addUnit(state, schemaUnit, schemaUnit.min)
      return
    }

    if (schemaUnit.type === 'General') addUnit(state, schemaUnit, 1)
  })
}

export const resetState = 
(state: Writable<IBuilderState>, armySchema: IArmySchema, items: IMagicItem[]) => {
  state.update(s => {
    s = {
      armyName: armySchema.name,
      armyCost: 0,
      armyCostLimit: 2000,
      armyErrors: [],
      units: [],
      lookup: { magicItems: items }
    }
    return s
  })

  setRequiredUnits(state, armySchema)
}

export const addUnit = 
(state: Writable<IBuilderState>, unit: IBaseUnit, count: number) => {
  state.update(s => {
    const unitIdx = s.units.findIndex(builderUnit => unit.id === builderUnit.id)
    const isNewUnit = unitIdx === -1
    
    let unitBuffer: IBuilderUnit
    
    if (isNewUnit) {
      unitBuffer = { ...unit, count, errors: [], equippedItems: [] }
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
      const itemPointsCount = deletedUnit.equippedItems.reduce((sum, mi) => sum + mi.points, 0)
      s.armyCost -= deletedUnit.count * deletedUnit.points + itemPointsCount
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