import type { IBuilderUnit } from '$types/Schema'
import type { IBuilderState } from './store'

const isOutsideOfBounds = 
(builderUnit: IBuilderUnit): boolean => {
  const max = builderUnit.max ?? Infinity
  const min = builderUnit.min ?? -Infinity

  const count = builderUnit ? builderUnit.count : 0

  return count > max || count < min
}

export const validateUnit = 
(builderUnit: IBuilderUnit) => {
  builderUnit.errors = []

  if (isOutsideOfBounds(builderUnit)) {
    builderUnit.errors.push(`${builderUnit.name} count of ${builderUnit.count} is out of bounds`)
  }
}

export const isArmyValid = 
(state: IBuilderState) => {
  state.armyErrors = []

  if (state.armyCost > state.armyCostLimit) {
    state.armyErrors.push('Army cost exeeds the limit')
  }
}