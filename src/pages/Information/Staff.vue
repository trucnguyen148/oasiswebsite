<template>
    <div class="content md-layout">
        <md-card>
            <md-card-header data-background-color="black">
                <h3 class="title">Staffs</h3>
            </md-card-header>
            <md-card-content>
                <div class="md-layout-item">
                      <md-field>
                      <label>Search staff:</label>
                      <sui-dropdown
                          fluid
                          :options="staff_name"
                          placeholder="Select staff"
                          search
                          selection
                          v-model="current"
                          style="margin-top: 2.5rem"
                          />
                      </md-field>
                  </div>
                <div class="setting">
                    <p style="margin: 0 2rem 0 3rem"> Add </p>  
                    <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle"/></sui-button>
                </div>
                    <!-- Add more staff -->
                    <sui-modal v-model="open">
                        <sui-modal-header class="form-header" >Add new staff</sui-modal-header>
                        <sui-modal-content>
                            <div class="md-layout">
                                    <!-- Name -->
                                <div class="md-layout-item md-smal-size-100 md-size-50">
                                    <md-field>
                                    <label>Name</label>
                                    <md-input 
                                    v-model="name" 
                                    type="text"
                                    required></md-input>
                                    </md-field>
                                </div>
                                    <!-- Photo -->
                                <div class="md-layout-item md-smal-size-100 md-size-50">
                                    <md-field>
                                        <label>Photo</label>
                                        <md-file v-model="single"    accept="image/*" required/>
                                    </md-field>
                                </div>
                                    
                                <!-- Phone number -->
                                <div class="md-layout-item md-smal-size-100 md-size-50">
                                    <md-field>
                                    <label>Phone number</label>
                                    <md-input 
                                    v-model="phone" 
                                    type="text"
                                    required></md-input>
                                    </md-field>
                                </div>

                                <!-- Email -->
                                <div class="md-layout-item md-smal-size-100 md-size-50">
                                    <md-field>
                                    <label>Email Address</label>
                                    <md-input 
                                    v-model="email" 
                                    type="text"
                                    required></md-input>
                                    </md-field>
                                </div>
                
                                <!-- Address -->
                                <div class="md-layout-item md-small-size-100 md-size-100">
                                    <md-field>
                                    <label>Address</label>
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

                                <!-- Select position -->
                                <div class="md-layout-item md-small-size-100 md-size-50">
                                    <md-field>
                                        <label>Position</label>
                                        <sui-dropdown
                                            fluid
                                            placeholder="Select position"
                                            selection
                                            :options="position"
                                            v-model="current"
                                            style="margin-top: 2.5rem"
                                        />
                                    </md-field>
                                </div>
                                <!-- Select branch -->
                                <div class="md-layout-item md-small-size-100 md-size-50">
                                    <md-field>
                                        <label>Branch</label>
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
                                <!-- Select working hour -->
                                <div class="md-layout-item md-small-size-100 md-size-50">
                                    <md-field>
                                        <label>Working hours</label>
                                        <sui-dropdown
                                            fluid
                                            placeholder="Select working hours"
                                            selection
                                            :options="service"
                                            v-model="service"
                                            style="margin-top: 2.5rem"
                                        />
                                    </md-field>
                                </div>
                            </div>
                        </sui-modal-content>
                        <sui-modal-actions>
                            <sui-button         data-background-color="pink" positive @click.native="toggle"  class="ui button size middle">Add
                            </sui-button>
                        </sui-modal-actions>
                    </sui-modal>
                    <div class="md-layout-item md-size-100">
                        <md-field>
                            <md-table md-card>
                                <md-table-row
                                    v-for="data in myJson"
                                    v-bind:key="data.name"
                                    v-bind:picture="data.picture"
                                    v-bind:name="data.name"
                                    v-bind:address="data.address"
                                    v-bind:phone="data.phone" 
                                >
                                    <md-table-cell md-label="Picture">{{data.picture}}</md-table-cell>
                                    <md-table-cell md-label="Name">{{data.name}}</md-table-cell>
                                    <md-table-cell md-label="Address" >{{data.addßress}}</md-table-cell>
                                    <md-table-cell md-label="Phone number" >{{data.phone}}</md-table-cell>
                                    <md-table-cell md-label="remove" class="edit_button" >
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
                    </ul>
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
import json from './../../data/staff.json';

export default {
    name: "staff",
    data(){
    return{
        open: false,
        openEdit: false,
        myJson: json,
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
}
</script>

