<template>
  <div v-if="!settings_permission"></div>
  <div v-else>
    <div class="content">
      <md-card>
        <sui-tab style="margin: 2rem" :menu="{ secondary: true }">
          <sui-tab-pane title="Revenue Management" icon="chart line">
            <setting-revenue></setting-revenue>
          </sui-tab-pane>
          <sui-tab-pane title="Branches and Schedule Management" icon="code branch">
            <setting-branches></setting-branches>
          </sui-tab-pane>

          <sui-tab-pane title="Content Management" icon="users">
            <setting-contents></setting-contents>
          </sui-tab-pane>
        </sui-tab>
      </md-card>
    </div>
  </div>
</template>

<script>
import {
  SettingRevenue,
  SettingBranches,
  SettingSchedule,
  SettingContents
} from "@/pages";
import { $user } from "../components/user_info";

export default {
  components: {
    SettingRevenue,
    SettingBranches,
    SettingSchedule,
    SettingContents
  },
  mounted() {
    if (!$user.permissions.includes(6)) {
      this.$router.push("/revenue");
    }
  },
  computed: {
    settings_permission() {
      return $user.permissions.includes(6);
    }
  }
};
</script>
