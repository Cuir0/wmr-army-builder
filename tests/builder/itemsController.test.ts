import type { IBuilderMagicItem, IBuilderUnit } from '$root/src/types/Schema'
import type { IBuilderState } from '$root/src/builder/store'

import { describe, expect, it } from 'vitest'
import { writable } from 'svelte/store'
import { 
  generateArmyState, 
  generateBuilderUnit, 
  generateMagicItem 
} from '../TestUtils'

import * as Controller from '$root/src/builder/itemsController'

describe.concurrent('Equip item', async () => {
  const testItem = generateMagicItem({ 
    name: 'Unit magic item',
    pointsChange: 40 
  })


  it('should add correct item to unit', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({})
    const builderState = generateArmyState({})
    builderState.units.push(unit)

    const builder = writable<IBuilderState>(builderState)

    // Act
    Controller.equipItem(builder, unit, testItem)

    // Assert
    expect(builderState.units[0].equippedItems.length).toBe(1)
    expect(builderState.units[0].equippedItems[0].name).toBe('Unit magic item')
  })


  it('should increase army cost by correct value', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({})
    const builderState = generateArmyState({ armyCost: 60 })
    builderState.units.push(unit)

    const builder = writable<IBuilderState>(builderState)

    // Act
    Controller.equipItem(builder, unit, testItem)

    // Assert
    expect(builderState.units[0].equippedItems.length).toBe(1)
    expect(builderState.armyCost).toBe(100)
  })
})

describe.concurrent('Unequip item', async () => {
  const testItem1: IBuilderMagicItem = {
    ...generateMagicItem({ id: 0, name: 'Item name 1' }),
    points: 20
  }
  const testItem2: IBuilderMagicItem = {
    ...generateMagicItem({ id: 1, name: 'Item name 2' }),
    points: 80
  }


  it('should remove correct item from unit', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({ equippedItems: [testItem1, testItem2] })
    const builderState = generateArmyState({})
    builderState.units.push(unit)

    const builder = writable<IBuilderState>(builderState)

    // Act
    Controller.unequipItem(builder, unit, 0)

    // Assert
    expect(builderState.units[0].equippedItems.length).toBe(1)
    expect(builderState.units[0].equippedItems[0].name).toBe('Item name 2')
  })


  it('should remove correct item from unit', async () => {
    // Arrange
    const unit: IBuilderUnit = generateBuilderUnit({ points: 100, equippedItems: [testItem1, testItem2] })
    const builderState = generateArmyState({ armyCost: 200 })
    builderState.units.push(unit)

    const builder = writable<IBuilderState>(builderState)

    // Act
    Controller.unequipItem(builder, unit, 1)

    // Assert
    expect(builderState.units[0].equippedItems.length).toBe(1)
    expect(builderState.units[0].equippedItems[0].name).toBe('Item name 1')
    expect(builderState.armyCost).toBe(120)
  })
})