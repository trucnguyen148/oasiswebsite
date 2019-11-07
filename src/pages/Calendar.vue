<template>
  <div v-if="!branch_permission"></div>
  <div v-else>
    <div
      v-if="!$apolloData.queries.branches.loading && !$apolloData.queries.workTimes.loading && !$apolloData.queries.positions.loading"
      class="content md-layout"
    >
      <md-card>
        <!-- Select branch -->
        <div class="md-layout-item md-size-100">
          <md-field>
            <label>Select Branches:</label>
            <sui-dropdown
              fluid
              selection
              :options="list_branches()"
              v-model="selected_branch_id"
              style="margin-top: 2.5rem"
            />
          </md-field>
        </div>

        <!-- Select date -->
        <div class="md-layout-item md-size-100">
          <label>Select date:</label>
          <vc-date-picker
            :value="null"
            color="pink"
            is-dark
            is-inline
            style="display: block; margin-left: auto; margin-right: auto"
            v-model="selected_date"
          />
        </div>

        <!-- Show after selected -->
        <ul v-for="workTime in $apolloData.data.workTimes" v-bind:key="workTime.id">
          <li>{{ workTime.start }} - {{ workTime.end }}</li>
          <ul v-for="position in $apolloData.data.positions" v-bind:key="position.id">
            <li>{{position.name}}</li>
            <!-- Show staffs -->
            <div class="md-layout-item md-size-100">
              <md-field>
                <md-table md-card>
                  <md-table-row
                    v-for="emp in get_emp_with_position_and_worktime(workTime.id, position.id)"
                    v-bind:key="emp.id"
                  >
                    <md-table-cell md-label="Picture"></md-table-cell>
                    <md-table-cell md-label="Name">{{emp.name}}</md-table-cell>
                    <md-table-cell md-label="Phone number">{{emp.phone}}</md-table-cell>
                  </md-table-row>
                </md-table>
              </md-field>
            </div>
          </ul>
        </ul>
      </md-card>
    </div>
    <div v-else class="content">
      <div class="md-photo-loading">
        <img src="@/../public/logo.png"/>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { $user } from "../components/user_info";

export default {
  data() {
    return {
      open: false,

      selected_branch_id: "3",
      selected_date: []
    };
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
    format_selected_date() {
      let formated_date = "";

      if (this.selected_date != "") {
        formated_date = this.formatDate(this.selected_date);
      }

      return formated_date;
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return year + "-" + month + "-" + day + " 00:00:00";
    },
    list_branches() {
      let branch_list = [];
      this.$apolloData.data.branches.forEach(branch => {
        branch_list.push({
          value: branch.id,
          text: branch.name
        });
      });
      return branch_list;
    },
    get_emp_with_position_and_worktime(worktime_id, posistion_id) {
      let branch = this.get_selected_branch(this.selected_branch_id);
      let emps = branch[0].employees.filter(employee => {
        return (
          employee.worktime.id == worktime_id &&
          employee.position.id == posistion_id
        );
      });

      return emps;
    },
    get_selected_branch(branch_id) {
      let selected_branch = this.$apolloData.data.branches.filter(branch => {
        return branch.id == branch_id;
      });

      return selected_branch;
    }
  },
  apollo: {
    branches: gql`
      {
        branches {
          id
          name
          employees {
            id
            name
            phone
            worktime {
              id
            }
            position {
              id
            }
          }
        }
      }
    `,
    workTimes: gql`
      {
        workTimes {
          id
          start
          end
          employees {
            id
            name
          }
        }
      }
    `,
    positions: {
      query: gql`
        query($type: Int!) {
          positions(type: $type) {
            id
            name
          }
        }
      `,
      variables() {
        return {
          type: 2
        };
      }
    }
  }
};
</script>
