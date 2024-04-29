<script lang="ts">
  import type { IBuilderUnit } from '$types/schema'

  export let isErrorListVisible: boolean
  export let unit: IBuilderUnit
</script>

{#if isErrorListVisible && unit.errors.length > 0}
  <div class="absolute rounded px-2 py-1 bg-rose-400 z-50 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    {#each unit.errors as error} <div>{ error }</div> {/each}
  </div>
{/if}