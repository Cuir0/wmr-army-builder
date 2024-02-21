<script lang="ts">
  import { Link } from 'svelte-routing'

  export let name: string
  export let fileName: string
  export let selected: boolean = false
</script>

<Link to="/{ fileName }">
  <div class="px-6 py-3 text-md font-semibold text-white bg-red-500 rounded-lg shadow-lg
    hover:bg-red-700 cursor-pointer select-none {selected ? 'underline' : ''}">
    { name }
  </div>
</Link>