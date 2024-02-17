<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import FactionList from './routes/FactionList.svelte'
  import ArmyBuilder from './routes/ArmyBuilder.svelte'

  export let url: string
</script>

<Router {url}>
  <Route path="/" component={FactionList} />
  <Route path="/:factionFile" let:params>
    <ArmyBuilder factionFile={params.factionFile} />
  </Route>
</Router>