import type { Writable } from 'svelte/store'
import type { IBaseUnit } from '$root/src/types/Schema'
import type { IBuilderState } from './store'
import * as Validator from './builderValidator'

export const STORE_INITIAL_STATE: IBuilderState = {
  armyName: '',
  armyCostLimit: 2000,
  armyCost: 0,
  units: []
}

const updateUnitCount = 
(state: IBuilderState, unitIdx: number, countChange: number) => {
  const builderUnit = state.units[unitIdx]
  const hasError = !Validator.isUnitValid(builderUnit, countChange)

  builderUnit.count += countChange
  builderUnit.hasError = hasError
}

const addBuilderUnit = 
(state: IBuilderState, unit: IBaseUnit, countChange: number) => {
  const newBuilderUnit = { ...unit, count: 0, hasError: false }

  const hasError = !Validator.isUnitValid(newBuilderUnit, countChange)
  newBuilderUnit.count = countChange
  newBuilderUnit.hasError = hasError

  state.units.push(newBuilderUnit)
}

const removeBuilderUnit = 
(state: IBuilderState, unitIdx: number) => {
  state.units.splice(unitIdx, 1)
}

export const resetState = 
(state: Writable<IBuilderState>, armyName: string) => state.set({...STORE_INITIAL_STATE, units: [], armyName})

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
    return s
  })
}