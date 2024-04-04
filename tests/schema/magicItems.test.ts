import type { IMagicItem } from '$root/src/types/Schema'
import { describe, expect, it } from 'vitest'
import { readJsonFile } from '../TestUtils'

describe('Magic items schema file', async () => {
  const magicItems: IMagicItem[] = await readJsonFile('magicItems.json')


  describe.each(magicItems)('$name item', async (item) => {
    it('should have core fields', async () => {
      expect(item.id).toBeDefined()
      expect(item.name).toBeDefined()
      expect(item.type).toBeDefined()
      expect(item.pointsChange).toBeDefined()
      expect(item.allowedUnits).toBeDefined()
    })


    it.runIf(item.compareStat)('should have correct compare fields', async () => {
      expect(item.compareStat).toBeTypeOf('string')
      expect(item.compareStat).oneOf(['armor', 'hits'])
      expect(item.pointsChange).toBeTypeOf('object')
    })
  })
})