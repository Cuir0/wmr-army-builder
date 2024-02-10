import type { IFaction } from '../../src/types/Faction'
import type { IBaseUnit, IArmySchema, IUpgrade } from '../../src/types/Army'
import { readJsonFile } from '../TestUtils'
import { describe, expect, it } from 'vitest'

describe('Factions schema file', async () => {
  const factions: IFaction[] = await readJsonFile('factions.json')

  for (const faction of factions) {
    describe(`${faction.name} army`, async () => {
      const army: IArmySchema = await readJsonFile(`armies/${faction.fileName}.json`)

      it('should have general', () => expect(army.units.some(u => u.type === 'General')).toBeTruthy())

      it('should have core fields', () => {
        expect(army.name).toBe(faction.name)
        expect(army.units).toBeDefined()
        expect(army.upgrades).toBeDefined()
      })

      for (const unit of army.units) {
        describe(`Unit ${unit.name}`, async () => {
          it('should have core fields', async () => {
            expect(unit.id).toBeDefined()
            expect(unit.name).toBeDefined()
            expect(unit.size).toBeDefined()
            expect(unit.type).toBeDefined()
            expect(unit.points).toBeDefined()
            expect(unit.attack).toBeDefined()
          })
          
          if (['General', 'Hero', 'Wizard'].includes(unit.type)) {
            describe('Commander unit', async () => {
              it('should have core fields', async () => {
                expect(unit.size).toBe(1)
                expect(unit.command).toBeDefined()
              })
            })
          }
        })
      }
    })
  }
})