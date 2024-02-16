<script lang="ts">
  import type { IBaseUnit } from '../types/Army'
  import BuilderStore from '../builder/store'

  const headers = ['Count', 'Name', 'Type', 'Points', 'Min/Max']
  const removeUnit = (unitData: IBaseUnit) => BuilderStore.removeUnit(unitData)
</script>

<table class="w-1/3 divide-y divide-gray-200 text-center whitespace-nowrap">
  <thead class="bg-gray-100">
    <tr class="select-none">
      {#each headers as header}<th class="px-3">{ header }</th>{/each}
    </tr>
  </thead>
  <tbody>
    {#each $BuilderStore.units as builderUnit}
      <tr on:click={() => removeUnit(builderUnit)} class="px-3 hover:bg-gray-200 cursor-pointer select-none">
        <td>{ builderUnit.count }</td>
        <td>{ builderUnit.name }</td>
        <td>{ builderUnit.type }</td>
        <td>{ builderUnit.points * builderUnit.count }</td>
        <td>{ builderUnit.min || '-' }/{ builderUnit.max || '-' }</td>
      </tr>
    {/each}
  </tbody>
</table>