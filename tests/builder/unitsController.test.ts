import type { IBaseUnit, IBuilderMagicItem, IBuilderUnit, IUpgrade } from '$types/schema'
import type { IBuilderState } from '$builder/store'

import { beforeEach, describe, expect, it } from 'vitest'
import { writable, type Writable } from 'svelte/store'
import {
  generateArmyState,
  generateBasicUnit,
  generateBuilderUnit,
  generateMagicItem,
  generateUpgrade
} from '../testUtils'

import * as Controller from '$builder/unitsController'


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

  it('should add errors if the army points exceed the threshold multiplier', async () => {
    // Arrange
    const unit: IBaseUnit = generateBasicUnit({ id: 1, points: 200 })
    const armyUnit = generateBuilderUnit({ id: 0, min: 3, count: 3, points: 300 })
    
    builderState.armyCost = 900
    builderState.armyCostLimit = 2000
    builderState.units.push(armyUnit)

    // Act
    Controller.addUnit(builder, unit, 1)

    // Assert
    expect(armyUnit.errors.length).toBe(1)
    expect(armyUnit.errors[0]).toBe('Unit name count of 3 is out of bounds')
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

  it('should add errors if the army points not meet the threshold multiplier', async () => {
    // Arrange
    const unit: IBaseUnit = generateBasicUnit({ id: 1, points: 300 })
    const armyUnit = generateBuilderUnit({ id: 0, max: 3, count: 4, points: 400 })
    
    builderState.armyCost = 1200
    builderState.armyCostLimit = 2000
    builderState.units.push(armyUnit)
    builderState.units.push(generateBuilderUnit({...unit}))

    // Act
    Controller.removeUnit(builder, unit, 1)

    // Assert
    expect(armyUnit.errors.length).toBe(1)
    expect(armyUnit.errors[0]).toBe('Unit name count of 4 is out of bounds')
  })
})

describe('Add stand unit', async () => {
  let builderUnit: IBuilderUnit
  let builderState: IBuilderState
  let builder: Writable<IBuilderState>

  beforeEach(async () => {
    builderUnit = generateBuilderUnit({ id: 0, points: 100 })
    
    builderState = generateArmyState({ armyCost: 100, armyCostLimit: 1000 })
    builderState.units.push(builderUnit)
    builder = writable<IBuilderState>(builderState)
  })


  it('should add stand to a unit correctly', async () => {
    // Arrange
    const stand = generateBasicUnit({ id: 1, name: 'Stand 1', points: 50 })
    builderState.validation.armyStands['Stand 1'] = { max: 2, count: 0 }

    // Act
    Controller.addStandToUnit(builder, builderUnit, stand)
  
    // Assert
    expect(builderUnit.additionalStands.length).toBe(1)
    expect(builderUnit.additionalStands[0].id).toBe(1)
    expect(builderState.validation.armyStands['Stand 1'].count).toBe(1)
    expect(builderState.armyCost).toBe(150)
  })
})

describe('Remove stand unit', async () => {
  let builderUnit: IBuilderUnit
  let builderState: IBuilderState
  let builder: Writable<IBuilderState>

  beforeEach(async () => {
    builderUnit = generateBuilderUnit({ id: 0, points: 100 })
    
    builderState = generateArmyState({ armyCost: 100, armyCostLimit: 1000 })
    builderState.units.push(builderUnit)
    builder = writable<IBuilderState>(builderState)
  })


  it('should add stand to a unit correctly', async () => {
    // Arrange
    const stand = generateBasicUnit({ id: 1, name: 'Stand 1', points: 50 })

    builderState.validation.armyStands['Stand 1'] = { max: 2, count: 1 }
    builderUnit.additionalStands.push({ ...stand, count: 1 })
    builderState.armyCost += 50

    // Act
    Controller.removeStandFromUnit(builder, builderUnit, 0)
  
    // Assert
    expect(builderUnit.additionalStands.length).toBe(0)
    expect(builderState.validation.armyStands['Stand 1'].count).toBe(0)
    expect(builderState.armyCost).toBe(100)
  })
})