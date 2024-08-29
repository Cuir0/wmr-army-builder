import type { IBuilderMagicItem, IBuilderUnit, IStandUnit, IUpgrade } from '$types/schema'
import type { IBuilderState } from '$builder/store'

import { describe, expect, it } from 'vitest'
import { 
  generateArmyState,
  generateBasicUnit,
  generateBuilderUnit,
  generateMagicItem,
  generateUpgrade
} from '../testUtils'

import * as Validator from '$builder/validator'

// Constants
const MIN_ARMY_COST = 1


describe.concurrent('Validate army state', async () => {
  it('should add error if general missing', async () => {
    // Arrange
    const builderState: IBuilderState = generateArmyState({})

    // Act
    Validator.validateArmy(builderState, 0)

    // Assert
    expect(builderState.armyErrors.length).toBe(1)
    expect(builderState.armyErrors[0]).toBe('Army needs a general.')
  })


  it('should add error if cost exceeded', async () => {
    // Arrange
    const builderState: IBuilderState = generateArmyState({ armyCost: 2100, armyCostLimit: 2000 })
    const general = generateBuilderUnit({ min: 1, max: 2, type: 'General' })
    builderState.units.push(general)

    // Act
    Validator.validateArmy(builderState, builderState.armyCost)

    // Assert
    expect(builderState.armyErrors.length).toBe(1)
    expect(builderState.armyErrors[0]).toBe('Army cost exceeds the limit.')
  })


  it('should add error if army has >1 of same item', async () => {
    // Arrange
    const builderState: IBuilderState = generateArmyState({
      armyCostLimit: 2000,
      validation: {
        armyUpgrades: {}, armyStands: {},
        magicItems: { 'CustomItem': 2 },
      }
    })
    const general = generateBuilderUnit({ type: 'General' })
    builderState.units.push(general)

    // Act
    Validator.validateArmy(builderState, MIN_ARMY_COST)

    // Assert
    expect(builderState.armyErrors.length).toBe(1)
    expect(builderState.armyErrors[0]).toBe('Max 1 CustomItem per army.')
  })


  it('should add error if army upgrade maximum count is exceeded', async () => {
    // Arrange
    const builderState: IBuilderState = generateArmyState({
      armyCostLimit: 2000,
      validation: {
        magicItems: {}, armyStands: {},
        armyUpgrades: { 'CustomUpgrade': 3 },
      }
    })
    const general = generateBuilderUnit({ type: 'General' })
    builderState.units.push(general)

    // Act
    Validator.validateArmy(builderState, MIN_ARMY_COST)

    // Assert
    expect(builderState.armyErrors.length).toBe(1)
    expect(builderState.armyErrors[0]).toBe('Max 1 CustomUpgrade per army.')
  })


  it('should add error if army upgrade maximum count is exceeded', async () => {
    // Arrange
    const builderState: IBuilderState = generateArmyState({
      armyCostLimit: 2000,
      validation: {
        magicItems: {}, armyUpgrades: {},
        armyStands: { 'CustomStand': { count: 3, max: 2 } },
      }
    })
    const general = generateBuilderUnit({ type: 'General' })
    builderState.units.push(general)

    // Act
    Validator.validateArmy(builderState, MIN_ARMY_COST)

    // Assert
    expect(builderState.armyErrors.length).toBe(1)
    expect(builderState.armyErrors[0]).toBe('CustomStand stand unit is out of bounds.')
  })
})


describe.concurrent('Validate new unit', async () => {
  it('should not add error for correct unit', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ max: 3 })

    // Act
    Validator.validateUnit(unitTemplate, MIN_ARMY_COST)

    // Assert
    expect(unitTemplate.errors.length).toBe(0)
  })


  it('should add error if unit minimum count is not met', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ min: 3, count: 1 })

    // Act
    Validator.validateUnit(unitTemplate, MIN_ARMY_COST)

    // Assert
    expect(unitTemplate.errors.length).toBe(1)
    expect(unitTemplate.errors[0]).toBe('Unit name count of 1 is out of bounds.')
  })


  it('should add error if unit maximum count is exceeded', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ min: 1, max: 1, count: 2 })

    // Act
    Validator.validateUnit(unitTemplate, MIN_ARMY_COST)

    // Assert
    expect(unitTemplate.errors.length).toBe(1)
    expect(unitTemplate.errors[0]).toBe('Unit name count of 2 is out of bounds.')
  })


  it('should add error if unit army maximum count is exceeded', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ armyMax: 1, count: 2 })

    // Act
    Validator.validateUnit(unitTemplate, MIN_ARMY_COST)

    // Assert
    expect(unitTemplate.errors.length).toBe(1)
    expect(unitTemplate.errors[0]).toBe('Unit name count of 2 is out of bounds.')
  })


  it('should add error if unit has more magic items than count', async () => {
    // Arrange
    const testItem: IBuilderMagicItem = { ...generateMagicItem({}), points: 100 }
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ count: 2, equippedItems: [testItem, testItem, testItem] })

    // Act
    Validator.validateUnit(unitTemplate, MIN_ARMY_COST)

    // Assert
    expect(unitTemplate.errors.length).toBe(1)
    expect(unitTemplate.errors[0]).toBe('2 Unit name cannot have more than 2 item(s).')
  })


  it('should add error if unit has more upgrades than count', async () => {
    // Arrange
    const testUpgrade: IUpgrade = generateUpgrade({ pointsModify: 100 })
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ count: 2, equippedUpgrades: [testUpgrade, testUpgrade, testUpgrade] })

    // Act
    Validator.validateUnit(unitTemplate, MIN_ARMY_COST)

    // Assert
    expect(unitTemplate.errors.length).toBe(1)
    expect(unitTemplate.errors[0]).toBe('2 Unit name cannot have more than 2 upgrade(s).')
  })


  it('should add error if unit has more stands than count', async () => {
    // Arrange
    const testStand: IStandUnit = { ...generateBasicUnit({}), count: 3 }
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ count: 2, additionalStands: [testStand] })

    // Act
    Validator.validateUnit(unitTemplate, MIN_ARMY_COST)

    // Assert
    expect(unitTemplate.errors.length).toBe(1)
    expect(unitTemplate.errors[0]).toBe('2 Unit name cannot have more than 2 stand(s).')
  })
})