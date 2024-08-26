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

  const armyStands: Record<string, { count: number, max?: number }> = {}
  armySchema.stands?.forEach(stand => armyStands[stand.name] = { count: 0, max: stand.max })

  return {
    magicItems: magicItemsLookup,
    armyUpgrades: upgradesLookup,
    armyStands: armyStands
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
        stands: armySchema.stands
      }
    }
    return s
  })

  setRequiredUnits(state, armySchema)
}