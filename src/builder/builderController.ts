import { get, type Writable } from 'svelte/store'
import type { IArmySchema, IBaseUnit } from '$types/Schema'
import type { IBuilderState } from './store'

import * as Validator from './builderValidator'

export const STORE_INITIAL_STATE: IBuilderState = {
  armyName: '',
  armyCostLimit: 2000,
  armyCost: 0,
  armyErrors: [],
  units: []
}

const updateUnitCount = 
(state: IBuilderState, unitIdx: number, countChange: number) => {
  const builderUnit = state.units[unitIdx]
  builderUnit.count += countChange

  state.armyCost += builderUnit.points * countChange
  Validator.validateUnit(builderUnit)
}

const addBuilderUnit = 
(state: IBuilderState, unit: IBaseUnit, countChange: number) => {
  const newBuilderUnit = { ...unit, count: 0, errors: [] }
  newBuilderUnit.count = countChange
  state.units.push(newBuilderUnit)

  state.armyCost += unit.points * countChange
  Validator.validateUnit(newBuilderUnit)
}

const removeBuilderUnit = 
(state: IBuilderState, unitIdx: number) => {
  const deletedUnit = state.units.splice(unitIdx, 1)[0]
  state.armyCost -= deletedUnit.points
}

const addMinimalRequiredUnits = 
(state: IBuilderState, armySchema: IArmySchema) => {
  armySchema.units.forEach(schemaUnit => {
    if (schemaUnit.min) {
      addBuilderUnit(state, schemaUnit, schemaUnit.min)
      return
    }

    if (schemaUnit.type === 'General') {
      addBuilderUnit(state, schemaUnit, 1)
    }
  })
}

export const resetState = 
(state: Writable<IBuilderState>, armySchema: IArmySchema) => {
  state.update(s => {
    s = {
      ...STORE_INITIAL_STATE,
      armyName: armySchema.name,
      armyErrors: [],
      units: []
    }

    addMinimalRequiredUnits(s, armySchema)
    return s
  })

  Validator.isArmyValid(get(state))
}

export const addUnit = 
(state: Writable<IBuilderState>, unit: IBaseUnit) => {
  state.update(s => {
    const unitIdx = s.units.findIndex(builderUnit => unit.id === builderUnit.id)

    if (unitIdx !== -1) {
      updateUnitCount(s, unitIdx, 1)
    } else {
      addBuilderUnit(s, unit, 1)
    }

    Validator.isArmyValid(s)
    return s
  })
}

export const removeUnit = 
(state: Writable<IBuilderState>, unit: IBaseUnit) => {
  state.update(s => {
    const unitIdx = s.units.findIndex(builderUnit => unit.id === builderUnit.id)

    if (s.units[unitIdx].count - 1 > 0) {
      updateUnitCount(s, unitIdx, -1)
    } else {
      removeBuilderUnit(s, unitIdx)
    }

    Validator.isArmyValid(s)
    return s
  })
}