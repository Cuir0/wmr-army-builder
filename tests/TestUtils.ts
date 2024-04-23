import type { IArmySchema, IBaseUnit, IBuilderUnit, IMagicItem, IUpgrade } from '../src/types/Schema'
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
    errors: unit.errors ?? [],
    equippedItems: unit.equippedItems ?? [],
    equippedUpgrades: unit.equippedUpgrades ?? []
  }
}

export const generateMagicItem = 
(mi: Partial<IMagicItem>): IMagicItem => {
  return {
    id: mi.id ?? 0,
    name: mi.name ?? 'MagicItem name',
    type: mi.type ?? 'Magic Weapon',
    compareStat: mi.compareStat,
    pointsChange: mi.pointsChange ?? 10,
    allowedUnits: mi.allowedUnits ?? ['Infantry']
  }
}

export const generateUpgrade = 
(upg: Partial<IUpgrade>): IUpgrade => {
  return {
    ...upg,
    id: upg.id ?? 0,
    name: upg.name ?? 'Upgrade name',
    type: upg.type ?? 'Monstrous Mount',
    pointsModify: upg.pointsModify ?? 50
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
    lookup: state.lookup ?? { magicItems: [], upgrades: [] },
    validation: state.validation ?? { magicItems: {}, armyUpgrades: {} }
  }
}