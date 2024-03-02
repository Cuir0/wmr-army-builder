import type { IArmySchema, IBaseUnit, IBuilderUnit } from '../src/types/Schema'
import type { IBuilderState } from '../src/builder/store'
import fs from 'fs'
import path from 'path'

const PUBLIC_FOLDER_PATH = path.join(process.cwd(), 'public')

export const readJsonFile = 
(filePath: string) => {
  const result = fs.readFileSync(`${PUBLIC_FOLDER_PATH}/${filePath}`, 'utf8')
  return JSON.parse(result)
}

export const generateBasicUnit = 
(unit: Partial<IBaseUnit>): IBaseUnit => {
  return {
    id: unit.id ?? 0,
    name: unit.name ?? 'Unit name',
    attack: unit.attack ?? '1',
    max: unit.max, 
    min: unit.min,
    armyMax: unit.armyMax,
    armyMin: unit.armyMin,
    points: unit.points ?? 100,
    size: unit.size ?? 3,
    type: unit.type ?? 'Infantry'
  }
}

export const generateArmySchema = 
(schema: Partial<IArmySchema>): IArmySchema => {
  return {
    name: schema.name ?? 'Army name',
    units: schema.units ?? [],
    upgrades: schema.upgrades ?? []
  }
}

export const generateBuilderUnit = 
(unit: Partial<IBuilderUnit>): IBuilderUnit => {
  const baseUnit = generateBasicUnit({ ...unit })
  return {
    ...baseUnit,
    count: unit.count ?? 1,
    errors: unit.errors ?? []
  }
}

export const generateArmyState = 
(state: Partial<IBuilderState>) => {
  return {
    armyName: state.armyName ?? 'Army Name',
    armyCostLimit: state.armyCostLimit ?? 1000,
    armyCost: state.armyCost ?? 0,
    units: state.units ?? [],
    armyErrors: state.armyErrors ?? [],
  }
}