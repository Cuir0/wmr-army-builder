import type { IBaseUnit, IBuilderUnit } from '../../src/types/Schema'
import type { IBuilderState } from '../../src/builder/store'

import { describe, expect, it } from 'vitest'
import { generateArmyState, generateBasicUnit, generateBuilderUnit } from '../TestUtils'
import { writable } from 'svelte/store'
import * as Controller from '../../src/builder/builderController'

describe('Add new unit', async () => {
  it('should add a new unit correctly', async () => {
    // Arrange
    const builderState = generateArmyState({})
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


  it('should increase units count by correct value', async () => {
    // Arrange
    const unit: IBaseUnit = generateBasicUnit({})
    const builderState = generateArmyState({})
    builderState.units.push(generateBuilderUnit({ ...unit }))

    const builder = writable<IBuilderState>(builderState)

    // Act
    Controller.addUnit(builder, unit)

    // Assert
    expect(builderState.units[0].count).toBe(2)
  })


  it('should increase army cost by correct value', async () => {
    // Arrange
    const builderState = generateArmyState({})
    const builder = writable<IBuilderState>(builderState)
    const unit: IBaseUnit = generateBasicUnit({ points: 200 })

    // Act
    Controller.addUnit(builder, unit)

    // Assert
    expect(builderState.armyCost).toBe(200)
  })
})

describe('Remove new unit', async () => {
  it('should remove a unit correctly', async () => {
    // Arrange
    const unit: IBaseUnit = generateBasicUnit({})
    const builderState = generateArmyState({})
    builderState.units.push({...unit, count: 1, errors: [] })

    const builder = writable<IBuilderState>(builderState)

    // Act
    Controller.removeUnit(builder, unit)

    // Assert
    expect(builderState.units).toBeDefined()
    expect(builderState.units.length).toBe(0)
  })


  it('should decrease army cost by correct value', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({ points: 100 })
    const builderState = generateArmyState({ armyCost: 300, armyCostLimit: 500 })
    builderState.units.push(unit)
    const builder = writable<IBuilderState>(builderState)

    // Act
    Controller.removeUnit(builder, unit)

    // Assert
    expect(builderState.armyCost).toBe(200)
  })
})