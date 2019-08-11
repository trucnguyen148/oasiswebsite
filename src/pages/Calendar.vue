<template>
    <div class="content md-layout">
        <md-card>
            <!-- Select branch -->
            <div class="md-layout-item md-size-100">
                    <md-field>
                        <label>Select Branches:</label>
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
            <!-- Select date -->
            <div class="md-layout-item md-size-100">
                    <label>Select date:</label>
                    <vc-date-picker
                        mode="range"
                        :columns="$screens({ default: 1, lg: 2 })"
                        :value="null"
                        color="pink"
                        is-dark
                        is-inline  
                        style="display: block; margin-left: auto; margin-right: auto" 
                    />  
            </div>
            <!-- Select Staff -->
            <div class="md-layout-item md-size-100">
                    <md-field>
                    <label>Select Staffs:</label>
                    <sui-dropdown
                        fluid
                        placeholder="Select staff"
                        selection
                        :options="staff"
                        v-model="current"
                        style="margin-top: 2.5rem"
                        />
                    </md-field>
            </div>

            <!-- Show after selected -->
            <ul
                v-for="data in myJson"
                v-bind:key="data.id"
                v-bind:time="data.time"
            >
                <li>{{data.time}}</li>
                <ul
                    v-for="data in myJson2"
                    v-bind:key="data.id"
                    v-bind:name="data.name"
                >
                    <li>{{data.name}}</li>
                    <!-- Show staffs -->
                    <div class="md-layout-item md-size-100">
                        <md-field>
                            <md-table md-card>
                            <md-table-row
                                v-for="data in myJson1"
                                v-bind:key="data.id"
                                v-bind:picture="data.picture"
                                v-bind:name="data.name"
                                v-bind:waitingbooking="data.waitingbooking"
                            >
                                <md-table-cell md-label="Picture">{{data.picture}}</md-table-cell>
                                <md-table-cell md-label="Description" >{{data.name}}</md-table-cell>
                                <md-table-cell md-label="Waiting Booking">
                                    <ul>
                                        <li>
                                            {{data.waitingbooking[0].time}}: {{data.waitingbooking[0].person}} 
                                        </li>

                                    </ul>
                                </md-table-cell>
                                <md-table-cell md-label="remove"  class="edit_button">
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
            </ul>
            
        </md-card>
    </div>
</template>

<script>
import json from "./../data/workingtime.json";
import json1 from "./../data/staff.json";
import json2 from "./../data/categories.json";

export default {
    data(){
        return{
            open: false,
            myJson: json,
            myJson1: json1,
            myJson2: json2
        };
        
    },
    methods: {
        toggle() {
        this.open = !this.open;
        },
    }
}
</script>
