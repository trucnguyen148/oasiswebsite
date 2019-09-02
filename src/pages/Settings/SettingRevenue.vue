<template id="setting-revenue">
  <md-card>
    <md-card-header style="background-color: black; color: white; text-align: center; font-size: 1.5rem">Revenue Management</md-card-header>
    <md-card-content>
      <div class="setting">
        <p style="margin: 0 2rem"> Add </p>
        <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle" /></sui-button>      
      </div>
      <sui-modal v-model="open">
        <sui-modal-header class="form-header" >Add new email</sui-modal-header>
        <sui-modal-content>
          <!-- Name -->
          <div class="md-layout-item md-size-100">
            <md-field>
              <label>Staff</label>
              <md-input v-model="staff" type="text" required></md-input>
            </md-field>
          </div>
          <!-- Email -->
          <div class="md-layout-item md-size-100">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="emailadress" type="email"></md-input>
            </md-field>
          </div>
          <!-- Select branch -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Branch:</label>
              <sui-dropdown
                  fluid
                  placeholder="Select branch"
                  selection
                  :options="branch"
                  v-model="current"
                  style="margin-top: 2.5rem"
                  />
            </md-field>
          </div>
        </sui-modal-content>
        <sui-modal-actions>
            <sui-button         data-background-color="pink" positive @click.native="toggle"  class="ui button size middle space">Add</sui-button>
        </sui-modal-actions>
      </sui-modal>  
    </md-card-content>
    <!-- Show after add -->  
    <!-- Revenue based on Branch -->
    <md-card-content>
      <ul
      v-for="data in myJson1"
      v-bind:key="data.name"
      v-bind:name="data.name"
      v-bind:staffemailsname="data.staffemails.name"
      v-bind:staffemailsemail="data.staffemails.email"
      
      >
        <li>{{data.name}}</li>
          <div id="setting-revenue" class="md-layout-item md-size-100 md-size-50">
          <md-field>
            <md-table md-card>
              <md-table-row
              v-for="data in myJson"
              v-bind:key="data.name"
              v-bind:name="data.name"
              v-bind:email="data.email"
              >
                <md-table-cell md-label="Staff">{{data.name}}</md-table-cell>
                <md-table-cell md-label="email" >{{data.email}}</md-table-cell>
                <md-table-cell md-label="remove" class="edit_button">
                  <sui-button @click.native="edit">
                      <font-awesome-icon icon="edit" />
                  </sui-button>
                  <!-- Show after click edit button -->
                  <sui-modal v-model="openEdit">
                    <sui-modal-header class="form-header" >Change email</sui-modal-header>
                    <sui-modal-content image>
                        <div class="md-layout">
                            <!-- Name -->
                          <div class="md-layout-item md-size-100">
                            <md-field>
                            <label>Staff</label>
                            <md-input v-model="staff" type="text" required></md-input>
                            </md-field>
                          </div>
                          <!-- Email -->
                          <div class="md-layout-item md-size-100">
                            <md-field>
                            <label>Email Address</label>
                            <md-input v-model="emailadress" type="email"></md-input>
                            </md-field>
                          </div>
                          <!-- Select branch -->
                          <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                            <label>Branch:</label>
                            <sui-dropdown
                                fluid
                                placeholder="Select branch"
                                selection
                                :options="branch"
                                v-model="current"
                                style="margin-top: 2.5rem"
                                />
                            </md-field>
                            </div>
                        </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                        <sui-button positive @click.native="edit" >
                        Change
                        </sui-button>
                    </sui-modal-actions>
                  </sui-modal>  
                  <sui-button>
                      <font-awesome-icon icon="times-circle" />
                  </sui-button> 
              </md-table-cell>
              </md-table-row>
            </md-table>
          </md-field>
        </div>
        
      </ul>
    </md-card-content>
  </md-card>
</template>
<script>

import json from './../../data/staff.json'
import json1 from './../../data/branches.json'

export default {
  name: "setting-revenue",
  data() {
    return { 
      open: false,
      myJson: json,
      myJson1: json1,
      openEdit: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    edit(){
      this.openEdit = !this.openEdit;
    }
  }
};
</script>
<style></style>
