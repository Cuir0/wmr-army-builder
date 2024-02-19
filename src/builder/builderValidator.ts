import type { IBuilderUnit } from '../types/Schema'

const isWithinBounds = 
(builderUnit: IBuilderUnit, countChange: number): boolean => {
  const max = builderUnit.max ?? Infinity
  const min = builderUnit.min ?? -Infinity

  const count = builderUnit ? builderUnit.count : 0
  const newCount = count + countChange

  return newCount > max || newCount < min
}

export const isUnitValid = 
(builderUnit: IBuilderUnit, countChange: number): boolean => {
  if (isWithinBounds(builderUnit, countChange)) {
    return true
  }
  return false
}