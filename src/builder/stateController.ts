import type { IArmySchema, IMagicItem, IUpgrade } from '$types/schema'
import type { Writable } from 'svelte/store'
import type { IBuilderState, IValidationData } from './store'

import { addUnit } from './unitsController'

const createValidatorLookup =
(items: IMagicItem[], upgrades: IUpgrade[]): IValidationData => {
  const magicItemsLookup: Record<string, number> = {}
  items.forEach(mi => magicItemsLookup[mi.name] = 0)

  const armyUpgradesLookup: Record<string, number> = {}
  upgrades
    .filter(upg => upg.armyMax)
    .forEach(upg => armyUpgradesLookup[upg.name] = 0)

  return {
    magicItems: magicItemsLookup,
    armyUpgrades: armyUpgradesLookup
  }
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
      validation: createValidatorLookup(items, armySchema.upgrades),
      lookup: {
        magicItems: items,
        upgrades: armySchema.upgrades
      }
    }
    return s
  })

  setRequiredUnits(state, armySchema)
}