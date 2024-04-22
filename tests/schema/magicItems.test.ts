import type { IMagicItem, MagicItemType, UnitType } from '$root/src/types/Schema'
import { describe, expect, expectTypeOf, it } from 'vitest'
import { readJsonFile } from '../TestUtils'

describe('Magic items schema file', async () => {
  const magicItems: IMagicItem[] = await readJsonFile('magicItems.json')


  describe.each(magicItems)('$name item', async (item) => {
    it('should have core fields', async () => {
      expectTypeOf(item.id).toMatchTypeOf<number>()
      expectTypeOf(item.name).toMatchTypeOf<string>()
      expectTypeOf(item.type).toMatchTypeOf<MagicItemType>()
      expectTypeOf(item.pointsChange).toMatchTypeOf<number | Record<string, number>>()
      expectTypeOf(item.allowedUnits).toMatchTypeOf<UnitType[]>()
    })


    it.runIf(item.compareStat)('should have correct compare fields', async () => {
      expect(item.compareStat).toBeDefined()
      expect(item.compareStat).oneOf(['armor', 'hits'])
      expect(item.pointsChange).toBeTypeOf('object')
    })
  })
})