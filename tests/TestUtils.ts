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
(min: number | undefined, max: number | undefined): IBaseUnit => {
  return {
    id: 0,
    name: 'Unit name',
    attack: "2",
    max, 
    min,
    points: 100,
    size: 3,
    type: 'Infantry'
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