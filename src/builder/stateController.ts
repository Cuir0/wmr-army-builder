import type { IArmySchema, IMagicItem, IUpgrade } from '$types/schema'
import type { Writable } from 'svelte/store'
import type { IBuilderState, IValidationData } from './store'

import { addUnit } from './unitsController'

const createValidatorLookup =
(items: IMagicItem[], armySchema: IArmySchema): IValidationData => {
  const magicItemsLookup: Record<string, number> = {}
  items.forEach(mi => magicItemsLookup[mi.name] = 0)

  const upgradesLookup: Record<string, number> = {}
  armySchema.upgrades?.filter(upg => upg.armyMax).forEach(upg => upgradesLookup[upg.name] = 0)

  const armyAugments: Record<number, number> = {}
  armySchema.unitAugments?.forEach(aug => armyAugments[aug.id] = 0)

  return {
    magicItems: magicItemsLookup,
    armyUpgrades: upgradesLookup,
    armyAugments: armyAugments
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
      validation: createValidatorLookup(items, armySchema),
      lookup: {
        magicItems: items,
        upgrades: armySchema.upgrades,
        augments: armySchema.unitAugments
      }
    }
    return s
  })

  setRequiredUnits(state, armySchema)
}