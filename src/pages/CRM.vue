<template>
  <div class="content">
    <md-card>
      <sui-tab style="margin: 2rem"  :menu="{ secondary: true }">
        <sui-tab-pane title="Workflows" icon="cogs">
          <workflows></workflows>
        </sui-tab-pane>
        <sui-tab-pane title="Customers" icon="users">
          <customers></customers>
        </sui-tab-pane>
        
      </sui-tab>
    </md-card>
  </div>
</template>

<script>
import { Customers, Workflows } from "@/pages";
import { NavTabsCard } from "@/components";
export default {
  components: {
    Customers,
    Workflows
  }
};
</script>
