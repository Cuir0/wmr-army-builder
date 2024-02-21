<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import Home from './routes/Home.svelte'
  import Builder from './routes/Builder.svelte'

  export let url: string
</script>

<Router {url}>
  <Route path="/" component={Home} />
  <Route path="/:factionFile" let:params>
    <Builder factionFile={params.factionFile} />
  </Route>
</Router>