<script lang="ts">
  import { Link } from 'svelte-routing'

  export let factionFile: string
</script>

<div class="grid justify-items-center">
  <Link to="/">Go back</Link>
  <div class="font-bold">{ factionFile }</div>
</div>