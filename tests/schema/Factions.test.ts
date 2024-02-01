import type { IFaction } from '../../src/types/Faction'
import { readJsonFile } from '../TestUtils'
import { describe, expect, it } from 'vitest'

describe('Factions schema file', async () => {
  const factions: IFaction[] = await readJsonFile('factions.json')

  it('Exists', () => {
    expect(factions).toBeDefined()
  })

  it('Has correct faction count', () => {
    expect(factions.length).toBe(25)
  })

  it('Has required fields', () => {
    for (const faction of factions) {
      expect(faction.name).toBeDefined()
      expect(faction.fileName).toBeDefined()
    }
  })
})