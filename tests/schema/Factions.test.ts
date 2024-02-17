import type { IFaction } from '../../src/types/Schema'
import { readJsonFile } from '../TestUtils'
import { describe, expect, it } from 'vitest'

const FACTIONS_COUNT = 25

describe('Factions schema file', async () => {
  const factions: IFaction[] = await readJsonFile('factions.json')

  it('should exist', () => {
    expect(factions).toBeDefined()
  })

  it('should have correct faction count', () => {
    expect(factions.length).toBe(FACTIONS_COUNT)
  })

  it('should have required fields', () => {
    for (const faction of factions) {
      expect(faction.name).toBeDefined()
      expect(faction.fileName).toBeDefined()
    }
  })
})