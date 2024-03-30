import type { IBuilderUnit, IBaseUnit, IArmySchema, IMagicItem } from '$types/Schema'
import { get, writable } from 'svelte/store'

import * as UnitController from './unitsController'
import * as ItemsController from './itemsController'

export interface IBuilderState {
  armyName: string
  armyCost: number
  armyCostLimit: number
  units: IBuilderUnit[]
  magicItems: IMagicItem[]
  armyErrors: string[]
}

const createBuilder = () => {
  const state = writable<IBuilderState>({
    magicItems: [],
    armyName: '',
    armyCost: 0,
    armyCostLimit: 2000,
    armyErrors: [],
    units: []
  })

  return {
    subscribe: state.subscribe,
    getState: () => get(state),

    // Units functions
    initNewArmy: (armySchema: IArmySchema, items: IMagicItem[]) => UnitController.resetState(state, armySchema, items),
    addUnit: (unit: IBaseUnit) => UnitController.addUnit(state, unit, 1),
    removeUnit: (unit: IBaseUnit) => UnitController.removeUnit(state, unit, 1),

    // Items function
    equipItem: (unit: IBaseUnit, item: IMagicItem) => ItemsController.equipItem(state, unit, item),
    unequipItem: (unit: IBaseUnit, itemIdx: number) => ItemsController.unequipItem(state, unit, itemIdx)
  }
}

const BuilderStore = createBuilder()
export default BuilderStore