<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import FactionList from './routes/FactionList.svelte'
  import FactionBuilder from './routes/FactionBuilder.svelte'

  export let url: string
</script>

<Router {url}>
  <Route path="/" component={FactionList} />
  <Route path="/:factionFile" let:params>
    <FactionBuilder factionFile={params.factionFile} />
  </Route>
</Router>