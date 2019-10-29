<template>
  <div v-if="!crm_permission"></div>
  <div v-else>
    <div class="content">
      <md-card>
        <sui-tab style="margin: 2rem" :menu="{ secondary: true }">
          <sui-tab-pane title="Workflows" icon="cogs">
            <workflows></workflows>
          </sui-tab-pane>
          <sui-tab-pane title="Customers" icon="users">
            <customers></customers>
          </sui-tab-pane>
        </sui-tab>
      </md-card>
    </div>
  </div>
</template>

<script>
import { Customers, Workflows } from "@/pages";
import { NavTabsCard } from "@/components";
import { $user } from "../components/user_info";

export default {
  components: {
    Customers,
    Workflows
  },
  mounted() {
    if (!$user.permissions.includes(5)) {
      this.$router.push("/settings");
    }
  },
  computed: {
    crm_permission() {
      return $user.permissions.includes(5);
    }
  }
};
</script>
