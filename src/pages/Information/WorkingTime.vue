<template>
    <md-card>
        <md-card-header data-background-color="black">
            <h3 class="title">Working time</h3>
        </md-card-header>
        <md-card-content>
            <div class="setting">
                <p style="margin: 0 2rem 0 3rem"> Add </p>  
                <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle" /></sui-button>
                <sui-modal v-model="open">
                    <sui-modal-header class="form-header" >Add new working time</sui-modal-header>
                    <sui-modal-content image>
                        <div class="md-layout">
                            <!-- Working time -->
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                <label>Start Time</label>
                                <md-input 
                                v-model="addWorkTimeParams.start" 
                                type="time"
                                required></md-input>
                                </md-field>

                                <md-field>
                                <label>End Time</label>
                                <md-input 
                                v-model="addWorkTimeParams.end" 
                                type="time"
                                required></md-input>
                                </md-field>
                            </div>
                            
                        </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                        <sui-button positive @click.native="addWorkTime" >
                        Add
                        </sui-button>
                    </sui-modal-actions>
                </sui-modal>
            </div>
            <!-- Show after add working time -->
            <ul 
                v-for="workTime in workTimes"
                v-bind:key="workTime.id"
            >
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <md-table md-card>
                            <md-table-row>
                                <md-table-cell md-label="Picture">
                                    <li style="margin: 0 2rem">{{workTime.start}} - {{workTime.end}}</li></md-table-cell>
                                <md-table-cell md-label="remove" class="edit_button" >
                                    <sui-button @click.native="toggleEdit(workTime.id, workTime.start, workTime.end)">
                                        <font-awesome-icon icon="edit" />
                                    </sui-button>
                                    
                                </md-table-cell>
                            </md-table-row>
                        </md-table>
                    </md-field>
                </div>
            </ul>
            <!-- Show edit -->
            <sui-modal v-model="openEdit">
                    <sui-modal-header class="form-header" >Change working time</sui-modal-header>
                    <sui-modal-content image>
                        <div class="md-layout">
                            <!-- Working time -->
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                <label>Start Time</label>
                                <md-input 
                                v-model="updateWorkTimeParams.start" 
                                type="time"
                                required></md-input>
                                </md-field>

                                <md-field>
                                <label>End Time</label>
                                <md-input 
                                v-model="updateWorkTimeParams.end" 
                                type="time"
                                required></md-input>
                                </md-field>
                            </div>
                            
                        </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                        <sui-button positive @click.native="updateWorkTime">Change</sui-button>
                    </sui-modal-actions>
                </sui-modal>
                
            
        </md-card-content>
    </md-card>
</template>
<script>
import json from "./../../data/workingtime.json";
import gql from 'graphql-tag';

const ADD_WORKTIME = gql`
    mutation(
        $start: String!,
        $end: String!
    ){
        createWorkTime(input: {
            start: $start,
            end: $end,
        }) {
            id 
            start
            end
        }
    }
`

const UPDATE_WORKTIME = gql`
    mutation(
        $id: ID!
        $start: String!,
        $end: String!
    ){
        updateWorkTime(
            id: $id,
            input: {
                start: $start,
                end: $end,
            }) {
                id 
                start
                end
            }
    }
`
export default {
    name: "working-time",
    data(){
        return{
            open: false,
            openEdit: false,
            
            workTimes: [],
            addWorkTimeParams: {
                start: "",
                end: ""
            },
            updateWorkTimeParams: {
                id: "",
                start: "",
                end: ""
            },
        };
        
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        toggleEdit(id, start, end){
            this.updateWorkTimeParams.id = id;
            this.updateWorkTimeParams.start = start;
            this.updateWorkTimeParams.end = end;
            this.openEdit = !this.openEdit;
        },
        addWorkTime() {
            const start = this.addWorkTimeParams.start
            const end = this.addWorkTimeParams.end
            // We clear it early to give the UI a snappy feel
            this.addWorkTimeParams = {
                start: "",
                end: "",
            } 
            // Call to the graphql mutation
            this.$apollo.mutate({
                mutation: ADD_WORKTIME,
                variables: {
                    start: start,
                    end: end
                }
            }).then((data) => {
                console.log(data)
                this.open = !this.open
            }).catch((error) => {
                console.log(error)
            })
        },
        updateWorkTime() {
            const id = this.updateWorkTimeParams.id
            const start = this.updateWorkTimeParams.start
            const end = this.updateWorkTimeParams.end
            // We clear it early to give the UI a snappy feel
            this.updateWorkTimeParams = {
                start: "",
                end: "",
            } 
            // Call to the graphql mutation
            this.$apollo.mutate({
                mutation: UPDATE_WORKTIME,
                variables: {
                    id: id,
                    start: start,
                    end: end
                }
            }).then((data) => {
                console.log(data)
                this.openEdit = !this.openEdit;
            }).catch((error) => {
                console.log(error)
            })
            
        }
    },
    apollo: {
        workTimes: gql`{
            workTimes {
                id 
                start
                end
            }
        }`,
    },
}
</script>

