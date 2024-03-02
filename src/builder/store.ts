import type { IBuilderUnit, IBaseUnit, IArmySchema } from '$types/Schema'
import { get, writable } from 'svelte/store'

import * as BuilderController from './builderController'

export interface IBuilderState {
  armyName: string
  armyCost: number
  armyCostLimit: number
  units: IBuilderUnit[]
  armyErrors: string[]
}

const createBuilder = () => {
  const state = writable<IBuilderState>(BuilderController.STORE_INITIAL_STATE)

  return {
    subscribe: state.subscribe,
    getState: () => get(state),

    initNewArmy: (armySchema: IArmySchema) => BuilderController.resetState(state, armySchema),
    addUnit: (unit: IBaseUnit) => BuilderController.addUnit(state, unit),
    removeUnit: (unit: IBaseUnit) => BuilderController.removeUnit(state, unit)
  }
}

const BuilderStore = createBuilder()
export default BuilderStore