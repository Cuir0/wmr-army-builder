import type { IBuilderState } from '$root/src/builder/store'

import { beforeEach, describe, expect, it } from 'vitest'
import { get, writable, type Writable } from 'svelte/store'
import {
  generateArmySchema,
  generateArmyState,
  generateBasicUnit,
} from '../TestUtils'

import * as Controller from '$root/src/builder/stateController'

describe('Reset builder state', async () => {
  let builder: Writable<IBuilderState>

  beforeEach(() => {
    builder = writable<IBuilderState>(generateArmyState({}))
  })


  it('should set correct builder army name', async () => {
    // Act
    Controller.resetState(builder, generateArmySchema({ name: 'Schama army name' }), [])

    // Assert
    const builderState = get(builder)
    expect(builderState.armyName).toBe('Schama army name')
  })


  it('should add minimal required units', async () => {
    // Arrange
    const unit1 = generateBasicUnit({ id: 0, name: 'Unit 1', min: 3, points: 10 })
    const unit2 = generateBasicUnit({ id: 1, name: 'Unit 2', min: 1, points: 100 })
    const general = generateBasicUnit({ id: 2, name: 'General unit', type: 'General', points: 5 })

    // Act
    Controller.resetState(builder, generateArmySchema({ units: [unit1, unit2, general] }), [])

    // Assert
    const builderState = get(builder)
    expect(builderState.armyCost).toBe(135)
    expect(builderState.units.length).toBe(3)
    expect(builderState.units.find(u => u.name === 'Unit 1')).toBeDefined()
    expect(builderState.units.find(u => u.name === 'Unit 2')).toBeDefined()
    expect(builderState.units.find(u => u.name === 'General unit')).toBeDefined()
  })
})
