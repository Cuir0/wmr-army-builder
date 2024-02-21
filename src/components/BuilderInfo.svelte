<script lang="ts">
  import { Link } from 'svelte-routing'
  import BuilderStore from '$builder/store'

  export let armyName: string
</script>

<div class="text-center font-semibold">
  <Link to="/">Return to homepage</Link>
  <div>{ armyName }</div>
  <div>Army points: { $BuilderStore.armyCost }/{ $BuilderStore.armyCostLimit }</div>
  
  {#if $BuilderStore.armyErrors.length > 0}
    <div>Army errors:</div>
    {#each $BuilderStore.armyErrors as armyError}
      <div>{ armyError }</div>
    {/each}
  {/if}
</div>
