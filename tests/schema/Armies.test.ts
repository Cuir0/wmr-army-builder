import type { IFaction } from '../../src/types/Faction'
import type { IBaseUnit, IArmySchema, IUpgrade } from '../../src/types/Army'
import { readJsonFile } from '../TestUtils'
import { describe, expect, it } from 'vitest'

describe('Factions schema file', async () => {
  const factions: IFaction[] = await readJsonFile('factions.json')

  for (const faction of factions) {
    describe(`${faction.name} army`, async () => {
      const army: IArmySchema = await readJsonFile(`armies/${faction.fileName}.json`)

      it('Has general', () => expect(army.units.some(u => u.type === 'General')).toBeTruthy())

      it('Has the core fields', () => {
        expect(army.name).toBe(faction.name)
        expect(army.units).toBeTruthy()
        expect(army.upgrades).toBeTruthy()
      })
    })
  }
})