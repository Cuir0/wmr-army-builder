import type { IBuilderMagicItem, IBuilderUnit, IMagicItem, IUpgrade } from '$root/src/types/Schema'
import type { IBuilderState } from '$root/src/builder/store'

import { beforeEach, describe, expect, it } from 'vitest'
import { writable, type Writable } from 'svelte/store'
import { 
  generateArmyState, 
  generateBuilderUnit, 
  generateMagicItem, 
  generateUpgrade
} from '../TestUtils'

import * as Controller from '$root/src/builder/itemsController'

describe('Equip item', async () => {
  let builderState: IBuilderState
  let builder: Writable<IBuilderState>
  let testItem: IMagicItem

  beforeEach(async () => {
    builderState = generateArmyState({})
    builder = writable<IBuilderState>(builderState)
    testItem = generateMagicItem({ 
      name: 'Unit magic item',
      pointsChange: 40 
    })
  })


  it('should add correct item to unit', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({})
    builderState.units.push(unit)

    // Act
    Controller.equipItem(builder, unit, testItem)

    // Assert
    expect(builderState.units[0].equippedItems.length).toBe(1)
    expect(builderState.units[0].equippedItems[0].name).toBe('Unit magic item')
  })


  it('should increase army cost by correct value', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({})
    builderState.armyCost = 60
    builderState.units.push(unit)

    // Act
    Controller.equipItem(builder, unit, testItem)

    // Assert
    expect(builderState.units[0].equippedItems.length).toBe(1)
    expect(builderState.armyCost).toBe(100)
  })
})

describe('Unequip item', async () => {
  let builderState: IBuilderState
  let builder: Writable<IBuilderState>
  let testItem1: IBuilderMagicItem
  let testItem2: IBuilderMagicItem

  beforeEach(async () => {
    builderState = generateArmyState({})
    builder = writable<IBuilderState>(builderState)
    testItem1 = {
      ...generateMagicItem({ id: 0, name: 'Item name 1' }),
      points: 20
    }
    testItem2 = {
      ...generateMagicItem({ id: 1, name: 'Item name 2' }),
      points: 80
    }
  })


  it('should remove correct item from unit', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({ equippedItems: [testItem1, testItem2] })
    builderState.units.push(unit)

    // Act
    Controller.unequipItem(builder, unit, 0)

    // Assert
    expect(builderState.units[0].equippedItems.length).toBe(1)
    expect(builderState.units[0].equippedItems[0].name).toBe('Item name 2')
  })


  it('should decrease army cost by correct value', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({ points: 100, equippedItems: [testItem1, testItem2] })
    builderState.armyCost = 200
    builderState.units.push(unit)

    // Act
    Controller.unequipItem(builder, unit, 1)

    // Assert
    expect(builderState.units[0].equippedItems.length).toBe(1)
    expect(builderState.units[0].equippedItems[0].name).toBe('Item name 1')
    expect(builderState.armyCost).toBe(120)
  })
})

describe('Equip upgrade', async () => {
  let builderState: IBuilderState
  let builder: Writable<IBuilderState>
  let testUpgrade: IUpgrade

  beforeEach(async () => {
    builderState = generateArmyState({})
    builder = writable<IBuilderState>(builderState)
    testUpgrade = generateUpgrade({ 
      name: 'Unit upgrade',
      pointsModify: 50
    })
  })


  it('should add correct upgrade to unit', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({})
    builderState.units.push(unit)

    // Act
    Controller.equipUpgrade(builder, unit, testUpgrade)

    // Assert
    expect(builderState.units[0].equippedUpgrades.length).toBe(1)
    expect(builderState.units[0].equippedUpgrades[0].name).toBe('Unit upgrade')
  })


  it('should increase army cost by correct value', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({})
    builderState.armyCost = 60
    builderState.units.push(unit)

    // Act
    Controller.equipUpgrade(builder, unit, testUpgrade)

    // Assert
    expect(builderState.units[0].equippedUpgrades.length).toBe(1)
    expect(builderState.armyCost).toBe(110)
  })
})

describe('Unequip upgrade', async () => {
  let builderState: IBuilderState
  let builder: Writable<IBuilderState>
  let testUpgrade1: IUpgrade
  let testUpgrade2: IUpgrade

  beforeEach(async () => {
    builderState = generateArmyState({})
    builder = writable<IBuilderState>(builderState)
    testUpgrade1 = generateUpgrade({ id: 0, name: 'Unit upgrade 1', pointsModify: 50 })
    testUpgrade2 = generateUpgrade({ id: 1, name: 'Unit upgrade 2', pointsModify: 50 })
  })


  it('should remove correct upgrade from unit', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({ equippedUpgrades: [testUpgrade1, testUpgrade2] })
    builderState.units.push(unit)

    // Act
    Controller.unequipUpgrade(builder, unit, 0)

    // Assert
    expect(builderState.units[0].equippedUpgrades.length).toBe(1)
    expect(builderState.units[0].equippedUpgrades[0].name).toBe('Unit upgrade 2')
  })


  it('should decrease army cost by correct value', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({ points: 100, equippedUpgrades: [testUpgrade1, testUpgrade2] })
    builderState.armyCost = 200
    builderState.units.push(unit)

    // Act
    Controller.unequipUpgrade(builder, unit, 1)

    // Assert
    expect(builderState.units[0].equippedUpgrades.length).toBe(1)
    expect(builderState.units[0].equippedUpgrades[0].name).toBe('Unit upgrade 1')
    expect(builderState.armyCost).toBe(150)
  })
})