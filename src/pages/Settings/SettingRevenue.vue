<template id="setting-revenue">
  <div v-if="!$apolloData.queries.users_permission.loading">
    <md-card>
      <md-card-header
        style="background-color: black; color: white; text-align: center; font-size: 1.5rem"
      >Revenue Management</md-card-header>
      <md-card-content>
        <div class="setting">
          <p style="margin: 0 2rem">Add</p>
          <sui-button @click.native="toggle">
            <font-awesome-icon icon="plus-circle" />
          </sui-button>
        </div>
        <sui-modal v-model="open">
          <sui-modal-header class="form-header">Add user</sui-modal-header>
          <sui-modal-content image>
            <div class="md-layout">
              <!-- Name -->
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label>Staff</label>
                  <sui-dropdown
                    fluid
                    selection
                    :options="emp_list()"
                    v-model="selected_emp_id"
                    style="margin-top: 2.5rem"
                  />
                </md-field>
              </div>
            </div>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button positive @click.native="addEmpPermission()">Add</sui-button>
          </sui-modal-actions>
        </sui-modal>
      </md-card-content>
      <!-- Show after add -->
      <!-- Revenue based on Branch -->
      <md-card-content>
        <div id="setting-revenue" class="md-layout-item md-size-100 md-size-50">
          <md-field>
            <md-table md-card>
              <md-table-row v-for="user in users_permission" v-bind:key="user.user.id">
                <md-table-cell md-label="Staff">{{user.user.name}}</md-table-cell>
                <md-table-cell md-label="email">{{user.user.email}}</md-table-cell>
                <md-table-cell md-label="remove" class="edit_button">
                  <sui-button @click.native="deletePermission(user.id)">
                    <font-awesome-icon icon="times-circle" />
                  </sui-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-field>
        </div>
      </md-card-content>
    </md-card>
  </div>
  <div v-else>
    <div class="md-layout">
      <h2>is loading...</h2>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";

const ADD_PERMISSION = gql`
  mutation($user_id: Int!, $permission: Int!) {
    createPermission(input: { user_id: $user_id, permission: $permission }) {
      id
    }
  }
`;

const DELETE_PERMISSION = gql`
  mutation($id: ID!) {
    deletePermission(id: $id) {
      id
    }
  }
`;

export default {
  name: "setting-revenue",
  data() {
    return {
      open: false,
      openEdit: false,
      selected_emp_id: ""
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    edit() {
      this.openEdit = !this.openEdit;
    },
    emp_list() {
      if (!this.is_Null_or_Undefined(this.$apolloData.data.users_type)) {
        return this.$apolloData.data.users_type.map(emp => {
          return {
            value: emp.id,
            text: emp.name
          };
        });
      }
    },
    is_Null_or_Undefined(array) {
      return array === null || array === undefined ? true : false;
    },
    addEmpPermission() {
      const user_id = this.selected_emp_id;

      this.$apollo
        .mutate({
          mutation: ADD_PERMISSION,
          variables: {
            user_id: user_id,
            permission: 1
          }
        })
        .then(() => {
          this.$apollo.queries.users_permission.refetch();
          this.toggle();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deletePermission(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_PERMISSION,
          variables: {
            id: id
          }
        })
        .then(() => {
          this.$apollo.queries.users_permission.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  apollo: {
    users_type: gql`
      {
        users_type(type: 2) {
          id
          name
        }
      }
    `,
    users_permission: gql`
      {
        users_permission(permission: 1) {
          id
          user {
            id
            name
            email
          }
        }
      }
    `
  }
};
</script>
<style></style>
