<template>
  <div v-if="!$apolloData.queries.branches.loading">
    <md-card>
      <md-card-header data-background-color="black">
        <h3 class="title">Branch</h3>
      </md-card-header>
      <md-card-content>
        <div class="setting">
          <p style="margin: 0 2rem 0 3rem">Add</p>
          <sui-button @click.native="toggle">
            <font-awesome-icon icon="plus-circle" />
          </sui-button>
          <sui-modal v-model="open">
            <sui-modal-header class="form-header">Add branch</sui-modal-header>
            <sui-modal-header class="form-header">Add branch</sui-modal-header>
            <sui-modal-content image>
              <div class="md-layout">
                <!-- Name -->
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Name</label>
                    <md-input v-model="addBranchParams.name" type="text" required></md-input>
                  </md-field>
                </div>

                <!-- Address -->
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Adress</label>
                    <md-input v-model="addBranchParams.address" type="text"></md-input>
                  </md-field>
                </div>

                <!-- Phone number -->
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Phone Number</label>
                    <md-input v-model="addBranchParams.phone" type="number" required></md-input>
                  </md-field>
                </div>
              </div>
            </sui-modal-content>
            <sui-modal-actions>
              <sui-button data-background-color="purple" positive @click.native="addBranch">Create</sui-button>
            </sui-modal-actions>
          </sui-modal>
        </div>
        <!-- Show after add -->
        <div class="md-layout-item md-size-100 md-size-50">
          <md-field>
            <md-table md-card>
              <md-table-row
                v-for="branch in $apolloData.data.branches"
                v-bind:key="branch.id"
                v-bind:name="branch.name"
                v-bind:address="branch.address"
              >
                <md-table-cell md-label="Branch">{{ branch.name}}</md-table-cell>
                <md-table-cell md-label="Phone">{{ branch.phone }}</md-table-cell>
                <md-table-cell md-label="Address">{{ branch.address }}</md-table-cell>

                <md-table-cell md-label="remove" class="edit_button">
                  <sui-button @click.native="toggleEdit(branch)">
                    <font-awesome-icon icon="edit" />
                  </sui-button>
                  <sui-button @click.native="deleteBranch(branch.id)">
                    <font-awesome-icon icon="times-circle" />
                  </sui-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-field>
        </div>

        <!-- Show edit -->
        <sui-modal v-model="openEdit">
          <sui-modal-header class="form-header">Update branch</sui-modal-header>
          <sui-modal-content image>
            <div class="md-layout">
              <!-- Name -->
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label>Name</label>
                  <md-input v-model="updateBranchParams.name" type="text" required></md-input>
                </md-field>
              </div>

              <!-- Address -->
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>Adress</label>
                  <md-input v-model="updateBranchParams.address" type="text"></md-input>
                </md-field>
              </div>

              <!-- Phone number -->
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Phone Number</label>
                  <md-input v-model="updateBranchParams.phone" type="number" required></md-input>
                </md-field>
              </div>
            </div>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button positive @click.native="updateBranch()">Update</sui-button>
          </sui-modal-actions>
        </sui-modal>
      </md-card-content>
    </md-card>
  </div>
  <div v-else>
    <div class="md-layout"><h2>is loading...</h2></div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const ADD_BRANCH = gql`
  mutation($name: String!, $phone: String!, $address: String) {
    createBranch(input: { name: $name, phone: $phone, address: $address }) {
      id
      name
      phone
      address
    }
  }
`;
const DELETE_BRANCH = gql`
  mutation($id: ID!) {
    deleteBranch(id: $id) {
      id
      name
      phone
      address
    }
  }
`;
const UPDATE_BRANCH = gql`
  mutation($id: ID!, $name: String!, $phone: String!, $address: String) {
    updateBranch(
      id: $id
      input: { name: $name, phone: $phone, address: $address }
    ) {
      id
    }
  }
`;

export default {
  name: "branch",
  data() {
    return {
      addBranchParams: {
        name: "",
        address: "",
        phone: ""
      },
      updateBranchParams: {
        id: "",
        name: "",
        address: "",
        phone: ""
      },
      open: false,
      openEdit: false
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    toggleEdit(branch) {
      this.updateBranchParams.id = branch.id;
      this.updateBranchParams.name = branch.name;
      this.updateBranchParams.address = branch.address;
      this.updateBranchParams.phone = branch.phone;
      this.openEdit = !this.openEdit;
    },
    addBranch() {
      const name = this.addBranchParams.name;
      const address = this.addBranchParams.address;
      const phone = this.addBranchParams.phone;
      // We clear it early to give the UI a snappy feel
      this.addBranchParams = {
        name: "",
        address: "",
        phone: ""
      };
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: ADD_BRANCH,
          variables: {
            name: name,
            address: address,
            phone: phone
          }
        })
        .then(data => {
          console.log(data);
          this.open = !this.open;
          this.$apollo.queries.branches.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateBranch() {
      const id = this.updateBranchParams.id;
      const name = this.updateBranchParams.name;
      const address = this.updateBranchParams.address;
      const phone = this.updateBranchParams.phone;
      // We clear it early to give the UI a snappy feel
      this.updateBranchParams = {
        id: "",
        name: "",
        address: "",
        phone: ""
      };
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: UPDATE_BRANCH,
          variables: {
            id: id,
            name: name,
            address: address,
            phone: phone
          }
        })
        .then(data => {
          console.log(data);
          this.openEdit = !this.openEdit;
          this.$apollo.queries.branches.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteBranch(id) {
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: DELETE_BRANCH,
          variables: {
            id: id
          }
        })
        .then(data => {
          console.log(data);
          this.$apollo.queries.branches.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  apollo: {
    branches: gql`
      {
        branches {
          id
          name
          phone
          address
          is_active
        }
      }
    `
  }
};
</script>

<style>
</style>

