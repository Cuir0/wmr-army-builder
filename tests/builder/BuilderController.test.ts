import type { IBaseUnit, IBuilderUnit } from '$root/src/types/Schema'
import type { IBuilderState } from '$root/src/builder/store'

import { describe, expect, it } from 'vitest'
import { get, writable } from 'svelte/store'
import { generateArmySchema, generateArmyState, generateBasicUnit, generateBuilderUnit } from '../TestUtils'
import * as Controller from '$root/src/builder/builderController'

describe('Reset builder state', async () => {
  it('should set correct builder army name', async () => {
    // Arrange
    const builder = writable<IBuilderState>(generateArmyState({}))

    // Act
    Controller.resetState(builder, generateArmySchema({ name: 'Schama army name' }))

    // Assert
    const builderState = get(builder)
    expect(builderState.armyName).toBe('Schama army name')
  })


  it('should add minimal required units', async () => {
    // Arrange
    const builder = writable<IBuilderState>(generateArmyState({}))
    const unit1 = generateBasicUnit({ id: 0, name: 'Unit 1', min: 3, points: 10 })
    const unit2 = generateBasicUnit({ id: 1, name: 'Unit 2', min: 1, points: 100 })
    const general = generateBasicUnit({ id: 2, name: 'General unit', type: 'General', points: 5 })

    // Act
    Controller.resetState(builder, generateArmySchema({ units: [unit1, unit2, general] }))

    // Assert
    const builderState = get(builder)
    expect(builderState.armyCost).toBe(135)
    expect(builderState.units.length).toBe(3)
    expect(builderState.units.find(u => u.name === 'Unit 1')).toBeDefined()
    expect(builderState.units.find(u => u.name === 'Unit 2')).toBeDefined()
    expect(builderState.units.find(u => u.name === 'General unit')).toBeDefined()
  })
})

describe('Add new unit', async () => {
  it('should add a new unit correctly', async () => {
    // Arrange
    const builderState = generateArmyState({})
    const builder = writable<IBuilderState>(builderState)
    const unit: IBaseUnit = generateBasicUnit({})

    // Act
    Controller.addUnit(builder, unit, 1)

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
    Controller.addUnit(builder, unit, 1)

    // Assert
    expect(builderState.units[0].count).toBe(2)
  })


  it('should increase army cost by correct value', async () => {
    // Arrange
    const builderState = generateArmyState({})
    const builder = writable<IBuilderState>(builderState)
    const unit: IBaseUnit = generateBasicUnit({ points: 200 })

    // Act
    Controller.addUnit(builder, unit, 1)

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
    Controller.removeUnit(builder, unit, 1)

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
    Controller.removeUnit(builder, unit, 1)

    // Assert
    expect(builderState.armyCost).toBe(200)
  })
})