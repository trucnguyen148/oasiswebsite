<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <!-- Revenue -->
      <sidebar-link to="/revenue">
        <img class="md-icon md-size-2x" src="@/assets/icons/Revenue.png" alt=""> 
        <br />
        <p>Revenue</p>
      </sidebar-link>
      <!-- Branches -->
      <sidebar-link to="/information">
        <img class="md-icon md-size-2x" src="@/assets/icons/Branches.png" >
        <br/>
        <p>Information</p>
      </sidebar-link>
      <!-- Calendar -->
      <sidebar-link to="/calendar">
        <img class="md-icon md-size-2x" src="@/assets/icons/Revenue.png" alt="">
        <p>Calendar</p>
      </sidebar-link>
      <!-- Content -->
      <sidebar-link to="/content">
        <img class="md-icon md-size-2x" src="@/assets/icons/Content.png" alt="">
        <p>Content</p>
      </sidebar-link>
      <!-- Bills -->
      <sidebar-link to="/bills">
        <img class="md-icon md-size-2x" src="@/assets/icons/Bills.png" alt="">
        <p>Bills</p>
      </sidebar-link>
      <!-- CRM -->
      <sidebar-link to="/crm">
        <img class="md-icon md-size-2x" src="@/assets/icons/CRM.png" alt="">
        <p>CRM</p>
      </sidebar-link>
      <!-- Setting -->
      <sidebar-link to="/settings">
        <img class="md-icon md-size-2x" src="@/assets/icons/Settings.png" alt="">
        <p>Setting</p>
      </sidebar-link>    
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
  }
};
</script>
