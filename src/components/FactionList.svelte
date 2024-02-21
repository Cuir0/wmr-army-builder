<script lang="ts">
  import type { IFaction } from '$types/Schema'
  import BuilderStore from '$builder/store'
  import FactionItem from './items/FactionItem.svelte'

  export let factions: IFaction[]

  const isSelected = (factionName: string) => BuilderStore.getState().armyName === factionName
</script>

{#each factions as faction}
  <FactionItem selected={isSelected(faction.name)} {...faction} />
{/each}