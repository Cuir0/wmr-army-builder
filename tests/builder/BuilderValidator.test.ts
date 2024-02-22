import type { IBuilderUnit } from '../../src/types/Schema'
import type { IBuilderState } from '../../src/builder/store'
import { describe, expect, it } from 'vitest'

import { generateArmyState, generateBasicUnit } from '../TestUtils'
import * as Validator from '../../src/builder/builderValidator'

describe('Validate army state', async () => {
  it('should add error if general missing', async () => {
    // Arrange
    const builderState: IBuilderState = generateArmyState(10, 100)
    
    // Act
    Validator.isArmyValid(builderState)

    // Assert
    expect(builderState.armyErrors.length).toBe(1)
    expect(builderState.armyErrors[0]).toBe('Army needs general')
  })

  it('should add error if cost exceeded', async () => {
    // Arrange
    const general = generateBasicUnit(1, 2)
    general.type = 'General'

    const builderState: IBuilderState = generateArmyState(2000, 100)
    builderState.units.push({ ...general, count: 1, errors: [] })

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
    const unitTemplate: IBuilderUnit = { ...generateBasicUnit(undefined, 3), count: 1, errors: [] }
    
    // Act
    Validator.validateUnit(unitTemplate)

    // Assert
    expect(unitTemplate.errors.length).toBe(0)
  })

  it('should add error if unit is out of bounds', async () => {
    // Arrange
    const bounds = 1
    const unitCount = 2
    const unitTemplate: IBuilderUnit = { ...generateBasicUnit(bounds, bounds), count: unitCount, errors: [] }

    // Act
    Validator.validateUnit(unitTemplate)

    // Assert
    expect(unitTemplate.errors.length).toBeGreaterThanOrEqual(1)
    expect(unitTemplate.errors[0]).toBe(`Unit name count of ${unitCount} is out of bounds`)
  })
})