import type { IBuilderUnit } from '../../src/types/Schema'
import type { IBuilderState } from '../../src/builder/store'

import { describe, expect, it } from 'vitest'
import { generateArmyState, generateBuilderUnit } from '../TestUtils'
import * as Validator from '../../src/builder/builderValidator'

describe('Validate army state', async () => {
  it('should add error if general missing', async () => {
    // Arrange
    const builderState: IBuilderState = generateArmyState({})

    // Act
    Validator.isArmyValid(builderState)

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
    Validator.isArmyValid(builderState)

    // Assert
    expect(builderState.armyErrors.length).toBe(1)
    expect(builderState.armyErrors[0]).toBe('Army cost exeeds the limit')
  })
})


describe('Validate new unit', async () => {
  it('should not add error for correct unit', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ max: 3 })

    // Act
    Validator.validateUnit(unitTemplate)

    // Assert
    expect(unitTemplate.errors.length).toBe(0)
  })


  it('should add error if unit is out of bounds', async () => {
    // Arrange
    const unitTemplate: IBuilderUnit = generateBuilderUnit({ min: 1, max: 1, count: 2 })

    // Act
    Validator.validateUnit(unitTemplate)

    // Assert
    expect(unitTemplate.errors.length).toBeGreaterThanOrEqual(1)
    expect(unitTemplate.errors[0]).toBe('Unit name count of 2 is out of bounds')
  })
})