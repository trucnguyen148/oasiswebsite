<template>
  <div
    v-if="!$apolloData.queries.employees.loading &&
            !$apolloData.queries.branches.loading &&
            !$apolloData.queries.workTimes.loading &&
            !$apolloData.queries.positions.loading"
    class="content md-layout"
  >
    <md-card>
      <md-card-header data-background-color="black">
        <h3 class="title">Staffs</h3>
      </md-card-header>
      <md-card-content>
        <div class="setting">
          <p style="margin: 0 2rem 0 3rem">Add</p>
          <sui-button @click.native="toggle">
            <font-awesome-icon icon="plus-circle" />
          </sui-button>
        </div>
        <!-- Add more staff -->
        <sui-modal v-model="open">
          <sui-modal-header class="form-header">Add new staff</sui-modal-header>
          <sui-modal-content>
            <div class="md-layout">
              <div class="md-layout-item md-smal-size-100 md-size-50">
                <md-field>
                  <label>Name</label>
                  <md-input v-model="addEmpParams.name" type="text" required></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Gender*</label>
                  <sui-dropdown
                    fluid
                    placeholder="Select gender"
                    selection
                    :options="gender"
                    v-model="addEmpParams.gender"
                    style="margin-top: 2.5rem"
                  />
                </md-field>
              </div>

              <div class="md-layout-item md-smal-size-100 md-size-50">
                <md-field>
                  <label>Phone</label>
                  <md-input v-model="addEmpParams.phone" type="text" required></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-smal-size-100 md-size-50">
                <md-field>
                  <label>Email</label>
                  <md-input v-model="addEmpParams.email" type="email" required></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-smal-size-100 md-size-50">
                <md-field>
                  <label>Facebook</label>
                  <md-input v-model="addEmpParams.facebook" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-smal-size-100 md-size-50">
                <md-field>
                  <label>DOB</label>
                  <md-input v-model="addEmpParams.dob" type="date" place-holder="DD/MM/Y"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>Address</label>
                  <md-input v-model="addEmpParams.address" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Position*</label>
                  <sui-dropdown
                    fluid
                    placeholder="Select position"
                    selection
                    :options="list_positions_for_dropdown()"
                    v-model="addEmpParams.position_id"
                    style="margin-top: 2.5rem"
                  />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Branch*</label>
                  <sui-dropdown
                    fluid
                    placeholder="Select branch"
                    selection
                    :options="list_branches_for_dropdown()"
                    v-model="addEmpParams.branch_id"
                    style="margin-top: 2.5rem"
                  />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Working hours*</label>
                  <sui-dropdown
                    fluid
                    placeholder="Select working hours"
                    selection
                    :options="list_worktimes_for_dropdown()"
                    v-model="addEmpParams.worktime_id"
                    style="margin-top: 2.5rem"
                  />
                </md-field>
              </div>
            </div>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button
              data-background-color="pink"
              positive
              @click.native="addEmp"
              class="ui button size middle"
            >Add</sui-button>
          </sui-modal-actions>
        </sui-modal>

        <div class="md-layout-item md-size-100">
          <md-field>
            <md-table md-card>
              <md-table-row v-for="employee in $apolloData.data.employees" v-bind:key="employee.id">
                <md-table-cell md-label="Picture"></md-table-cell>
                <md-table-cell md-label="Name">{{employee.name}}</md-table-cell>
                <md-table-cell md-label="Address">{{employee.phone}}</md-table-cell>
                <md-table-cell md-label="Phone number">{{employee.address}}</md-table-cell>
                <md-table-cell md-label="Email">{{employee.position.name}}</md-table-cell>
                <md-table-cell md-label="Branch">{{employee.branch.name}}</md-table-cell>
                <md-table-cell
                  md-label="Branch"
                >{{employee.worktime.start}} - {{employee.worktime.end}}</md-table-cell>
                <md-table-cell md-label="remove" class="edit_button">
                  <sui-button @click.native="toggleEdit(employee)">
                    <font-awesome-icon icon="edit" />
                  </sui-button>
                  <sui-button @click.native="deleteEmp(employee.id)">
                    <font-awesome-icon icon="times-circle" />
                  </sui-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-field>
        </div>
      </md-card-content>

      <!-- update staff -->
      <sui-modal v-model="openEdit">
        <sui-modal-header class="form-header">Add new staff</sui-modal-header>
        <sui-modal-content>
          <div class="md-layout">
            <div class="md-layout-item md-smal-size-100 md-size-50">
              <md-field>
                <label>Name</label>
                <md-input v-model="updateEmpParams.name" type="text" required></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Gender*</label>
                <sui-dropdown
                  fluid
                  placeholder="Select gender"
                  selection
                  :options="gender"
                  v-model="updateEmpParams.gender"
                  style="margin-top: 2.5rem"
                />
              </md-field>
            </div>

            <div class="md-layout-item md-smal-size-100 md-size-50">
              <md-field>
                <label>Phone</label>
                <md-input v-model="updateEmpParams.phone" type="text" required></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-smal-size-100 md-size-50">
              <md-field>
                <label>Email</label>
                <md-input v-model="updateEmpParams.email" type="email" required></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-smal-size-100 md-size-50">
              <md-field>
                <label>Facebook</label>
                <md-input v-model="updateEmpParams.facebook" type="text"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-smal-size-100 md-size-50">
              <md-field>
                <label>DOB</label>
                <md-input v-model="updateEmpParams.dob" type="date"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Address</label>
                <md-input v-model="updateEmpParams.address" type="text"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Position*</label>
                <sui-dropdown
                  fluid
                  placeholder="Select position"
                  selection
                  :options="list_positions_for_dropdown()"
                  v-model="updateEmpParams.position_id"
                  style="margin-top: 2.5rem"
                />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Branch*</label>
                <sui-dropdown
                  fluid
                  placeholder="Select branch"
                  selection
                  :options="list_branches_for_dropdown()"
                  v-model="updateEmpParams.branch_id"
                  style="margin-top: 2.5rem"
                />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Working hours*</label>
                <sui-dropdown
                  fluid
                  placeholder="Select working hours"
                  selection
                  :options="list_worktimes_for_dropdown()"
                  v-model="updateEmpParams.worktime_id"
                  style="margin-top: 2.5rem"
                />
              </md-field>
            </div>
          </div>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button
            data-background-color="pink"
            positive
            @click.native="updateEmp"
            class="ui button size middle"
          >Update</sui-button>
        </sui-modal-actions>
      </sui-modal>
    </md-card>
  </div>
  <div v-else class="content">
    <div class="md-photo-loading">
      <img src="@/../public/logo.png"/>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";

