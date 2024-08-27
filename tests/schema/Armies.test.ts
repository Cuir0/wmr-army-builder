import type { IFaction, IArmySchema, IBaseUnit, UnitType, UpgradeType } from '$types/schema'
import { readJsonFile } from '../testUtils'
import { describe, expect, expectTypeOf, it } from 'vitest'

describe('Factions schema file', async () => {
  const factions: IFaction[] = await readJsonFile('factions.json')

  describe.each(factions)('$name army', async (faction) => {
    const army: IArmySchema = await readJsonFile(`armies/${faction.fileName}.json`)


    it('should have general', async () => expect(army.units.some(u => u.type === 'General')).toBeTruthy())


    it('should have core fields', async () => {
      expect(army.name).toBe(faction.name)
      expectTypeOf(army.units).toMatchTypeOf<IBaseUnit[]>()
    })


    describe.each(army.units)('Unit $name', async (unit) => {
      it('should have core fields', async () => {
        expectTypeOf(unit.id).toMatchTypeOf<number>()
        expectTypeOf(unit.name).toMatchTypeOf<string>()
        expectTypeOf(unit.size).toMatchTypeOf<number>()
        expectTypeOf(unit.type).toMatchTypeOf<UnitType>()
        expectTypeOf(unit.points).toMatchTypeOf<number>()
        expectTypeOf(unit.attack).toMatchTypeOf<string>()
      })


      describe.runIf(['General', 'Hero', 'Wizard'].includes(unit.type))('Commander unit', async () => {
        it('should have core fields', async () => {
          expect(unit.size).toBe(1)
          expect(unit.command).toBeDefined()
        })
      })
    })

    describe.each(army.upgrades ?? [])('Upgrade $name', async (upgrade) => {
      it('should have core fields', async () => {
        expectTypeOf(upgrade.id).toMatchTypeOf<number>()
        expectTypeOf(upgrade.name).toMatchTypeOf<string>()
        expectTypeOf(upgrade.type).toMatchTypeOf<UpgradeType>()
        expectTypeOf(upgrade.pointsModify).toMatchTypeOf<number>()
      })
    })
  })
})