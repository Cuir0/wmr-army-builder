import type { IBuilderUnit, IBaseUnit, IArmySchema, IMagicItem, IUpgrade } from '$types/schema'
import { get, writable } from 'svelte/store'

import * as StateController from './stateController'
import * as UnitController from './unitsController'
import * as ItemsController from './itemsController'

interface ILookupData {
  readonly magicItems: readonly IMagicItem[]
  readonly upgrades: readonly IUpgrade[]
}

export interface IValidationData {
  readonly magicItems: Record<string, number>
  readonly armyUpgrades: Record<string, number>
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
    lookup: { magicItems: [], upgrades: [] },
    validation: { magicItems: {}, armyUpgrades: {} }
  })

  return {
    subscribe: state.subscribe,
    getState: () => get(state),
    initNewArmy: (armySchema: IArmySchema, items: IMagicItem[]) => StateController.resetState(state, armySchema, items),

    // Units functions
    addUnit: (unit: IBaseUnit) => UnitController.addUnit(state, unit, 1),
    removeUnit: (unit: IBaseUnit) => UnitController.removeUnit(state, unit, 1),

    // Item/Upgrade function
    equipItem: (unit: IBaseUnit, item: IMagicItem) => ItemsController.equipItem(state, unit, item),
    unequipItem: (unit: IBaseUnit, itemIdx: number) => ItemsController.unequipItem(state, unit, itemIdx),
    equipUpgrade: (unit: IBaseUnit, upgrade: IUpgrade) => ItemsController.equipUpgrade(state, unit, upgrade),
    unequipUpgrade: (unit: IBaseUnit, upgradeIdx: number) => ItemsController.unequipUpgrade(state, unit, upgradeIdx)
  }
}

const BuilderStore = createBuilder()
export default BuilderStore