const ADD_EMP = gql`
  mutation(
    $name: String!
    $phone: String!
    $email: String!
    $address: String
    $branch_id: Int!
    $worktime_id: Int!
    $position_id: Int!
    $facebook: String
    $dob: String
    $gender: Int!
  ) {
    createEmployee(
      input: {
        name: $name
        phone: $phone
        email: $email
        address: $address
        branch_id: $branch_id
        worktime_id: $worktime_id
        position_id: $position_id
        facebook: $facebook
        dob: $dob
        gender: $gender
      }
    ) {
      id
      name
      position {
        id
      }
    }
  }
`;
const UPDATE_EMP = gql`
  mutation(
    $id: ID!
    $name: String!
    $phone: String!
    $email: String!
    $address: String
    $branch_id: Int!
    $worktime_id: Int!
    $position_id: Int!
    $facebook: String
    $dob: String
    $gender: Int
  ) {
    updateEmployee(
      id: $id
      input: {
        name: $name
        phone: $phone
        email: $email
        address: $address
        branch_id: $branch_id
        worktime_id: $worktime_id
        position_id: $position_id
        facebook: $facebook
        dob: $dob
        gender: $gender
      }
    ) {
      id
    }
  }
`;
const DELETE_EMP = gql`
  mutation($id: ID!) {
    deleteEmployee(id: $id) {
      id
      name
    }
  }
`;
export default {
  name: "staff",
  data() {
    return {
      open: false,
      openEdit: false,

      gender: [
        {
          value: 1,
          text: "Male"
        },
        {
          value: 2,
          text: "Female"
        }
      ],
      addEmpParams: {
        name: "",
        email: "",
        phone: "",
        address: "",
        branch_id: "",
        worktime_id: "",
        position_id: "",
        facebook: "",
        dob: "",
        gender: ""
      },
      updateEmpParams: {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        branch_id: "",
        worktime_id: "",
        position_id: "",
        facebook: "",
        dob: "",
        gender: ""
      }
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    toggleEdit(employee) {
      this.updateEmpParams.id = employee.id;
      this.updateEmpParams.name = employee.name;
      this.updateEmpParams.email = employee.email;
      this.updateEmpParams.phone = employee.phone;
      this.updateEmpParams.address = employee.address;
      this.updateEmpParams.branch_id = employee.branch.id;
      this.updateEmpParams.worktime_id = employee.worktime.id;
      this.updateEmpParams.position_id = employee.position.id;
      this.updateEmpParams.facebook = employee.facebook;
      this.updateEmpParams.dob = employee.dob;
      this.updateEmpParams.gender = employee.gender;

      this.openEdit = !this.openEdit;
    },
    list_branches_for_dropdown() {
      let data_array = [];

      this.$apolloData.data.branches.forEach(branch => {
        data_array.push({
          value: branch.id,
          text: branch.name
        });
      });

      return data_array;
    },
    list_worktimes_for_dropdown() {
      let data_array = [];

      this.$apolloData.data.workTimes.forEach(workTime => {
        data_array.push({
          value: workTime.id,
          text: workTime.start + " - " + workTime.end
        });
      });

      return data_array;
    },
    list_positions_for_dropdown() {
      let data_array = [];

      this.$apolloData.data.positions.forEach(position => {
        data_array.push({
          value: position.id,
          text: position.name
        });
      });

      return data_array;
    },
    addEmp() {
      const name = this.addEmpParams.name;
      const email = this.addEmpParams.email;
      const phone = this.addEmpParams.phone;
      const address = this.addEmpParams.address;
      const branch_id = this.addEmpParams.branch_id;
      const worktime_id = this.addEmpParams.worktime_id;
      const position_id = this.addEmpParams.position_id;
      const facebook = this.addEmpParams.facebook;
      const dob = this.addEmpParams.dob;
      const gender = this.addEmpParams.gender;

      // We clear it early to give the UI a snappy feel
      this.addEmpParams = {
        name: "",
        email: "",
        phone: "",
        address: "",
        branch_id: "",
        worktime_id: "",
        position_id: "",
        facebook: "",
        dob: "",
        gender: ""
      };
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: ADD_EMP,
          variables: {
            name: name,
            email: email,
            phone: phone,
            address: address,
            branch_id: branch_id,
            worktime_id: worktime_id,
            position_id: position_id,
            facebook: facebook,
            dob: dob,
            gender: gender
          }
        })
        .then(data => {
          console.log(data);
          this.open = !this.open;
          this.$apollo.queries.employees.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateEmp() {
      const id = this.updateEmpParams.id;
      const name = this.updateEmpParams.name;
      const email = this.updateEmpParams.email;
      const phone = this.updateEmpParams.phone;
      const address = this.updateEmpParams.address;
      const branch_id = this.updateEmpParams.branch_id;
      const worktime_id = this.updateEmpParams.worktime_id;
      const position_id = this.updateEmpParams.position_id;
      const facebook = this.updateEmpParams.facebook;
      const dob = this.updateEmpParams.dob;
      const gender = this.updateEmpParams.gender;

      // We clear it early to give the UI a snappy feel
      this.updateEmpParams = {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        branch_id: "",
        worktime_id: "",
        position_id: "",
        facebook: "",
        dob: "",
        gender: ""
      };
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: UPDATE_EMP,
          variables: {
            id: id,
            name: name,
            email: email,
            phone: phone,
            address: address,
            branch_id: branch_id,
            worktime_id: worktime_id,
            position_id: position_id,
            facebook: facebook,
            dob: dob,
            gender: gender
          }
        })
        .then(data => {
          console.log(data);
          this.openEdit = !this.openEdit;
          this.$apollo.queries.employees.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteEmp(id) {
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: DELETE_EMP,
          variables: {
            id: id
          }
        })
        .then(data => {
          console.log(data);
          this.$apollo.queries.employees.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  apollo: {
    employees: gql`
      {
        employees {
          id
          name
          phone
          address
          email
          gender
          position {
            id
            name
          }
          branch {
            id
            name
          }
          worktime {
            id
            start
            end
          }
        }
      }
    `,
    branches: gql`
      {
        branches {
          id
          name
        }
      }
    `,
    workTimes: gql`
      {
        workTimes {
          id
          start
          end
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
      variables: {
        type: 2
      }
    }
  }
};
</script>

