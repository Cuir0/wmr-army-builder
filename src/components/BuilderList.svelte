<script lang="ts">
  import BuilderStore from '$builder/store'
  import BuilderItem from './items/BuilderItem.svelte'
</script>

<div class="w-1/3 divide-y divide-gray-200 text-center">
  <div class="flex bg-gray-100 font-semibold">
    <div class="w-1/5">Count</div>
    <div class="w-1/5">Name</div>
    <div class="w-1/5">Type</div>
    <div class="w-1/5">Points</div>
    <div class="w-1/5">Min/Max</div>
  </div>
  {#each $BuilderStore.units as unit}
    <BuilderItem {unit} />
  {/each}
</div>