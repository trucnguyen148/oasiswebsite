<template>
  <md-card>
    <md-card-header style="background-color: black; color: white; text-align: center; font-size: 1.5rem">Schedule Management</md-card-header>
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
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button         data-background-color="pink" positive @click.native="toggle"  class="ui button size middle space">Add</sui-button>
        </sui-modal-actions>
      </sui-modal>
      <!-- Show after add -->
      <div class="md-layout-item md-size-100 md-size-50">
        <md-field>
          <md-table v-model="staffs" md-card>
            <md-table-row
            v-for="data in myJson" 
            v-bind:key="data.name" 
            v-bind:name="data.name" 
            v-bind:phone="data.email" 
            >
              <md-table-cell md-label="Branch">{{ data.name }}</md-table-cell>
              <md-table-cell md-label="Email">{{ data.email }}</md-table-cell>
              <md-table-cell md-label="remove" class="edit_button">
                <sui-button>
                  <font-awesome-icon icon="edit" />
                </sui-button>
                <sui-button>
                  <font-awesome-icon icon="times-circle" />
                </sui-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-field>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import json from "./../../data/settingbranches.json";
export default {
  name: "setting-schedule",
  data() {
    return {
      open: false,
      myJson: json
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
};
</script>
