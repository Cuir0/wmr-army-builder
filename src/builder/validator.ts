import type { IBuilderUnit } from '$types/schema'
import type { IBuilderState } from './store'
import { ArmyErrors, UnitErrors, formatError } from './validatorMessages'

const isUnitCountIncorrect = 
(builderUnit: IBuilderUnit, armyCost: number): boolean => {
  const countMultiplier = Math.ceil(armyCost / 1000)
  const max = (builderUnit.max ?? Infinity) * countMultiplier
  const min = (builderUnit.min ?? -Infinity) * countMultiplier

  const count = builderUnit ? builderUnit.count : 0

  if (builderUnit.armyMax) return count > builderUnit.armyMax
  return count > max || count < min
}

const isUnitStandsCountIncorrect = 
(builderUnit: IBuilderUnit): boolean => {
  const standsCount = builderUnit.additionalStands.reduce((count, stand) => count + stand.count, 0)
  return standsCount > builderUnit.count
}

export const validateUnit = 
(builderUnit: IBuilderUnit, armyCost: number) => {
  builderUnit.errors = []

  if (builderUnit.equippedItems.length > builderUnit.count) {
    builderUnit.errors.push(formatError(UnitErrors.TooManyItems, { count: builderUnit.count, name: builderUnit.name }))
  }

  if (builderUnit.equippedUpgrades.length > builderUnit.count) {
    builderUnit.errors.push(formatError(UnitErrors.TooManyUpgrades, { count: builderUnit.count, name: builderUnit.name }))
  }

  if (isUnitStandsCountIncorrect(builderUnit)) {
    builderUnit.errors.push(formatError(UnitErrors.TooManyStands, { count: builderUnit.count, name: builderUnit.name }))
  }

  if (isUnitCountIncorrect(builderUnit, armyCost)) {
    builderUnit.errors.push(formatError(UnitErrors.CountOutOfBounds, { count: builderUnit.count, name: builderUnit.name }))
  }
}

const isStandUnitCountIncorrect =
(standName: string, state: IBuilderState) => {
  const standData = state.validation.armyStands[standName]
  const countMultiplier = Math.ceil(state.armyCost / 1000)
  const max = (standData.max ?? Infinity) * countMultiplier
  
  return standData.count > max
}

const validateArmyAugments =
(state: IBuilderState) => {
  Object.keys(state.validation.magicItems)
    .filter(itemName => state.validation.magicItems[itemName] > 1)
    .forEach(name => state.armyErrors.push(formatError(ArmyErrors.MaxOneAugment, { name })))

  Object.keys(state.validation.armyUpgrades)
    .filter(upgradeName => state.validation.armyUpgrades[upgradeName] > 1)
    .forEach(name => state.armyErrors.push(formatError(ArmyErrors.MaxOneAugment, { name })))
    
  Object.keys(state.validation.armyStands)
    .filter(standName => isStandUnitCountIncorrect(standName, state))
    .forEach(name => state.armyErrors.push(formatError(ArmyErrors.StandsOutOfBounds, { name })))
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

  validateArmyAugments(state)

  const hasGeneral: boolean = state.units.some(u => u.type === 'General')
  if (!hasGeneral) {
    state.armyErrors.push(ArmyErrors.ArmyNeedsGeneral)
  }

  if (state.armyCost > state.armyCostLimit) {
    state.armyErrors.push(ArmyErrors.ArmyCostExceedsLimit)
  }
}