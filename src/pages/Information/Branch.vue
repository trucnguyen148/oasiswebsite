<template>
    <md-card>
        <md-card-header data-background-color="black">
            <h3 class="title">Branch</h3>
        </md-card-header>
        <md-card-content>
            <div class="setting">
                <p style="margin: 0 2rem 0 3rem"> Add </p>  
                <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle"/></sui-button>
                <sui-modal v-model="open">
                    <sui-modal-header class="form-header" >Add new branch</sui-modal-header>
                    <sui-modal-content image>
                        <div class="md-layout">
                            <!-- Name -->
                        <div class="md-layout-item md-size-100">
                            <md-field>
                            <label>Name</label>
                            <md-input v-model="name" type="text" required></md-input>
                            </md-field>
                        </div>
                        
                        <!-- Address -->
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                            <label>Adress</label>
                            <md-input v-model="address" type="text"></md-input>
                            </md-field>
                        </div>
                        <!-- City -->
                        <div class="md-layout-item md-small-size-100 md-size-33">
                            <md-field>
                            <label>City</label>
                            <md-input v-model="city" type="text"></md-input>
                            </md-field>
                        </div>
                        <!-- Country -->
                        <div class="md-layout-item md-small-size-100 md-size-33">
                            <md-field>
                            <label>Country</label>
                            <md-input v-model="country" type="text"></md-input>
                            </md-field>
                        </div>
                        <!-- Postal code -->
                        <div class="md-layout-item md-small-size-100 md-size-33">
                            <md-field>
                            <label>Postal Code</label>
                            <md-input v-model="code" type="number"></md-input>
                            </md-field>
                        </div>

                        <!-- Phone number -->
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                            <label>Phone Number</label>
                            <md-input v-model="phonename" type="number" required></md-input>
                            </md-field>
                        </div>

                        <!-- Services -->
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                            <label>Services:</label>
                            <sui-dropdown
                                fluid
                                multiple
                                :options="service"
                                placeholder="Select service"
                                search
                                selection
                                v-model="current"
                                style="margin-top: 2.5rem"
                            />
                            </md-field>
                        </div>
                        <!-- Photos -->
                        <div class="md-layout-item md-size-100">
                            <md-field>
                                <label>Photos</label>
                                <md-file v-model="photos" accept="image/*" required />
                            </md-field>
                        </div>
                        </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                        <sui-button data-background-color="pink" positive @click.native="toggle"  class="ui button size middle">
                        Create
                        </sui-button>
                    </sui-modal-actions>
                </sui-modal>
            </div>
            <!-- Show after add -->
            <div class="md-layout-item md-size-100 md-size-50">
            <md-field>
                <md-table v-model="staffs" md-card>
                <md-table-row
                v-for="data in myJson"
                v-bind:key="data.id"
                v-bind:picture="data.picture"
                v-bind:name="data.name"
                v-bind:address="data.address"
                >
                    <md-table-cell md-label="Picture">{{ data.picture}}</md-table-cell>
                    <md-table-cell md-label="Branch">{{ data.name}}</md-table-cell>
                    <md-table-cell md-label="Address">{{ data.address }}</md-table-cell>
                    <md-table-cell md-label="Phone">{{ data.phone }}</md-table-cell>
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
import json from "./../../data/branches.json";

export default {
    name: "branch",
    data() {
    return { 
        open: false,
        myJson: json
        
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style>


</style>

