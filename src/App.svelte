<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import FactionList from './routes/FactionList.svelte'

  export let url: string = '';
</script>

<Router {url}>
  <Route path="/" component={FactionList} />
</Router>