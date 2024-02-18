import type { IBaseUnit, IBuilderUnit } from '$root/src/types/Schema'
import type { IBuilderState } from './store'
import { get, type Writable } from 'svelte/store'

const changeUnitCount = 
(state: IBuilderState, unit: IBuilderUnit, changeVal: number) => {
  state.armyCost += unit.points * changeVal
  unit.count += changeVal
  return state
}

export const addUnit = 
(state: Writable<IBuilderState>, unit: IBaseUnit) => {
  const { units } = get(state)
  const unitIndex = units.findIndex(builderUnit => unit.id === builderUnit.id)

  if (unitIndex !== -1) {
    state.update(s => changeUnitCount(s, s.units[unitIndex], 1))
  } else {
    state.update(s => {
      s.units.push({ ...unit, count: 1 })
      s.armyCost += unit.points
      return s
    })
  }
}

export const removeUnit = 
(state: Writable<IBuilderState>, unit: IBaseUnit) => {
  const { units } = get(state)
  const unitIndex = units.findIndex(builderUnit => unit.id === builderUnit.id)

  if (units[unitIndex].count !== 1) {
    state.update(s => changeUnitCount(s, s.units[unitIndex], -1))
  } else {
    state.update(s => {
      s.units.splice(unitIndex, 1)
      s.armyCost -= unit.points
      return s
    })
  }
}