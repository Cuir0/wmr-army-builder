import type { Writable } from 'svelte/store'
import type { IBaseUnit } from '$types/Schema'
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
  Validator.validateUnit(builderUnit, countChange)

  builderUnit.count += countChange
}

const addBuilderUnit = 
(state: IBuilderState, unit: IBaseUnit, countChange: number) => {
  const newBuilderUnit = { ...unit, count: 0, errors: [] }

  Validator.validateUnit(newBuilderUnit, countChange)
  newBuilderUnit.count = countChange

  state.units.push(newBuilderUnit)
}

const removeBuilderUnit = 
(state: IBuilderState, unitIdx: number) => {
  state.units.splice(unitIdx, 1)
}

export const resetState = 
(state: Writable<IBuilderState>, armyName: string) => state.set({
  ...STORE_INITIAL_STATE, 
  armyErrors: [], 
  units: [], 
  armyName
})

export const addUnit = 
(state: Writable<IBuilderState>, unit: IBaseUnit) => {
  state.update(s => {
    const unitIdx = s.units.findIndex(builderUnit => unit.id === builderUnit.id)

    if (unitIdx !== -1) {
      updateUnitCount(s, unitIdx, 1)
    } else {
      addBuilderUnit(s, unit, 1)
    }

    s.armyCost += unit.points
    Validator.isArmyValid(s)
    return s
  })
}

export const removeUnit = 
(state: Writable<IBuilderState>, unit: IBaseUnit) => {
  state.update(s => {
    const unitIdx = s.units.findIndex(builderUnit => unit.id === builderUnit.id)

    if (s.units[unitIdx]?.count - 1 > 0) {
      updateUnitCount(s, unitIdx, -1)
    } else {
      removeBuilderUnit(s, unitIdx)
    }

    s.armyCost -= unit.points
    Validator.isArmyValid(s)
    return s
  })
}