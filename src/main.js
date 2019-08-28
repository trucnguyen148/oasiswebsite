// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// Semantic Vue
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import "./../../oasiswebsite/index.js/src/definitions/collections/menu.scss";
import "./../../oasiswebsite/index.js/src/definitions/elements/image.scss";
import "./../../oasiswebsite/index.js/src/definitions/elements/button.scss";
import "./../../oasiswebsite/index.js/src/definitions/modules/checkbox.scss";
import "./../../oasiswebsite/index.js/src/definitions/views/card.scss";
import "./../../oasiswebsite/index.js/src/definitions/modules/sidebar.scss";
Vue.use(SuiVue);

// Calendar picker
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc' 
});

// Date picker
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);


// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlusCircle, faTimesCircle, faEdit, faPlus, faClock, faBox, faCog, faCodeBranch, faInbox, faMagic, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { createProvider } from './vue-apollo'

library.add(faPlusCircle, faTimesCircle, faEdit, faPlus, faClock, faBox, faCog, faCodeBranch, faInbox, faMagic, faProjectDiagram);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  apolloProvider: createProvider(),

  data: {
    Chartist: Chartist
  }
});
