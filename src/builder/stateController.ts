import type { IArmySchema, IMagicItem } from '../types/Schema'
import type { Writable } from 'svelte/store'
import type { IBuilderState } from './store'

import { addUnit } from './unitsController'

const createValidatorLookup =
(items: IMagicItem[]): { [key: string]: number } => {
  const validatorLookup: { [key: string]: number } = {}
  items.forEach(mi => validatorLookup[mi.name] = 0)
  return validatorLookup
}

const setRequiredUnits = 
(state: Writable<IBuilderState>, armySchema: IArmySchema) => {
  armySchema.units.forEach(schemaUnit => {
    if (schemaUnit.min) {
      addUnit(state, schemaUnit, schemaUnit.min)
      return
    }

    if (schemaUnit.type === 'General') addUnit(state, schemaUnit, 1)
  })
}

export const resetState =
(state: Writable<IBuilderState>, armySchema: IArmySchema, items: IMagicItem[]) => {
  state.update(s => {
    s = {
      armyName: armySchema.name,
      armyCost: 0,
      armyCostLimit: 2000,
      armyErrors: [],
      units: [],
      lookup: {
        magicItems: items 
      },
      validation: {
        magicItems: createValidatorLookup(items)
      }
    }
    return s
  })

  setRequiredUnits(state, armySchema)
}