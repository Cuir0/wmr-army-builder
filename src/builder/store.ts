import type { IBuilderUnit, IBaseUnit, IArmySchema, IMagicItem } from '$types/Schema'
import { get, writable } from 'svelte/store'

import * as StateController from './stateController'
import * as UnitController from './unitsController'
import * as ItemsController from './itemsController'

interface ILookupData {
  readonly magicItems: readonly IMagicItem[]
}

interface IValidationData {
  readonly magicItems: { [key: string]: number }
}

export interface IBuilderState {
  readonly lookup: ILookupData
  readonly validation: IValidationData
  armyName: string
  armyCost: number
  armyCostLimit: number
  units: IBuilderUnit[]
  armyErrors: string[]
}

const createBuilder = () => {
  const state = writable<IBuilderState>({
    armyName: '',
    armyCost: 0,
    armyCostLimit: 2000,
    armyErrors: [],
    units: [],
    lookup: { magicItems: [] },
    validation: { magicItems: {} }
  })

  return {
    subscribe: state.subscribe,
    getState: () => get(state),
    initNewArmy: (armySchema: IArmySchema, items: IMagicItem[]) => StateController.resetState(state, armySchema, items),

    // Units functions
    addUnit: (unit: IBaseUnit) => UnitController.addUnit(state, unit, 1),
    removeUnit: (unit: IBaseUnit) => UnitController.removeUnit(state, unit, 1),

    // Items function
    equipItem: (unit: IBaseUnit, item: IMagicItem) => ItemsController.equipItem(state, unit, item),
    unequipItem: (unit: IBaseUnit, itemIdx: number) => ItemsController.unequipItem(state, unit, itemIdx)
  }
}

const BuilderStore = createBuilder()
export default BuilderStore