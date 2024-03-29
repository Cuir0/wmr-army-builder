import type { IBuilderUnit } from '$root/src/types/Schema'
import type { IBuilderState } from '$root/src/builder/store'

import { describe, expect, it } from 'vitest'
import { generateArmyState, generateBuilderUnit } from '../TestUtils'
import * as Validator from '$root/src/builder/validator'

describe.concurrent('Validate army state', async () => {
  it('should add error if general missing', async () => {
    // Arrange
    const builderState: IBuilderState = generateArmyState({})

    // Act
    Validator.validateArmy(builderState)

    // Assert
    expect(builderState.armyErrors.length).toBe(1)
    expect(builderState.armyErrors[0]).toBe('Army needs general')
  })


  it('should add error if cost exceeded', async () => {
    // Arrange
    const builderState: IBuilderState = generateArmyState({ armyCost: 2100, armyCostLimit: 2000 })
    const general = generateBuilderUnit({ min: 1, max: 2, type: 'General' })
    builderState.units.push(general)

    // Act
    Validator.validateArmy(builderState)

    // Assert
    expect(builderState.armyErrors.length).toBe(1)
    expect(builderState.armyErrors[0]).toBe('Army cost exeeds the limit')
  })
})


describe.concurrent('Validate new unit', async () => {
  it('should not add error for correct unit', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ max: 3 })

    // Act
    Validator.validateUnit(unitTemplate)

    // Assert
    expect(unitTemplate.errors.length).toBe(0)
  })


  it('should add error if unit minimum count is not met', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ min: 3, count: 1 })

    // Act
    Validator.validateUnit(unitTemplate)

    // Assert
    expect(unitTemplate.errors.length).toBe(1)
    expect(unitTemplate.errors[0]).toBe('Unit name count of 1 is out of bounds')
  })


  it('should add error if unit maximum count is exceeded', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ min: 1, max: 1, count: 2 })

    // Act
    Validator.validateUnit(unitTemplate)

    // Assert
    expect(unitTemplate.errors.length).toBe(1)
    expect(unitTemplate.errors[0]).toBe('Unit name count of 2 is out of bounds')
  })


  it('should add error if unit army maximum count is exceeded', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ armyMax: 1, count: 2 })

    // Act
    Validator.validateUnit(unitTemplate)

    // Assert
    expect(unitTemplate.errors.length).toBe(1)
    expect(unitTemplate.errors[0]).toBe('Unit name count of 2 is out of bounds')
  })
})