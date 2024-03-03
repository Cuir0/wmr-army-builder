import type { IBaseUnit } from './types/Schema'

export const fetchJsonData = 
async (publicPath: string) => {
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