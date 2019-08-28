<template>
  <div class="content">
    <md-card>
      <sui-tab style="margin: 2rem"  :menu="{ secondary: true }">
        <sui-tab-pane title="Automations" icon="magic">
          <automations></automations>
        </sui-tab-pane>
        <sui-tab-pane title="Customers" icon="users">
          <customers></customers>
        </sui-tab-pane>
        <sui-tab-pane title="Inbox" icon="inbox">
          <inbox></inbox>
        </sui-tab-pane>
        <sui-tab-pane title="Workflows" icon="cogs">
          <workflows></workflows>
        </sui-tab-pane>
      </sui-tab>
    </md-card>
  </div>
</template>

<script>
import { Customers, Automations, Workflows } from "@/pages";
import { NavTabsCard } from "@/components";
export default {
  components: {
    Customers,
    Automations,
    Workflows
  }
};
</script>
