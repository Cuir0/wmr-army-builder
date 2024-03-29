import type { IFaction } from '../../src/types/Schema'
import { readJsonFile } from '../TestUtils'
import { describe, expect, it } from 'vitest'

const FACTIONS_COUNT = 25

describe.concurrent('Factions schema file', async () => {
  const factions: IFaction[] = await readJsonFile('factions.json')


  it('should exist', async () => {
    expect(factions).toBeDefined()
  })


  it('should have correct faction count', async () => {
    expect(factions.length).toBe(FACTIONS_COUNT)
  })


  it('should have required fields', async () => {
    for (const faction of factions) {
      expect(faction.name).toBeDefined()
      expect(faction.fileName).toBeDefined()
    }
  })
})