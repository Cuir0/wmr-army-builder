import type { IBuilderUnit, IBaseUnit, IArmySchema } from '$types/Schema'
import { get, writable } from 'svelte/store'

import * as BuilderController from './unitsController'

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

    initNewArmy: (armySchema: IArmySchema) => BuilderController.resetState(state, armySchema),
    addUnit: (unit: IBaseUnit) => BuilderController.addUnit(state, unit, 1),
    removeUnit: (unit: IBaseUnit) => BuilderController.removeUnit(state, unit, 1)
  }
}

const BuilderStore = createBuilder()
export default BuilderStore