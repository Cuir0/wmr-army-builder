import type { IBuilderUnit } from '$types/schema'
import type { IBuilderState } from './store'

const isOutsideOfBounds = 
(builderUnit: IBuilderUnit, armyCost: number): boolean => {
  const countMultiplier = Math.ceil(armyCost / 1000)
  const max = (builderUnit.max ?? Infinity) * countMultiplier
  const min = (builderUnit.min ?? -Infinity) * countMultiplier

  const count = builderUnit ? builderUnit.count : 0

  if (builderUnit.armyMax) return count > builderUnit.armyMax
  return count > max || count < min
}

export const validateUnit = 
(builderUnit: IBuilderUnit, armyCost: number) => {
  builderUnit.errors = []

  if (builderUnit.equippedItems.length > builderUnit.count) {
    builderUnit.errors.push(`${builderUnit.count} ${builderUnit.name} cannot have more than ${builderUnit.count} item(s)`)
  }

  if (builderUnit.equippedUpgrades.length > builderUnit.count) {
    builderUnit.errors.push(`${builderUnit.count} ${builderUnit.name} cannot have more than ${builderUnit.count} upgrade(s)`)
  }

  if (isOutsideOfBounds(builderUnit, armyCost)) {
    builderUnit.errors.push(`${builderUnit.name} count of ${builderUnit.count} is out of bounds`)
  }
}

const validateMagicItems =
(state: IBuilderState) => {
  Object.keys(state.validation.magicItems)
    .filter(itemName => state.validation.magicItems[itemName] > 1)
    .forEach(itemName => state.armyErrors.push(`Max 1 ${itemName} per army.`))

  Object.keys(state.validation.armyUpgrades)
    .filter(upgradeName => state.validation.armyUpgrades[upgradeName] > 1)
    .forEach(upgradeName => state.armyErrors.push(`Max 1 ${upgradeName} per army.`))
}

const hasArmyCostCrossedThreshold = 
(currArmyCost: number, prevArmyCost: number) => {
  const newThreshold = Math.floor(currArmyCost / 1000) * 1000
  const prevThreshold = Math.floor(prevArmyCost / 1000) * 1000

  return newThreshold !== prevThreshold
}

export const validateArmy = 
(state: IBuilderState, prevArmyCost: number) => {
  state.armyErrors = []

  if (hasArmyCostCrossedThreshold(state.armyCost, prevArmyCost)) {
    state.units.forEach(u => validateUnit(u, state.armyCost))
  }

  validateMagicItems(state)

  const hasGeneral: boolean = state.units.some(u => u.type === 'General')
  if (!hasGeneral) {
    state.armyErrors.push('Army needs general')
  }

  if (state.armyCost > state.armyCostLimit) {
    state.armyErrors.push('Army cost exeeds the limit')
  }
}