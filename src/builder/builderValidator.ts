import type { IBuilderUnit } from '$types/Schema'
import type { IBuilderState } from './store'

const isOutsideOfBounds = 
(builderUnit: IBuilderUnit, countChange: number): boolean => {
  const max = builderUnit.max ?? Infinity
  const min = builderUnit.min ?? -Infinity

  const count = builderUnit ? builderUnit.count : 0
  const newCount = count + countChange

  return newCount > max || newCount < min
}

export const validateUnit = 
(builderUnit: IBuilderUnit, countChange: number) => {
  builderUnit.errors = []

  if (isOutsideOfBounds(builderUnit, countChange)) {
    builderUnit.errors.push(`${builderUnit.name} count of ${builderUnit.count + countChange} is out of bounds`)
  }
}

export const isArmyValid = 
(state: IBuilderState) => {
  state.armyErrors = []

  if (state.armyCost > state.armyCostLimit) {
    state.armyErrors.push('Army cost exeeds the limit')
  }
}