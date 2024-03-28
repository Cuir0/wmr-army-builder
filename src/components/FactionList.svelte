<script lang="ts">
  import type { IFaction } from '$types/Schema'
  import { Link } from 'svelte-routing'
  import BuilderStore from '$builder/store'

  export let factions: IFaction[]
  const isSelected = (factionName: string) => BuilderStore.getState().armyName === factionName
</script>

{#each factions as faction}
  <Link to="/{ faction.fileName }">
    <div class="px-6 py-3 text-md font-semibold text-white bg-red-500 rounded-lg shadow-lg
      hover:bg-red-700 cursor-pointer select-none {isSelected(faction.name) ? 'underline' : ''}"
    >
      { faction.name }
    </div>
  </Link>
{/each}