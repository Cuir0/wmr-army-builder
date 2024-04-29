import type { IFaction } from '$types/schema'
import { readJsonFile } from '../testUtils'
import { describe, expect, expectTypeOf, it } from 'vitest'

const FACTIONS_COUNT = 25

describe.concurrent('Factions schema file', async () => {
  const factions: IFaction[] = await readJsonFile('factions.json')


  it('should exist', async () => {
    expectTypeOf(factions).toMatchTypeOf<IFaction[]>()
  })


  it('should have correct faction count', async () => {
    expect(factions.length).toBe(FACTIONS_COUNT)
  })


  it('should have required fields', async () => {
    for (const faction of factions) {
      expectTypeOf(faction.name).toMatchTypeOf<string>()
      expectTypeOf(faction.fileName).toMatchTypeOf<string>()
    }
  })
})