import type { IBuilderUnit } from '$types/Builder'
import type { IBaseUnit } from '$types/Army'
import { writable } from 'svelte/store'
import * as BuilderController from './builderController'

export interface IBuilderState {
  armyCost: number
  armyCostLimit: number
  units: IBuilderUnit[]
}

const createBuilder = () => {
  const state = writable<IBuilderState>({
    armyCostLimit: 2000,
    armyCost: 0,
    units: []
  })

  return {
    subscribe: state.subscribe,

    addUnit: (unit: IBaseUnit) => BuilderController.addUnit(state, unit),
    removeUnit: (unit: IBaseUnit) => BuilderController.removeUnit(state, unit)
  }
}

const BuilderStore = createBuilder()
export default BuilderStore