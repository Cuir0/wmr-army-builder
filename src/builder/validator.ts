import type { IBuilderUnit } from '$types/Schema'
import type { IBuilderState } from './store'

const isOutsideOfBounds = 
(builderUnit: IBuilderUnit): boolean => {
  const max = builderUnit.max ?? Infinity
  const min = builderUnit.min ?? -Infinity

  const count = builderUnit ? builderUnit.count : 0

  if (builderUnit.armyMax) return count > builderUnit.armyMax
  return count > max || count < min
}

export const validateUnit = 
(builderUnit: IBuilderUnit) => {
  builderUnit.errors = []

  if (builderUnit.equippedItems.length > builderUnit.count) {
    builderUnit.errors.push(`${builderUnit.count} ${builderUnit.name} cannot have more than ${builderUnit.count} item(s)`)
  }

  if (isOutsideOfBounds(builderUnit)) {
    builderUnit.errors.push(`${builderUnit.name} count of ${builderUnit.count} is out of bounds`)
  }
}

const validateMagicItems =
(state: IBuilderState) => {
  Object.keys(state.validation.magicItems)
    .filter(itemName => state.validation.magicItems[itemName] > 1)
    .forEach(itemName => state.armyErrors.push(`Max 1 ${itemName} per army.`))
}

export const validateArmy = 
(state: IBuilderState) => {
  state.armyErrors = []

  validateMagicItems(state)

  const hasGeneral: boolean = state.units.some(u => u.type === 'General')
  if (!hasGeneral) {
    state.armyErrors.push('Army needs general')
  }

  if (state.armyCost > state.armyCostLimit) {
    state.armyErrors.push('Army cost exeeds the limit')
  }
}