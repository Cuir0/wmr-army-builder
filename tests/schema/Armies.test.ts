import type { IFaction, IArmySchema } from '../../src/types/Schema'
import { readJsonFile } from '../TestUtils'
import { describe, expect, it } from 'vitest'

describe('Factions schema file', async () => {
  const factions: IFaction[] = await readJsonFile('factions.json')

  describe.each(factions)('$name army', async (faction) => {
    const army: IArmySchema = await readJsonFile(`armies/${faction.fileName}.json`)


    it('should have general', async () => expect(army.units.some(u => u.type === 'General')).toBeTruthy())


    it('should have core fields', async () => {
      expect(army.name).toBe(faction.name)
      expect(army.units).toBeDefined()
      expect(army.upgrades).toBeDefined()
    })


    describe.each(army.units)('Unit $name', async (unit) => {
      it('should have core fields', async () => {
        expect(unit.id).toBeDefined()
        expect(unit.name).toBeDefined()
        expect(unit.size).toBeDefined()
        expect(unit.type).toBeDefined()
        expect(unit.points).toBeDefined()
        expect(unit.attack).toBeDefined()
      })


      describe.runIf(['General', 'Hero', 'Wizard'].includes(unit.type))('Commander unit', async () => {
        it('should have core fields', async () => {
          expect(unit.size).toBe(1)
          expect(unit.command).toBeDefined()
        })
      })
    })
  })
})