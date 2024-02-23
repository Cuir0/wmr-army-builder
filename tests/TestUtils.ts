import type { IBaseUnit } from '../src/types/Schema'
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
    points: unit.points ?? 100,
    size: unit.size ?? 3,
    type: unit.type ?? 'Infantry'
  }
}

export const generateArmyState = 
(armyCost: number, armyLimit: number): IBuilderState => {
  return {
    armyName: 'Army Name',
    armyCostLimit: armyLimit,
    armyCost,
    units: [],
    armyErrors: [],
  }
}