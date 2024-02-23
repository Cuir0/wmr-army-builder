import type { IBaseUnit, IBuilderUnit } from '../../src/types/Schema'
import type { IBuilderState } from '../../src/builder/store'
import { describe, expect, it } from 'vitest'

import { writable } from 'svelte/store'
import { generateArmyState, generateBasicUnit } from '../TestUtils'
import * as Controller from '../../src/builder/builderController'

describe('Add new unit', async () => {
  it('should add a new unit correctly', async () => {
    // Arrange
    const builderState = generateArmyState(0, 500)
    const builder = writable<IBuilderState>(builderState)
    const unit: IBaseUnit = generateBasicUnit({})
    
    // Act
    Controller.addUnit(builder, unit)

    // Assert
    expect(builderState.units).toBeDefined()
    expect(builderState.units.length).toBe(1)

    const newBuilderUnit: IBuilderUnit = builderState.units[0]
    expect(newBuilderUnit.count).toBe(1)
    expect(newBuilderUnit.errors.length).toBe(0)
  })

  it('should increase army cost by correct value', async () => {
    // Arrange
    const builderState = generateArmyState(0, 500)
    const builder = writable<IBuilderState>(builderState)
    const unit: IBaseUnit = generateBasicUnit({ points: 200 })
    
    // Act
    Controller.addUnit(builder, unit)

    // Assert
    expect(builderState.armyCost).toBe(200)
  })
})