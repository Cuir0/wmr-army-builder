import type { IBuilderUnit, IBaseUnit, IArmySchema } from '$types/Schema'
import { get, writable } from 'svelte/store'

import * as UnitController from './unitsController'

export interface IBuilderState {
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
    units: []
  })

  return {
    subscribe: state.subscribe,
    getState: () => get(state),

    // Units functions
    initNewArmy: (armySchema: IArmySchema) => UnitController.resetState(state, armySchema),
    addUnit: (unit: IBaseUnit) => UnitController.addUnit(state, unit, 1),
    removeUnit: (unit: IBaseUnit) => UnitController.removeUnit(state, unit, 1)
  }
}

const BuilderStore = createBuilder()
export default BuilderStore