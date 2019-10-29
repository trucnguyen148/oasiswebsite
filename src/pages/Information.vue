<template>
  <div v-if="!branch_permission"></div>
  <div v-else>
    <div class="content">
      <md-card>
        <sui-tab style="margin: 2rem" :menu="{ secondary: true }">
          <sui-tab-pane title="Branches" icon="code branch">
            <branch></branch>
          </sui-tab-pane>
          <sui-tab-pane title="Products" icon="boxes">
            <product></product>
          </sui-tab-pane>
          <sui-tab-pane title="Services" icon="opencart">
            <service></service>
          </sui-tab-pane>
          <sui-tab-pane title="Staffs" icon="users">
            <staff></staff>
          </sui-tab-pane>
          <sui-tab-pane title="Working Times" icon="clock">
            <working-time></working-time>
          </sui-tab-pane>
        </sui-tab>
      </md-card>
    </div>
  </div>
</template>

<script>
import { Branch, Product, Service, Staff, WorkingTime } from "@/pages";
import { $user } from "../components/user_info";

export default {
  components: {
    Branch,
    Product,
    Service,
    Staff,
    WorkingTime
  },
  mounted() {
    if (!$user.permissions.includes(2)) {
      this.$router.push("/content");
    }
  },
  computed: {
    branch_permission() {
      return $user.permissions.includes(2);
    },
  }
};
</script>

