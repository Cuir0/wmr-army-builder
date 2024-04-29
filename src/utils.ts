import type { IBaseUnit, IMagicItem } from './types/schema'

export const fetchJsonData = 
async <T>(publicPath: string): Promise<T> => {
  const response = await fetch(publicPath, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  if (response.ok) return response.json()
  throw new Error(`Unknown error fetching data from: ${ publicPath }`)
}

export const getUnitBoundsString = 
(unit: IBaseUnit): string => unit.armyMax ? `${unit.armyMax} per army` : `${ unit.min || '-' }/${ unit.max || '-' }`

export const getItemCostForUnit =
(unit: IBaseUnit, item: IMagicItem): number => {
  if (typeof item.pointsChange === 'number') return item.pointsChange

  const unitCompareStatValue = unit[item.compareStat!]?.toString() || '-'
  return item.pointsChange[unitCompareStatValue]
}