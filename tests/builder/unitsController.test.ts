import type { IBaseUnit, IBuilderMagicItem, IBuilderUnit, IUpgrade } from '$root/src/types/Schema'
import type { IBuilderState } from '$root/src/builder/store'

import { beforeEach, describe, expect, it } from 'vitest'
import { writable, type Writable } from 'svelte/store'
import {
  generateArmyState,
  generateBasicUnit,
  generateBuilderUnit,
  generateMagicItem,
  generateUpgrade
} from '../TestUtils'

import * as Controller from '$root/src/builder/unitsController'


describe('Add unit', async () => {
  let builderState: IBuilderState
  let builder: Writable<IBuilderState>

  beforeEach(async () => {
    builderState = generateArmyState({})
    builder = writable<IBuilderState>(builderState)
  })


  it('should add a new unit correctly', async () => {
    // Arrange
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
    const unit: IBuilderUnit = generateBuilderUnit({})
    builderState.units.push(unit)

    // Act
    Controller.addUnit(builder, unit, 3)

    // Assert
    expect(builderState.units[0].count).toBe(4)
  })


  it('should increase army cost by correct value', async () => {
    // Arrange
    const unit: IBaseUnit = generateBasicUnit({ points: 200 })

    // Act
    Controller.addUnit(builder, unit, 2)

    // Assert
    expect(builderState.armyCost).toBe(400)
  })
})

describe('Remove unit', async () => {
  let builderState: IBuilderState
  let builder: Writable<IBuilderState>

  beforeEach(async () => {
    builderState = generateArmyState({})
    builder = writable<IBuilderState>(builderState)
  })


  it('should remove a unit correctly', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({})
    builderState.units.push(unit)

    // Act
    Controller.removeUnit(builder, unit, 1)

    // Assert
    expect(builderState.units).toBeDefined()
    expect(builderState.units.length).toBe(0)
  })


  it('should decrease army cost by correct value', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({ points: 100 })
    builderState.armyCost = 300
    builderState.armyCostLimit = 500
    builderState.units.push(unit)

    // Act
    Controller.removeUnit(builder, unit, 1)

    // Assert
    expect(builderState.armyCost).toBe(200)
  })


  it('should remove a unit correctly when `count` param is >1', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({ count: 3, points: 100 })
    builderState.armyCost = 300
    builderState.units.push(unit)

    // Act
    Controller.removeUnit(builder, unit, 6)

    // Assert
    expect(builderState.units).toBeDefined()
    expect(builderState.units.length).toBe(0)
    expect(builderState.armyCost).toBe(0)
  })


  it('should unequip unit items and decrease army cost', async () => {
    // Arrange
    const magicItem1: IBuilderMagicItem = { ...generateMagicItem({}), points: 60 }
    const magicItem2: IBuilderMagicItem = { ...generateMagicItem({}), points: 40 }
    const unit: IBuilderUnit = generateBuilderUnit({ 
      points: 100,
      count: 1,
      equippedItems: [magicItem1, magicItem2]
    })

    builderState.armyCost = 200
    builderState.units.push(unit)

    // Act
    Controller.removeUnit(builder, unit, 1)

    // Assert
    expect(builderState.units.length).toBe(0)
    expect(builderState.armyCost).toBe(0)
  })


  it('should unequip unit upgrades and decrease army cost', async () => {
    // Arrange
    const upgrade1: IUpgrade = generateUpgrade({ pointsModify: 80 })
    const upgrade2: IUpgrade = generateUpgrade({ pointsModify: 80 })
    const unit: IBuilderUnit = generateBuilderUnit({ 
      points: 100,
      count: 1,
      equippedUpgrades: [upgrade1, upgrade2]
    })

    builderState.armyCost = 260
    builderState.units.push(unit)

    // Act
    Controller.removeUnit(builder, unit, 1)

    // Assert
    expect(builderState.units.length).toBe(0)
    expect(builderState.armyCost).toBe(0)
  })
})