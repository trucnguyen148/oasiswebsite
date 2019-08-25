
// Information
import Branch from "../pages/Information/Branch.vue";
import Product from "../pages/Information/Product.vue";
import Service from "../pages/Information/Service.vue";
import Staff from "../pages/Information/Staff.vue";
import WorkingTime from "../pages/Information/WorkingTime.vue"

export { Branch, Product, Service, Staff, WorkingTime };
// Informationt - ProductPage
import Detail from "../pages/Information/ProductPage/Detail.vue";
export { Detail };

// Bills
import WaitingBills from "../pages/Bills/WaitingBills.vue";
import CreateBill from "../pages/Bills/CreateBill.vue";
import SearchBill from "../pages/Bills/SearchBill.vue";

export {WaitingBills, CreateBill, SearchBill};

// Setting
import SettingRevenue from "../pages/Settings/SettingRevenue.vue";
import SettingBranches from "../pages/Settings/SettingBranches.vue";
import SettingSchedule from "../pages/Settings/SettingSchedule.vue";
import SettingStaffs from "../pages/Settings/SettingStaffs.vue";

export {SettingRevenue, SettingBranches, SettingSchedule, SettingStaffs}

// Content
import HotDeal from "../pages/Contents/HotDeal.vue";
import Collection from "../pages/Contents/Collection.vue";

export {HotDeal, Collection}

// CRM
import Inbox from "../pages/CRM/Inbox.vue";
import Customers from "../pages/CRM/Customers.vue";
import Automations from "../pages/CRM/Automations.vue";
import Workflows from "../pages/CRM/Workflows.vue";

export  { Inbox, Customers, Automations, Workflows }

// CRM - Automation
import CreateAutomation from "../pages/CRM/Automations/CreateAutomation.vue";

export { CreateAutomation };

// CRM - Customers
import UserCard from "../pages/CRM/UserProfiles/UserCard.vue";
import AddUser from "../pages/CRM/UserProfiles/AddUser.vue";

export { UserCard, AddUser };

// CRM - Workflows
import Information from "../pages/CRM/Workflows/Information.vue";
import TasksReminders from "../pages/CRM/Workflows/TasksReminders.vue";
import Chat from "../pages/CRM/Workflows/Chat.vue";

export { Information, TasksReminders, Chat };