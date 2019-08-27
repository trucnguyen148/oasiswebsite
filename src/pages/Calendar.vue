<template>
    <div class="content md-layout">
        <md-card>
            <!-- Select branch -->
            <div class="md-layout-item md-size-100">
                    <md-field>
                        <label>Select Branches:</label>
                        <sui-dropdown
                            fluid
                            selection
                            :options="list_branch_name_and_id_for_dropdown()"
                            v-model="branch_selected_from_dropdown_id"
                            style="margin-top: 2.5rem"
                        />
                    </md-field>
            </div>
            
            <!-- Select Staff -->
            <div class="md-layout-item md-size-100">
                    <md-field>
                    <label>Select Staffs:</label>
                    <sui-dropdown
                        fluid
                        selection
                        :options="list_emp_name_and_id_for_dropdown_based_on_branch_id"
                        v-model="emp_selected_from_dropdown_id"
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
                        v-model="selected_date"
                    />  
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
import gql from 'graphql-tag';

export default {
    data(){
        return{
            open: false,
            myJson: json,
            myJson1: json1,
            myJson2: json2,
            branches: [],
            branch_selected_from_dropdown_id: [],
            list_emp_name_and_id_for_dropdown_based_on_branch_id: [],
            emp_selected_from_dropdown_id: [],
            selected_date: [],
            formated_selected_date: [],
        };
        
    },
    watch: {
        branch_selected_from_dropdown_id: function(){
            this.list_emp_name_and_id_for_dropdown_based_on_branch_id = this.list_emp_name_and_id_for_dropdown(this.branch_selected_from_dropdown_id);
        },
        selected_date: function(){
            var start_date = this.formatDate(this.selected_date.start);
            var end_date = this.formatDate(this.selected_date.end);

            this.formated_selected_date.push({
                start: start_date,
                end: end_date
            });
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
        list_branch_name_and_id_for_dropdown(){
            var branch_list_for_dropdown = [];
            this.branches.forEach(branch => {
                branch_list_for_dropdown.push({
                    value: branch.id,
                    text: branch.name
                })
            });
            return branch_list_for_dropdown;
        },
        list_emp_name_and_id_for_dropdown(id){
            var emp_list_for_dropdown = [];

            this.branches.forEach(branch => {
                if(branch.id == id){
                    branch.employees.forEach(employee => {
                        emp_list_for_dropdown.push({
                            value: employee.id,
                            text: employee.name
                        });
                    });
                    
                }
            });
            return emp_list_for_dropdown;
        },
    },
    apollo: {
        branches: gql`{
            branches {
            id
            name
            employees {
                id
                name
                bookings {
                products {
                    unit_price
                }
                }
            }
            }
        }`,
    },
}
</script>
