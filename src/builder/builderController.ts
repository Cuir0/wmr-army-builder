import type { IBaseUnit } from '$types/Army'
import type { IBuilderUnit } from '$types/Builder'
import type { IBuilderState } from './store'
import { get, type Writable } from 'svelte/store'

const incBuilderUnit = (state: IBuilderState, unit: IBuilderUnit) => {
  state.armyCost += unit.points
  unit.count++
  return state
}

export const addUnit = (state: Writable<IBuilderState>, unit: IBaseUnit) => {
  const { units } = get(state)
  const unitIndex = units.findIndex(builderUnit => unit.id === builderUnit.id)

  if (unitIndex !== -1) {
    state.update(s => incBuilderUnit(s, s.units[unitIndex]))
  } else {
    state.update(s => (s.units.push({ ...unit, count: 1 }), s))
  }
}