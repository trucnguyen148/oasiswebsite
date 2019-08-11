<template>
  <div class="content">
    <md-card>
      <sui-tab style="margin: 2rem"  :menu="{ secondary: true }">
        <sui-tab-pane title="Revenue Management" icon="chart line">
          <setting-revenue></setting-revenue>
        </sui-tab-pane>
        <sui-tab-pane title="Branches Management" icon="code branch">
          <setting-branches></setting-branches>
        </sui-tab-pane>
        <sui-tab-pane title="Schedule Management" icon="calendar alternate">
          <setting-schedule></setting-schedule>
        </sui-tab-pane>
        <sui-tab-pane title="Staff Management" icon="users">
          <setting-staffs></setting-staffs>
        </sui-tab-pane>
      </sui-tab>
    </md-card>
  </div>
</template>

<script>
import { SettingRevenue, SettingBranches, SettingSchedule, SettingStaffs } from "@/pages";

export default {
  components: {
    SettingRevenue,
    SettingBranches,
    SettingSchedule,
    SettingStaffs
  }
};
</script>
