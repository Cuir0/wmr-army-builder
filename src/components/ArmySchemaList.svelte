<script lang="ts">
  import type { IArmySchema } from "../types/Army";

  export let armySchema: IArmySchema
  const headers = ['Name', 'Type', 'Points', 'Min/Max']
</script>

<div class="font-bold">{ armySchema.name }</div>

<table class="min-w-40 divide-y divide-gray-200 text-center whitespace-nowrap">
  <thead class="bg-gray-100">
    <tr>
      {#each headers as header}
        <th class="px-3">{ header }</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each armySchema.units as unit}
      <tr class="px-3 hover:bg-gray-200 cursor-pointer select-none">
        <td>{ unit.name }</td>
        <td>{ unit.type }</td>
        <td>{ unit.points }</td>
        <td>{ unit.min || '-' }/{ unit.max || '-' }</td>
      </tr>
    {/each}
  </tbody>
</table>