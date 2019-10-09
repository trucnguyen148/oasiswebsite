import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Revenue from "@/pages/Revenue.vue";
import Information from "@/pages/Information.vue";
import Calendar from "@/pages/Calendar.vue";
import Content from "@/pages/Content.vue"
import Bills from "@/pages/Bills.vue";
import CRM from "@/pages/CRM.vue";
import Settings from "@/pages/Settings.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/revenue",
    children: [
      {
        path: "revenue",
        name: "Revenue",
        component: Revenue
      },
      {
        path: "information",
        name: "Information",
        component: Information
      },
        
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar
      },
      {
        path: "content",
        name: "Content",
        component: Content
      },
      {
        path: "bills",
        name: "Bills",
        component: Bills
      },
      {
        path: "crm",
        name: "CRM",
        component: CRM
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings
      },
      
    ]
  }
];

export default routes;
