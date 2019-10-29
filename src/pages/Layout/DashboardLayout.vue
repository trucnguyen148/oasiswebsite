<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <!-- Revenue -->
      <div v-if="revenue_permission">
        <sidebar-link to="/revenue">
          <img class="md-icon md-size-2x" src="@/assets/icons/Revenue.png" alt />
          <br />
          <p>Revenue</p>
        </sidebar-link>
      </div>

      <div v-if="branch_permission">
        <!-- Branches -->
        <sidebar-link to="/information">
          <img class="md-icon md-size-2x" src="@/assets/icons/Branches.png" />
          <br />
          <p>Information</p>
        </sidebar-link>
      </div>

      <div v-if="branch_permission">
        <!-- Calendar -->
        <sidebar-link to="/calendar">
          <img class="md-icon md-size-2x" src="@/assets/icons/Revenue.png" alt />
          <p>Calendar</p>
        </sidebar-link>
      </div>

      <div v-if="content_permission">
        <!-- Content -->
        <sidebar-link to="/content">
          <img class="md-icon md-size-2x" src="@/assets/icons/Content.png" alt />
          <p>Content</p>
        </sidebar-link>
      </div>

      <div v-if="casher_permission">
        <!-- Bills -->
        <sidebar-link to="/bills">
          <img class="md-icon md-size-2x" src="@/assets/icons/Bills.png" alt />
          <p>Bills</p>
        </sidebar-link>
      </div>

      <div v-if="crm_permission">
        <!-- CRM -->
        <sidebar-link to="/crm">
          <img class="md-icon md-size-2x" src="@/assets/icons/CRM.png" alt />
          <p>CRM</p>
        </sidebar-link>
      </div>

      <div v-if="settings_permission">
        <!-- Setting -->
        <sidebar-link to="/settings">
          <img class="md-icon md-size-2x" src="@/assets/icons/Settings.png" alt />
          <p>Setting</p>
        </sidebar-link>
      </div>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import { $user } from "../../components/user_info";

export default {
  components: {
    TopNavbar,
    DashboardContent
  },
  data() {
    return {
      open: true,
      user: {
        login: false,
        phone: "0123345",
        password: "nam123"
      }
    };
  },
  computed: {
    revenue_permission() {
      return $user.permissions.includes(1);
    },
    branch_permission() {
      return $user.permissions.includes(2);
    },
    content_permission() {
      return $user.permissions.includes(3);
    },
    casher_permission() {
      return $user.permissions.includes(4);
    },
    crm_permission() {
      return $user.permissions.includes(5);
    },
    settings_permission() {
      return $user.permissions.includes(6);
    }
  }
};
</script>
